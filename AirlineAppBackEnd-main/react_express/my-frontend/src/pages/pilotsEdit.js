import React, { useState, useEffect } from 'react';
import PilotsEditForm from '../components/pilotsEditForm';

function PilotsEdit({pilotsToEdit,evaluateForm}) {
    const [iataArray, setIata] = useState([]);
    const [airportArray, setAirport] = useState([]);

    // array to populate the drop-down
    const getAllIata = async() => {
        const response = await fetch('/iata',{ method: 'GET' });
        const iataArray = await response.json();
        setIata(iataArray);
    }
    // array to populate the airport drop-down
    const getAllAirport = async() => {
        const response = await fetch('/airportCode',{ method: 'GET' });
        const airportArray = await response.json();
        setAirport(airportArray);
    }
    useEffect(() => { getAllIata();}, [] );
    useEffect(() => { getAllAirport();}, [] );

    return (
        <div>
            <PilotsEditForm pilotsToEdit={pilotsToEdit} airportArray={airportArray} iataArray={iataArray} evaluateForm={evaluateForm}></PilotsEditForm>
        </div>
    );
}

export default PilotsEdit;