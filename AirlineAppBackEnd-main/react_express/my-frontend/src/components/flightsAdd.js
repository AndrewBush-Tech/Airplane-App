import React, { useState } from 'react';
import TailOption from './tailOption';
import AirportOption from './airportOption';
import EmployeeOption from './employeeOption';


function FlightsAdd({airportArray, tailArray, employeeArray, evaluateForm}) {
    const [airport_code, setAirport] = useState('');
    const [origin_airport, setOrigin] = useState('');
    const [hours, setHours] = useState('');
    const [date, setDate] = useState('');
    const [destination_airport, setDestination] = useState('');
    const [tail_id, setTail] = useState('');
    const [employee_id, setEmployee] = useState('');
    

    const addNewFlights = async (e) => {
        // take form data and post it to express API
        e.preventDefault();
        const newFlights = { destination_airport, origin_airport, hours, date, airport_code, tail_id, employee_id };
        
        // validate client-side input
        let validateInputArray = [
            {val:newFlights.destination_airport, val_type:'notblank', field_name:'destination_airport'},
            {val:newFlights.origin_airport, val_type:'notblank', field_name:'origin_airport'},
            {val:newFlights.hours, val_type:'notblank', field_name:'hours'},
            {val:newFlights.date, val_type:'notblank', field_name:'date'},
            {val:newFlights.airport_code, val_type:'notblank', field_name:'airport_code'},
            {val:newFlights.tail_id, val_type:'notblank', field_name:'tail_id'},
            {val:newFlights.employee_id, val_type:'notblank', field_name:'employee_id'},
            {val:newFlights.tail_id, val_type:'number', field_name:'tail_id'},
            {val:newFlights.employee_id, val_type:'number', field_name:'employee_id'},
            {val:newFlights.hours, val_type:'number', field_name:'hours'},
            {val:newFlights.date, val_type:'date', field_name:'date'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }

        const response = await fetch('/add-flights', {
            method:'POST',
            body: JSON.stringify(newFlights),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        //handle response
        if(response.status === 201) {
            // api call successful
            console.log(`Successfully added a new flight`);
            alert(`Awesome! The a new flight was added.`)
            window.location.reload();
        } else {
            // api call unsuccessful
            console.log(`addNewFlights failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong and we were unable to add your flights.`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Add a new flight:</legend>
                <table>
                    <tbody>
                        <tr>
                            <td className='tdAlignRight'><label>Destination Airport</label></td>
                            <td className='tdAlignLeft'><input type="text" name="destination_airport" value={destination_airport} onChange={e => setDestination(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Origin Airport</label></td>
                            <td className='tdAlignLeft'><input type="text" name="origin_airport" value={origin_airport} onChange={e => setOrigin(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Hours</label></td>
                            <td className='tdAlignLeft'><input type="number" min = "0" name="hours" value={hours} onChange={e => setHours(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Date</label></td>
                            <td className='tdAlignLeft'><input type="date" name="date" value={date} onChange={e => setDate(e.target.value)}/></td>
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
                            <td className='tdAlignRight'><label>Tail ID</label></td>
                            <td className='tdAlignLeft'>
                                <select name='tail_id' onChange={e => setTail(e.target.value)} >
                                    <option>Select</option>
                                    {tailArray.map((tail, i) => <TailOption tail={tail} key={i} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Employee ID</label></td>
                            <td className='tdAlignLeft'>
                                <select name='employee_id' onChange={e => setEmployee(e.target.value)} >
                                    <option>Select</option>
                                    {employeeArray.map((employee, i) => <EmployeeOption employee={employee} key={i} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={addNewFlights}>Add flight</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default FlightsAdd;