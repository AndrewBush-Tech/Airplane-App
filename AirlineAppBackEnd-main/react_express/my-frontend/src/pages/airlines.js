import React, { useState, useEffect } from 'react';
import AirlinesAdd from '../components/airlinesAdd';
import AirlinesTable from '../components/airlinesTable';
import { useHistory } from 'react-router-dom';

function Airlines({setAirlinesToEdit, evaluateForm}) {
    const [airlinesArray, setAirlines] = useState([]);
    const [iataArray, setIata] = useState([]);
    const history = useHistory();

    // edit an airlines
    const onEdit = airlines => {
        setAirlinesToEdit(airlines);
        history.push("/AirlinesEdit");
    }

    // delete an airlines
    const onDelete = async iata_code => {
        // call delete API
        const response = await fetch(`/airlines/${iata_code}`, { method: 'DELETE' });

        // handle based on API response
        if(response.status === 204) {
            // deletion successful, filter out deleted row
            setAirlines(airlinesArray.filter(exc => exc.iata_code !== iata_code));
        } else {
            console.error(`Deletion failure: ${response.status}`);
        }
    }

    // fetch all airlines to display
    const getAllAirlines = async() => {
        const response = await fetch('/airlines',{ method: 'GET' });
        const airlinesArray = await response.json();
        setAirlines(airlinesArray);
    }

    // array to populate the drop-down
    const getAllIata = async() => {
        const response = await fetch('/iata',{ method: 'GET' });
        const iataArray = await response.json();
        setIata(iataArray);
    }

    useEffect(() => { getAllAirlines();}, [] );
    useEffect(() => { getAllIata();}, [] );

    return (
        <div>
            <h2>Airline Data Management:</h2>
            <AirlinesTable airlinesArray={airlinesArray} iataArray={iataArray} onDelete={onDelete} onEdit={onEdit}></AirlinesTable>
            <AirlinesAdd iataArray={iataArray} evaluateForm={evaluateForm}></AirlinesAdd>
        </div>
    );
}

export default Airlines;