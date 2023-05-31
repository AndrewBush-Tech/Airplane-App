import AircraftRow from './aircraftRow';

function AircraftTable({aircraftArray, onDelete, onEdit}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Tail Number</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                        <th>Engine</th>
                        <th>Iata Code</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {aircraftArray.map((aircraft, i) => <AircraftRow aircraft={aircraft} key={i} onDelete={onDelete} onEdit={onEdit} />)}
                </tbody>
            </table>
        </div>
    );
}

export default AircraftTable;