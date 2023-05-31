import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AirlinesEdit({airlinesToEdit, iataArray, evaluateForm}) {
    console.log(`airline data is ${JSON.stringify(airlinesToEdit)}`);

    const iata_code = airlinesToEdit.iata_code;
    const [name, setName] = useState(airlinesToEdit.name);
    const [hub, setHub] = useState(airlinesToEdit.hub);
    const [country, setCountry] = useState(airlinesToEdit.country);
    
    const history = useHistory();

    const updateAirlines = async (e) => {
        // take form data and put it to express API
        e.preventDefault();
        const editedAirlines = {name, hub, country, iata_code};

        // validate client-side input
        let validateInputArray = [
            {val:editedAirlines.name, val_type:'notblank', field_name:'name'},
            {val:editedAirlines.country, val_type:'notblank', field_name:'country'},
            {val:editedAirlines.iata_code, val_type:'notblank', field_name:'iata code'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        console.log(`updateAirlines called with ${JSON.stringify(editedAirlines)}`);
        const response = await fetch(`/put-airlines/${airlinesToEdit.iata_code}`, {
            method:'PUT',
            body: JSON.stringify(editedAirlines),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(`Status is ${response.status}`);

        //handle response
        if(response.status === 200) {
            // api call successful
            console.log(`Successfully updated the airlines`);
            alert(`Awesome! The airline was updated... let's go back to the airlines homepage.`)
            
            // go back to airlines homepage
            history.push("/airlines");
        } else {
            // api call unsuccessful
            console.log(`updateAirlines failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong: ${response.status} = ${JSON.stringify(response)}`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Edit airline:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Name:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Hub:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="hub" value={hub} onChange={e => setHub(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Country:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="country" value={country} onChange={e => setCountry(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={updateAirlines}>Update airline</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default AirlinesEdit;