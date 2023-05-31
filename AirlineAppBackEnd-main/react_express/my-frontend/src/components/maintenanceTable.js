import MaintenanceRow from './maintenanceRow';

function MaintenanceTable({maintenanceArray, onDelete, onEdit}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Maintenance Log Number</th>
                        <th>Date</th>
                        <th>Tail ID</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {maintenanceArray.map((maintenance, i) => <MaintenanceRow maintenance={maintenance} key={i} onDelete={onDelete} onEdit={onEdit} />)}
                </tbody>
            </table>
        </div>
    );
}

export default MaintenanceTable;