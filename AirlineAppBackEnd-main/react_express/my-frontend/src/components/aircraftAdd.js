import React, { useState } from 'react';
import IataOption from './iataOption';

function AircraftAdd({iataArray, evaluateForm}) {
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [engine, setEngine] = useState('');
    const [iata_code, setIata] = useState('');
    

    const addNewAircraft = async (e) => {
        // take form data and post it to express API
        e.preventDefault();

        const newAircraft = { manufacturer, model, engine, iata_code };

        // validate client-side input
        let validateInputArray = [
            {val:newAircraft.manufacturer, val_type:'notblank', field_name:'manufacturer'},
            {val:newAircraft.engine, val_type:'notblank', field_name:'engine'},
            {val:newAircraft.engine, val_type:'number', field_name:'engine'},
            {val:newAircraft.iata_code, val_type:'notblank', field_name:'iata_code'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        // call add aircraft api
        const response = await fetch('/add-aircraft', {
            method:'POST',
            body: JSON.stringify(newAircraft),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //handle response
        if(response.status === 201) {
            // api call successful
            console.log(`Successfully added a new aircraft`);
            alert(`Awesome! The a new aircraft was added.`);
            window.location.reload();
        } else {
            // api call unsuccessful
            console.log(`addNewAircraft failed with status: ${response.status}`)
            alert(`Uh-oh, something went wrong and we were unable to add your aircraft.`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Add a new aircraft:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Manufacturer:</label></td>
                            <td className='tdAlignLeft'><input type="text" name="manufacturer" value={manufacturer} onChange={e => setManufacturer(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Model</label></td>
                            <td className='tdAlignLeft'><input type="text" name="model" value={model} onChange={e => setModel(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Engine</label></td>
                            <td className='tdAlignLeft'><input type="number" min = "0" name="engine" value={engine} onChange={e => setEngine(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>IATA Code</label></td>
                            <td className='tdAlignLeft'>
                                <select name='iata_code' onChange={e => setIata(e.target.value)} >
                                    <option>Select</option>
                                    {iataArray.map((iata, i) => <IataOption iata={iata} key={i} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={addNewAircraft}>Add aircraft</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default AircraftAdd;