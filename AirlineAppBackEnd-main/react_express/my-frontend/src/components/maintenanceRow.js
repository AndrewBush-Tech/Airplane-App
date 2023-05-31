import React from 'react';
import moment from 'moment';
import {MdDeleteForever,MdModeEdit} from 'react-icons/md';

function MaintenanceRow({maintenance, onDelete, onEdit}) {
    const rowID = 'maintenance_row_' + maintenance.maintenance_logs_id;
    
    return (
        <tr id={rowID}>
            <td>{maintenance.maintenance_logs_id}</td>
            <td>{moment(maintenance.date).format('YYYY-MM-DD')}</td>
            <td>{maintenance.tail_id}</td>
            <td><MdModeEdit className='iconLinks' onClick={() => onEdit(maintenance)}></MdModeEdit></td>
            <td><MdDeleteForever className='iconLinks' onClick={() => onDelete(maintenance.maintenance_logs_id)}></MdDeleteForever></td>
        </tr>
    )
}

export default MaintenanceRow;