import React, { useState } from 'react';
import AirportOption from './airportOption';
import TailOption from './tailOption';
import EmployeeOption from './employeeOption';
import { useHistory } from 'react-router-dom';

function FlightsEdit({flightsToEdit, airportArray, tailArray, employeeArray, evaluateForm}) {
    console.log(`flights data is ${JSON.stringify(flightsToEdit)}`);

    const flight_id = flightsToEdit.flight_id;
    const [airport_code, setAirport] = useState(flightsToEdit.airport_code);
    const [origin_airport, setOrigin] = useState(flightsToEdit.origin_airport);
    const [hours, setHours] = useState(flightsToEdit.hours);
    const [date, setDate] = useState(flightsToEdit.date);
    const [destination_airport, setDestination] = useState(flightsToEdit.destination_airport);
    const [tail_id, setTail] = useState(flightsToEdit.tail_id);
    const [employee_id, setEmployee] = useState(flightsToEdit.employee_id);
    
    const history = useHistory();

    const updateFlights = async (e) => {
        // take form data and put it to express API
        e.preventDefault();
        const editedFlights = {flight_id, destination_airport, origin_airport, hours, date, airport_code, tail_id, employee_id };
        
        // validate client-side input
        let validateInputArray = [
            {val:editedFlights.destination_airport, val_type:'notblank', field_name:'destination_airport'},
            {val:editedFlights.origin_airport, val_type:'notblank', field_name:'origin_airport'},
            {val:editedFlights.hours, val_type:'notblank', field_name:'hours'},
            {val:editedFlights.date, val_type:'notblank', field_name:'date'},
            {val:editedFlights.airport_code, val_type:'notblank', field_name:'airport_code'},
            {val:editedFlights.tail_id, val_type:'notblank', field_name:'tail_id'},
            {val:editedFlights.employee_id, val_type:'notblank', field_name:'employee_id'},
            {val:editedFlights.tail_id, val_type:'number', field_name:'tail_id'},
            {val:editedFlights.employee_id, val_type:'number', field_name:'employee_id'},
            {val:editedFlights.hours, val_type:'number', field_name:'hours'},
            {val:editedFlights.date, val_type:'date', field_name:'date'}
        ];
        const validation = evaluateForm(validateInputArray);
        if(!validation.valid) {
            // not a valid form, alert user and stop processing
            alert(validation.message);
            return;
        }
        
        console.log(`updateFlights called with ${JSON.stringify(editedFlights)}`);
        const response = await fetch(`/put-flights/${flightsToEdit.flight_id}`, {
            method:'PUT',
            body: JSON.stringify(editedFlights),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(`Status is ${response.status}`);

        //handle response
        if(response.status === 200) {
            // api call successful
            console.log(`Successfully updated the flights`);
            alert(`Awesome! The flights was updated... let's go back to the flights homepage.`)
            
            // go back to flights homepage
            history.push("/flights");
        } else {
            // api call unsuccessful
            console.log(`updateFlights failed with status: ${response.status}`);
            alert(`Uh-oh, something went wrong: ${response.status} = ${JSON.stringify(response)}`);
        }
    }

    return (
        <form>
            <fieldset>
                <legend>Edit flights:</legend>
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
                            <td className='tdAlignLeft'><input type="number" name="hours" value={hours} onChange={e => setHours(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Date</label></td>
                            <td className='tdAlignLeft'><input type="date" name="date" value={date} onChange={e => setDate(e.target.value)}/></td>
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
                            <td className='tdAlignRight'><label>Tail ID</label></td>
                            <td className='tdAlignLeft'>
                                <select name='tail_id' value={tail_id} onChange={e => setTail(e.target.value)} >
                                    <option>Select</option>
                                    {tailArray.map((tail, i) => <TailOption tail={tail} key={i} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className='tdAlignRight'><label>Employee ID</label></td>
                            <td className='tdAlignLeft'>
                                <select name='employee_id' value={employee_id} onChange={e => setEmployee(e.target.value)} >
                                    <option>Select</option>
                                    {employeeArray.map((employee, i) => <EmployeeOption employee={employee} key={i} />)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button onClick={updateFlights}>Update flights</button></td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        </form>
    );
}

export default FlightsEdit;