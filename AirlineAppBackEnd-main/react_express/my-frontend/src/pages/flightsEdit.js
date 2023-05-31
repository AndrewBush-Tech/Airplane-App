import React, { useState, useEffect } from 'react';
import FlightsEditForm from '../components/flightsEditForm';

function FlightsEdit({flightsToEdit,evaluateForm}) {
    const [tailArray, setTail] = useState([]);
    const [employeeArray, setEmployee] = useState([]);
    const [airportArray, setAirport] = useState([]);

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
    useEffect(() => { getAllTail();}, [] );
    useEffect(() => { getAllEmployee();}, [] );
    useEffect(() => { getAllAirport();}, [] );

    return (
        <div>
            <FlightsEditForm flightsToEdit={flightsToEdit} airportArray={airportArray} tailArray={tailArray} employeeArray={employeeArray} evaluateForm={evaluateForm}></FlightsEditForm>
        </div>
    );
}

export default FlightsEdit;