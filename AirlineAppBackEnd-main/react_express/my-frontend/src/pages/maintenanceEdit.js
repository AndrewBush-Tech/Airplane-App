import React, { useState, useEffect } from 'react';
import MaintenanceEditForm from '../components/maintenanceEditForm';

function MaintenanceEdit({maintenanceToEdit,evaluateForm}) {
    const [tailArray, setTail] = useState([]);

    // array to populate the drop-down
    const getAllTail = async() => {
        const response = await fetch('/tail',{ method: 'GET' });
        const tailArray = await response.json();
        setTail(tailArray);
    }

    useEffect(() => { getAllTail();}, [] );

    return (
        <div>
            <MaintenanceEditForm maintenanceToEdit={maintenanceToEdit} tailArray={tailArray} evaluateForm={evaluateForm}></MaintenanceEditForm>
        </div>
    );
}

export default MaintenanceEdit;