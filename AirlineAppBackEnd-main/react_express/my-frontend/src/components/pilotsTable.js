import PilotsRow from './pilotsRow';

function PilotsTable({pilotsArray, onDelete, onEdit}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Employee Number</th>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Airport Code</th>
                        <th>Iata Code</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pilotsArray.map((pilots, i) => <PilotsRow pilots={pilots} key={i} onDelete={onDelete} onEdit={onEdit} />)}
                </tbody>
            </table>
        </div>
    );
}

export default PilotsTable;