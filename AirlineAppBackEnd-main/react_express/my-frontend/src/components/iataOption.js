function IataOption({iata}) {
    return (
        <option value={iata.iata_code} >{iata.iata_code}</option>
    )
}

export default IataOption;