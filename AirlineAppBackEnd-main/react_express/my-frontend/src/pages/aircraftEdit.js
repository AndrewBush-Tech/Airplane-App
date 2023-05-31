import React, { useState, useEffect } from 'react';
import AircraftEditForm from '../components/aircraftEditForm';

function AircraftEdit({aircraftToEdit, evaluateForm}) {
    const [iataArray, setIata] = useState([]);

    // array to populate the drop-down
    const getAllIata = async() => {
        const response = await fetch('/iata',{ method: 'GET' });
        const iataArray = await response.json();
        setIata(iataArray);
    }

    useEffect(() => { getAllIata();}, [] );

    return (
        <div>
            <AircraftEditForm aircraftToEdit={aircraftToEdit} iataArray={iataArray} evaluateForm={evaluateForm}></AircraftEditForm>
        </div>
    );
}

export default AircraftEdit;