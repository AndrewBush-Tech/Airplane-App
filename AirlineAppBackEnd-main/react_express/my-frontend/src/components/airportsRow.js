import React from 'react';
import {MdDeleteForever,MdModeEdit} from 'react-icons/md';

function AirportsRow({airports, onDelete, onEdit}) {
    const rowID = 'airports_row_' + airports.airport_code;
    
    return (
        <tr id={rowID}>
            <td>{airports.name}</td>
            <td>{airports.city}</td>
            <td>{airports.country}</td>
            <td>{airports.airport_code}</td>
            <td><MdModeEdit className='iconLinks' onClick={() => onEdit(airports)}></MdModeEdit></td>
            <td><MdDeleteForever className='iconLinks' onClick={() => onDelete(airports.airport_code)}></MdDeleteForever></td>
        </tr>
    )
}

export default AirportsRow;