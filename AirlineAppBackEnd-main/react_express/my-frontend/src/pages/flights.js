import React, { useState, useEffect } from 'react';
import FlightsAdd from '../components/flightsAdd';
import FlightsTable from '../components/flightsTable';
import { useHistory } from 'react-router-dom';

function Flights({setFlightsToEdit,evaluateForm}) {
    const [flightsArray, setFlights] = useState([]);
    const [tailArray, setTail] = useState([]);
    const [employeeArray, setEmployee] = useState([]);
    const [airportArray, setAirport] = useState([]);
    const history = useHistory();

    // edit a flights
    const onEdit = flights => {
        setFlightsToEdit(flights);
        history.push("/FlightsEdit");
    }

    // delete a pilot
    const onDelete = async flight_id => {
        // call delete API
        const response = await fetch(`/flights/${flight_id}`, { method: 'DELETE' });

        // handle based on API response
        if(response.status === 204) {
            // deletion successful, filter out deleted row
            setFlights(flightsArray.filter(exc => exc.flight_id !== flight_id));
        } else {
            console.error(`Deletion failure: ${response.status}`);
        }
    }

    // fetch all flights to display
    const getAllFlights = async() => {
        const response = await fetch('/flights',{ method: 'GET' });
        const flightsArray = await response.json();
        setFlights(flightsArray);
    }

    // array to populate the drop-down
    const getAllTail = async() => {
        const response = await fetch('/tail_id',{ method: 'GET' });
        const tailArray = await response.json();
        setTail(tailArray);
    }

    // array to populate the drop-down
    const getAllEmployee = async() => {
        const response = await fetch('/employee_id',{ method: 'GET' });
        const employeeArray = await response.json();
        setEmployee(employeeArray);
    }

        // array to populate the airport drop-down
    const getAllAirport = async() => {
        const response = await fetch('/airportCode',{ method: 'GET' });
        const airportArray = await response.json();
        setAirport(airportArray);
    }

    useEffect(() => { getAllFlights();}, [] );
    useEffect(() => { getAllTail();}, [] );
    useEffect(() => { getAllEmployee();}, [] );
    useEffect(() => { getAllAirport();}, [] );

    return (
        <div>
            <h2>Pilot Data Management:</h2>
            <FlightsTable flightsArray={flightsArray} airportArray={airportArray} tailArray={tailArray} employeeArray={employeeArray} onDelete={onDelete} onEdit={onEdit}></FlightsTable>
            <FlightsAdd airportArray={airportArray} tailArray={tailArray} employeeArray={employeeArray} evaluateForm={evaluateForm}></FlightsAdd>
        </div>
    );
}

export default Flights;