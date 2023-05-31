import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function AirportsEdit({airportsToEdit, airportArray, evaluateForm}) {
    console.log(`airport data is ${JSON.stringify(airportsToEdit)}`);

    const airport_code = airportsToEdit.airport_code;
    const [name, setName] = useState(airportsToEdit.name);
    const [city, setCity] = useState(airportsToEdit.city);
    const [country, setCountry] = useState(airportsToEdit.country);
    
    const history = useHistory();

    const updateAirports = async (e) => {
        // take form data and put it to express API
        e.preventDefault();
        const editedAirports = {name, city, country, airport_code};

        // validate client-side input
        let validateInputArray = [
            {val:editedAirports.country, val_type:'notblank', field_name:'country'},
            {val:editedAirports.airport_code, val_type:'notblank', field_name:'airport_code'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        console.log(`updateAirports called with ${JSON.stringify(editedAirports)}`);
        const response = await fetch(`/put-airports/${airportsToEdit.airport_code}`, {
            method:'PUT',
            body: JSON.stringify(editedAirports),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(`Status is ${response.status}`);

        //handle response
        if(response.status === 200) {
            // api call successful
            console.log(`Successfully updated the airports`);
            alert(`Awesome! The airport was updated... let's go back to the airports homepage.`)
            
            // go back to airports homepage
            history.push("/airports");
        } else {
            // api call unsuccessful
            console.log(`updateAirports failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong: ${response.status} = ${JSON.stringify(response)}`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Edit airport:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Name:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>City:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="city" value={city} onChange={e => setCity(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Country:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="country" value={country} onChange={e => setCountry(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={updateAirports}>Update airport</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default AirportsEdit;