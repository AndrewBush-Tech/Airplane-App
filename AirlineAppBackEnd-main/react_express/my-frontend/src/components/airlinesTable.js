import AirlinesRow from './airlinesRow';

function AirlinesTable({airlinesArray, onDelete, onEdit}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Hub</th>
                        <th>Country</th>
                        <th>Iata Code</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {airlinesArray.map((airlines, i) => <AirlinesRow airlines={airlines} key={i} onDelete={onDelete} onEdit={onEdit} />)}
                </tbody>
            </table>
        </div>
    );
}

export default AirlinesTable;