import React from 'react';
import {MdDeleteForever,MdModeEdit} from 'react-icons/md';

function PilotsRow({pilots, onDelete, onEdit}) {
    const rowID = 'pilots_row_' + pilots.employee_id;
    
    return (
        <tr id={rowID}>
            <td>{pilots.employee_id}</td>
            <td>{pilots.rank}</td>
            <td>{pilots.name}</td>
            <td>{pilots.airport_code}</td>
            <td>{pilots.iata_code}</td>
            <td><MdModeEdit className='iconLinks' onClick={() => onEdit(pilots)}></MdModeEdit></td>
            <td><MdDeleteForever className='iconLinks' onClick={() => onDelete(pilots.employee_id)}></MdDeleteForever></td>
        </tr>
    )
}

export default PilotsRow;