function EmployeeOption({employee}) {
    return (
        <option value={employee.employee_id} >{employee.employee_id}</option>
    )
}

export default EmployeeOption;