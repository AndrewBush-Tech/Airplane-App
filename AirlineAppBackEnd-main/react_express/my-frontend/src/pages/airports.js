import React, { useState, useEffect } from 'react';
import AirportsAdd from '../components/airportsAdd';
import AirportsTable from '../components/airportsTable';
import { useHistory } from 'react-router-dom';

function Airports({setAirportsToEdit,evaluateForm}) {
    const [airportsArray, setAirports] = useState([]);
    const history = useHistory();

    // edit an airports
    const onEdit = airports => {
        setAirportsToEdit(airports);
        history.push("/AirportsEdit");
    }

    // delete an airports
    const onDelete = async airport_code => {
        // call delete API
        const response = await fetch(`/airports/${airport_code}`, { method: 'DELETE' });

        // handle based on API response
        if(response.status === 204) {
            // deletion successful, filter out deleted row
            setAirports(airportsArray.filter(exc => exc.airport_code !== airport_code));
        } else {
            console.error(`Deletion failure: ${response.status}`);
        }
    }

    // fetch all airports to display
    const getAllAirports = async() => {
        const response = await fetch('/airports',{ method: 'GET' });
        const airportsArray = await response.json();
        setAirports(airportsArray);
    }

    useEffect(() => { getAllAirports();}, [] );

    return (
        <div>
            <h2>Airport Data Management:</h2>
            <AirportsTable airportsArray={airportsArray} onDelete={onDelete} onEdit={onEdit}></AirportsTable>
            <AirportsAdd airportsArray={airportsArray} evaluateForm={evaluateForm}></AirportsAdd>
        </div>
    );
}

export default Airports;