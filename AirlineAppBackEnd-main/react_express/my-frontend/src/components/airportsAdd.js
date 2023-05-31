import React, { useState } from 'react';

function AirportsAdd({evaluateForm}) {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [airport_code, setAirport] = useState('');

    const addNewAirports = async (e) => {
        // take form data and post it to express API
        e.preventDefault();
        const newAirports = { name, city, country, airport_code };

        // validate client-side input
        let validateInputArray = [
            {val:newAirports.country, val_type:'notblank', field_name:'country'},
            {val:newAirports.airport_code, val_type:'notblank', field_name:'airport_code'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        const response = await fetch('/add-airports', {
            method:'POST',
            body: JSON.stringify(newAirports),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //handle response
        if(response.status === 201) {
            // api call successful

            console.log(`Successfully added a new airports`);
            alert(`Awesome! The a new airports was added.`);
            window.location.reload();
        } else {
            // api call unsuccessful
            console.log(`addNewAirports failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong and we were unable to add your airports.`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Add a new airport:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Name:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>City</label></td>
                            <td className='tdAlignLeft'><input type="text" name="city" value={city} onChange={e => setCity(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Country</label></td>
                            <td className='tdAlignLeft'><input type="text" name="country" value={country} onChange={e => setCountry(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Airport Code</label></td>
                            <td className='tdAlignLeft'><input type="text" name="airport_code" value={airport_code} onChange={e => setAirport(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={addNewAirports}>Add airport</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default AirportsAdd;