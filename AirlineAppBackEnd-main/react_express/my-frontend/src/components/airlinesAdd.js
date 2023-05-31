import React, { useState } from 'react';

function AirlinesAdd({evaluateForm}) {
    const [name, setName] = useState('');
    const [hub, setHub] = useState('');
    const [country, setCountry] = useState('');
    const [iata_code, setIata] = useState('');

    const addNewAirlines = async (e) => {
        // take form data and post it to express API
        e.preventDefault();
        const newAirlines = { name, hub, country, iata_code };

        // validate client-side input
        let validateInputArray = [
            {val:newAirlines.name, val_type:'notblank', field_name:'name'},
            {val:newAirlines.country, val_type:'notblank', field_name:'country'},
            {val:newAirlines.iata_code, val_type:'notblank', field_name:'iata_code'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }
        
        const response = await fetch('/add-airlines', {
            method:'POST',
            body: JSON.stringify(newAirlines),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //handle response
        if(response.status === 201) {
            // api call successful

            console.log(`Successfully added a new airlines`);
            alert(`Awesome! The a new airlines was added.`);
            window.location.reload();
        } else {
            // api call unsuccessful
            console.log(`addNewAirlines failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong and we were unable to add your airlines.`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Add a new airline:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Name:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Hub</label></td>
                            <td className='tdAlignLeft'><input type="text" name="hub" value={hub} onChange={e => setHub(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Country</label></td>
                            <td className='tdAlignLeft'><input type="text" name="country" value={country} onChange={e => setCountry(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Iata Code</label></td>
                            <td className='tdAlignLeft'><input type="text" name="iata_code" value={iata_code} onChange={e => setIata(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={addNewAirlines}>Add airlines</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default AirlinesAdd;