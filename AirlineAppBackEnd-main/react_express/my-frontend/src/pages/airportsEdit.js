import React, { useState, useEffect } from 'react';
import AirportsEditForm from '../components/airportsEditForm';

function AirportsEdit({airportsToEdit,evaluateForm}) {
    const [airportArray, setAirport] = useState([]);

    // array to populate the drop-down
    const getAllAirport = async() => {
        const response = await fetch('/airport',{ method: 'GET' });
        const airportArray = await response.json();
        setAirport(airportArray);
    }

    useEffect(() => { getAllAirport();}, [] );

    return (
        <div>
            <AirportsEditForm airportsToEdit={airportsToEdit} airportArray={airportArray} evaluateForm={evaluateForm}></AirportsEditForm>
        </div>
    );
}

export default AirportsEdit;