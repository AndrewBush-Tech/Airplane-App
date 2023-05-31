import React from 'react';
import {MdDeleteForever,MdModeEdit} from 'react-icons/md';

function AircraftRow({aircraft, onDelete, onEdit}) {
    const rowID = 'aircraft_row_' + aircraft.tail_id;
    
    return (
        <tr id={rowID}>
            <td>{aircraft.tail_id}</td>
            <td>{aircraft.manufacturer}</td>
            <td>{aircraft.model}</td>
            <td>{aircraft.engine}</td>
            <td>{aircraft.iata_code}</td>
            <td><MdModeEdit className='iconLinks' onClick={() => onEdit(aircraft)}></MdModeEdit></td>
            <td><MdDeleteForever className='iconLinks' onClick={() => onDelete(aircraft.tail_id)}></MdDeleteForever></td>
        </tr>
    )
}

export default AircraftRow;