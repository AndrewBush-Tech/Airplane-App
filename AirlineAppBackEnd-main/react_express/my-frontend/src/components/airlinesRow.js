import React from 'react';
import {MdDeleteForever,MdModeEdit} from 'react-icons/md';

function AirlinesRow({airlines, onDelete, onEdit}) {
    const rowID = 'airlines_row_' + airlines.iata_code;
    
    return (
        <tr id={rowID}>
            <td>{airlines.name}</td>
            <td>{airlines.hub}</td>
            <td>{airlines.country}</td>
            <td>{airlines.iata_code}</td>
            <td><MdModeEdit className='iconLinks' onClick={() => onEdit(airlines)}></MdModeEdit></td>
            <td><MdDeleteForever className='iconLinks' onClick={() => onDelete(airlines.iata_code)}></MdDeleteForever></td>
        </tr>
    )
}

export default AirlinesRow;