import React, { useState } from 'react';
import IataOption from './iataOption';
import AirportOption from './airportOption';
import { useHistory } from 'react-router-dom';

function PilotsEdit({pilotsToEdit, airportArray, iataArray, evaluateForm}) {
    console.log(`pilots data is ${JSON.stringify(pilotsToEdit)}`);

    const employee_id = pilotsToEdit.employee_id;
    const [airport_code, setAirport] = useState(pilotsToEdit.airport_code);
    const [name, setName] = useState(pilotsToEdit.name);
    const [rank, setRank] = useState(pilotsToEdit.rank);
    const [iata_code, setIata] = useState(pilotsToEdit.iata_code);
    
    const history = useHistory();

    const updatePilots = async (e) => {
        // take form data and put it to express API
        e.preventDefault();
        const editedPilots = {employee_id, airport_code, name, rank, iata_code };

        // validate client-side input
        let validateInputArray = [
            {val:editedPilots.name, val_type:'notblank', field_name:'name'},
            {val:editedPilots.iata_code, val_type:'notblank', field_name:'iata_code'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        console.log(`updatePilots called with ${JSON.stringify(editedPilots)}`);
        const response = await fetch(`/put-pilots/${pilotsToEdit.employee_id}`, {
            method:'PUT',
            body: JSON.stringify(editedPilots),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(`Status is ${response.status}`);

        //handle response
        if(response.status === 200) {
            // api call successful
            console.log(`Successfully updated the pilots`);
            alert(`Awesome! The pilots was updated... let's go back to the pilots homepage.`)
            
            // go back to pilots homepage
            history.push("/pilots");
        } else {
            // api call unsuccessful
            console.log(`updatePilots failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong: ${response.status} = ${JSON.stringify(response)}`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Edit pilots:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Rank</label></td>
                            <td className='tdAlignLeft'><input type="text" name="rank" value={rank} onChange={e => setRank(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Name</label></td>
                            <td className='tdAlignLeft'><input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Airport Code</label></td>
                            <td className='tdAlignLeft'>
                                <select name='airport_code' value={airport_code} onChange={e => setAirport(e.target.value)} >
                                    <option>Select</option>
                                    {airportArray.map((airport, i) => <AirportOption airport={airport} key={i} />)}
                                </select>
                            </td>
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
                            <td colSpan={2}><button onClick={updatePilots}>Update pilots</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default PilotsEdit;