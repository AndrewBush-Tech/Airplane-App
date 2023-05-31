import React from 'react';
import moment from "moment";
import {MdDeleteForever,MdModeEdit} from 'react-icons/md';

function FlightsRow({flights, onDelete, onEdit, onChange}) {
    const rowID = 'flights_row_' + flights.flight_id;
    
    return (
        <tr id={rowID}>
            <td>{flights.flight_id}</td>
            <td>{flights.destination_airport}</td>
            <td>{flights.origin_airport}</td>
            <td>{flights.hours}</td>
            <td>{moment(flights.date).format('YYYY-MM-DD')}</td>
            <td>{flights.airport_code}</td>
            <td>{flights.tail_id}</td>
            <td>{flights.employee_id}</td>
            <td><MdModeEdit className='iconLinks' onClick={() => onEdit(flights)}></MdModeEdit></td>
            <td><MdDeleteForever className='iconLinks' onClick={() => onDelete(flights.flight_id)}></MdDeleteForever></td>
        </tr>
    )
}

export default FlightsRow;