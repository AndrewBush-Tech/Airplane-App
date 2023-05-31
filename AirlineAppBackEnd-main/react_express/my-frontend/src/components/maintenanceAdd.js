import React, { useState } from 'react';
import TailOption from './tailOption';

function MaintenanceAdd({tailArray, evaluateForm}) {
    const [date, setDate] = useState('');
    const [tail_id, setTail] = useState('');
    

    const addNewMaintenance = async (e) => {
        // take form data and post it to express API
        e.preventDefault();
        const newMaintenance = { date, tail_id };

        // validate client-side input
        let validateInputArray = [
            {val:newMaintenance.date, val_type:'notblank', field_name:'date'},
            {val:newMaintenance.tail_id, val_type:'notblank', field_name:'tail_id'},
            {val:newMaintenance.date, val_type:'date', field_name:'date'},
            {val:newMaintenance.tail_id, val_type:'number', field_name:'tail id'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        const response = await fetch('/add-maintenance', {
            method:'POST',
            body: JSON.stringify(newMaintenance),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //handle response
        if(response.status === 201) {
            // api call successful
            console.log(`Successfully added a new maintenance log`);
            alert(`Awesome! The a new maintenance was added.`);
            window.location.reload();
        } else {
            // api call unsuccessful
            console.log(`addNewMaintenance failed with status: ${response.status}`)
            alert(`Uh-oh, something went wrong and we were unable to add your maintenance.`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Add a new maintenance log:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Date</label></td>
                            <td className='tdAlignLeft'><input type="date" name="date" value={date} onChange={e => setDate(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Tail ID</label></td>
                            <td className='tdAlignLeft'>
                                <select name='tail_id' onChange={e => setTail(e.target.value)} >
                                    <option>Select</option>
                                    {tailArray.map((tail, i) => <TailOption tail={tail} key={i} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={addNewMaintenance}>Add maintenance log</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default MaintenanceAdd;