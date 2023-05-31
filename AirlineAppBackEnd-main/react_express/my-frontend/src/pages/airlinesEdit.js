import React, { useState, useEffect } from 'react';
import AirlinesEditForm from '../components/airlinesEditForm';

function AirlinesEdit({airlinesToEdit,evaluateForm}) {
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
            <AirlinesEditForm airlinesToEdit={airlinesToEdit} iataArray={iataArray} evaluateForm={evaluateForm}></AirlinesEditForm>
        </div>
    );
}

export default AirlinesEdit;