function AirportOption({airport}) {
    return (
        <option value={airport.airport_code} >{airport.airport_code}</option>
    )
}

export default AirportOption;