import React, { useState } from 'react';
import IataOption from './iataOption';
import { useHistory } from 'react-router-dom';

function AircraftEdit({aircraftToEdit, iataArray, evaluateForm}) {
    console.log(`aircraft data is ${JSON.stringify(aircraftToEdit)}`);

    const tail_id = aircraftToEdit.tail_id;
    const [manufacturer, setManufacturer] = useState(aircraftToEdit.manufacturer);
    const [model, setModel] = useState(aircraftToEdit.model);
    const [engine, setEngine] = useState(aircraftToEdit.engine);
    const [iata_code, setIata] = useState(aircraftToEdit.iata_code);
    
    const history = useHistory();

    const updateAircraft = async (e) => {
        // take form data and put it to express API
        e.preventDefault();
        const editedAircraft = {tail_id, manufacturer, model, engine, iata_code };
        console.log(`updateAircraft called with ${JSON.stringify(editedAircraft)}`);

        // validate client-side input
        let validateInputArray = [
            {val:editedAircraft.manufacturer, val_type:'notblank', field_name:'manufacturer'},
            {val:editedAircraft.engine, val_type:'notblank', field_name:'engine'},
            {val:editedAircraft.engine, val_type:'number', field_name:'engine'},
            {val:editedAircraft.iata_code, val_type:'notblank', field_name:'iata_code'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        const response = await fetch(`/put-aircraft/${aircraftToEdit.tail_id}`, {
            method:'PUT',
            body: JSON.stringify(editedAircraft),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(`Status is ${response.status}`);

        //handle response
        if(response.status === 200) {
            // api call successful
            console.log(`Successfully updated the aircraft`);
            alert(`Awesome! The aircraft was updated... let's go back to the aircraft homepage.`)
            
            // go back to aircraft homepage
            history.push("/aircraft");
        } else {
            // api call unsuccessful
            console.log(`updateAircraft failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong: ${response.status} = ${JSON.stringify(response)}`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Edit aircraft:</legend>
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
                                <select name='iata_code' value={iata_code} onChange={e => setIata(e.target.value)} >
                                    <option>Select</option>
                                    {iataArray.map((iata, i) => <IataOption iata={iata} key={i} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={updateAircraft}>Update aircraft</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default AircraftEdit;