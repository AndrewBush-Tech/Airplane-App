import React, { useState } from 'react';
import IataOption from './iataOption';
import AirportOption from './airportOption';

function PilotsAdd({airportArray, iataArray, evaluateForm}) {
    const [airport_code, setAirport] = useState('');
    const [name, setName] = useState('');
    const [rank, setRank] = useState('');
    const [iata_code, setIata] = useState('');

    const addNewPilots = async (e) => {
        // take form data and post it to express API
        e.preventDefault();
        const newPilots = { airport_code, name, rank, iata_code };

        // validate client-side input
        let validateInputArray = [
            {val:newPilots.name, val_type:'notblank', field_name:'name'},
            {val:newPilots.iata_code, val_type:'notblank', field_name:'iata_code'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        const response = await fetch('/add-pilots', {
            method:'POST',
            body: JSON.stringify(newPilots),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //handle response
        if(response.status === 201) {
            // api call successful
            console.log(`Successfully added a new pilot`);
            alert(`Awesome! The a new pilot was added.`)
            window.location.reload();
        } else {
            // api call unsuccessful
            console.log(`addNewPilots failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong and we were unable to add your pilots.`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Add a new pilot:</legend>
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
                                <select name='airport_code' onChange={e => setAirport(e.target.value)} >
                                    <option>Select</option>
                                    {airportArray.map((airport, i) => <AirportOption airport={airport} key={i} />)}
                                </select>
                            </td>
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
                            <td colSpan={2}><button onClick={addNewPilots}>Add pilot</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default PilotsAdd;