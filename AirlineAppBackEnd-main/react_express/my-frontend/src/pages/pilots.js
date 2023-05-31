import React, { useState, useEffect } from 'react';
import PilotsAdd from '../components/pilotsAdd';
import PilotsTable from '../components/pilotsTable';
import { useHistory } from 'react-router-dom';

function Pilots({setPilotsToEdit,evaluateForm}) {
    const [pilotsArray, setPilots] = useState([]);
    const [iataArray, setIata] = useState([]);
    const [airportArray, setAirport] = useState([]);
    const history = useHistory();

    // edit a pilots
    const onEdit = pilots => {
        setPilotsToEdit(pilots);
        history.push("/PilotsEdit");
    }

    // delete a pilot
    const onDelete = async employee_id => {
        // call delete API
        const response = await fetch(`/pilots/${employee_id}`, { method: 'DELETE' });

        // handle based on API response
        if(response.status === 204) {
            // deletion successful, filter out deleted row
            setPilots(pilotsArray.filter(exc => exc.employee_id !== employee_id));
        } else {
            console.error(`Deletion failure: ${response.status}`);
        }
    }

    // fetch all pilots to display
    const getAllPilots = async() => {
        const response = await fetch('/pilots',{ method: 'GET' });
        const pilotsArray = await response.json();
        setPilots(pilotsArray);
    }

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

    useEffect(() => { getAllPilots();}, [] );
    useEffect(() => { getAllIata();}, [] );
    useEffect(() => { getAllAirport();}, [] );

    return (
        <div>
            <h2>Pilot Data Management:</h2>
            <PilotsTable pilotsArray={pilotsArray} airportArray={airportArray} iataArray={iataArray} onDelete={onDelete} onEdit={onEdit}></PilotsTable>
            <PilotsAdd airportArray={airportArray} iataArray={iataArray} evaluateForm={evaluateForm}></PilotsAdd>
        </div>
    );
}

export default Pilots;