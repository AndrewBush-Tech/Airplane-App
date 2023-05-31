import React, { useState, useEffect } from 'react';
import MaintenanceAdd from '../components/maintenanceAdd';
import MaintenanceTable from '../components/maintenanceTable';
import { useHistory } from 'react-router-dom';

function Maintenance({setMaintenanceToEdit,evaluateForm}) {
    const [maintenanceArray, setMaintenance] = useState([]);
    const [tailArray, setTail] = useState([]);
    const history = useHistory();

    // edit an maintenance
    const onEdit = maintenance => {
        setMaintenanceToEdit(maintenance);
        history.push("/MaintenanceEdit");
    }

    // delete an maintenance
    const onDelete = async maintenance_logs_id => {
        // call delete API
        const response = await fetch(`/maintenance/${maintenance_logs_id}`, { method: 'DELETE' });

        // handle based on API response
        if(response.status === 204) {
            // deletion successful, filter out deleted row
            setMaintenance(maintenanceArray.filter(exc => exc.maintenance_logs_id !== maintenance_logs_id));
        } else {
            console.error(`Deletion failure: ${response.status}`);
        }
    }

    // fetch all maintenance to display
    const getAllMaintenance = async() => {
        const response = await fetch('/maintenance',{ method: 'GET' });
        const maintenanceArray = await response.json();
        setMaintenance(maintenanceArray);
    }

    // array to populate the drop-down
    const getAllTail = async() => {
        const response = await fetch('/tail',{ method: 'GET' });
        const tailArray = await response.json();
        setTail(tailArray);
    }

    useEffect(() => { getAllMaintenance();}, [] );
    useEffect(() => { getAllTail();}, [] );

    return (
        <div>
            <h2>Maintenance Data Management:</h2>
            <MaintenanceTable maintenanceArray={maintenanceArray} tailArray={tailArray} onDelete={onDelete} onEdit={onEdit}></MaintenanceTable>
            <MaintenanceAdd tailArray={tailArray} evaluateForm={evaluateForm}></MaintenanceAdd>
        </div>
    );
}

export default Maintenance;