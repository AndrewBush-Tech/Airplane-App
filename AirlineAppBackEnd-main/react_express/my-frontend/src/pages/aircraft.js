import React, { useState, useEffect } from 'react';
import AircraftAdd from '../components/aircraftAdd';
import AircraftTable from '../components/aircraftTable';
import { useHistory } from 'react-router-dom';

function Aircraft({setAircraftToEdit,evaluateForm}) {
    const [aircraftArray, setAircraft] = useState([]);
    const [iataArray, setIata] = useState([]);
    const history = useHistory();

    // edit an aircraft
    const onEdit = aircraft => {
        setAircraftToEdit(aircraft);
        history.push("/AircraftEdit");
    }

    // delete an aircraft
    const onDelete = async tail_id => {
        // call delete API
        const response = await fetch(`/aircraft/${tail_id}`, { method: 'DELETE' });

        // handle based on API response
        if(response.status === 204) {
            // deletion successful, filter out deleted row
            setAircraft(aircraftArray.filter(exc => exc.tail_id !== tail_id));
        } else {
            console.error(`Deletion failure: ${response.status}`);
        }
    }

    // fetch all aircraft to display
    const getAllAircraft = async() => {
        const response = await fetch('/aircraft',{ method: 'GET' });
        const aircraftArray = await response.json();
        setAircraft(aircraftArray);
    }

    // array to populate the drop-down
    const getAllIata = async() => {
        const response = await fetch('/iata',{ method: 'GET' });
        const iataArray = await response.json();
        setIata(iataArray);
    }

    useEffect(() => { getAllAircraft();}, [] );
    useEffect(() => { getAllIata();}, [] );

    return (
        <div>
            <h2>Aircraft Data Management:</h2>
            <AircraftTable aircraftArray={aircraftArray} iataArray={iataArray} onDelete={onDelete} onEdit={onEdit}></AircraftTable>
            <AircraftAdd iataArray={iataArray} evaluateForm={evaluateForm}></AircraftAdd>
        </div>
    );
}

export default Aircraft;