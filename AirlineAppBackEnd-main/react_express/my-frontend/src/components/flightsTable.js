import FlightsRow from './flightsRow';

function FlightsTable({flightsArray, onDelete, onEdit}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Flight Number</th>
                        <th>Destination</th>
                        <th>Origin</th>
                        <th>Hours</th>
                        <th>Date</th>
                        <th>Airport Code</th>
                        <th>Tail ID</th>
                        <th>Employee ID</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {flightsArray.map((flights, i) => <FlightsRow flights={flights} key={i} onDelete={onDelete} onEdit={onEdit} />)}
                </tbody>
            </table>
        </div>
    );
}

export default FlightsTable;