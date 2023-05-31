import React, { useState } from 'react';
import TailOption from './tailOption';
import { useHistory } from 'react-router-dom';

function MaintenanceEdit({maintenanceToEdit, tailArray, evaluateForm}) {
    console.log(`maintenance data is ${JSON.stringify(maintenanceToEdit)}`);

    const maintenance_logs_id = maintenanceToEdit.maintenance_logs_id;
    const [date, setDate] = useState(maintenanceToEdit.date);
    const [tail_id, setTail] = useState(maintenanceToEdit.tail_id);
    
    const history = useHistory();

    const updateMaintenance = async (e) => {
        // take form data and put it to express API
        e.preventDefault();
        const editedMaintenance = {maintenance_logs_id, date, tail_id };

        // validate client-side input
        let validateInputArray = [
            {val:editedMaintenance.date, val_type:'notblank', field_name:'date'},
            {val:editedMaintenance.tail_id, val_type:'notblank', field_name:'tail_id'},
            {val:editedMaintenance.date, val_type:'date', field_name:'date'},
            {val:editedMaintenance.tail_id, val_type:'number', field_name:'tail id'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        console.log(`updateMaintenance called with ${JSON.stringify(editedMaintenance)}`);
        const response = await fetch(`/put-maintenance/${maintenanceToEdit.maintenance_logs_id}`, {
            method:'PUT',
            body: JSON.stringify(editedMaintenance),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(`Status is ${response.status}`);

        //handle response
        if(response.status === 200) {
            // api call successful
            console.log(`Successfully updated the maintenance`);
            alert(`Awesome! The maintenance was updated... let's go back to the maintenance homepage.`)
            
            // go back to maintenance homepage
            history.push("/maintenance");
        } else {
            // api call unsuccessful
            console.log(`updateMaintenance failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong: ${response.status} = ${JSON.stringify(response)}`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Edit maintenance log:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Date</label></td>
                            <td className='tdAlignLeft'><input type="date" name="date" value={date} onChange={e => setDate(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Tail ID</label></td>
                            <td className='tdAlignLeft'>
                                <select name='tail_id' value={tail_id} onChange={e => setTail(e.target.value)} >
                                    <option>Select</option>
                                    {tailArray.map((tail, i) => <TailOption tail={tail} key={i} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={updateMaintenance}>Update maintenance log</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default MaintenanceEdit;