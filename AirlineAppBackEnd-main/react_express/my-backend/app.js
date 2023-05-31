// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

console.log(`Node application started...`)

const PORT = process.env.PORT || 5500;

// Database
var db = require('./database/db-connector');

/*
    ROUTES
*/
// Default homepage
app.get('/', function(req, res)
{  
    console.log(`Loaded homepage`);
    res.send('Airline DB API');                                                      
});

// Get all aircraft
app.get('/aircraft', function(req, res)
{  
    console.log(`Loaded /aircraft`);
    let query = "SELECT * FROM Aircraft;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get all Iata codes
app.get('/iata', function(req, res)
{  
    console.log(`Loaded /iata`);
    let query = "SELECT iata_code FROM Airlines;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get aircraft by tail_id
app.get('/aircraft/:tail_id', function(req, res)
{  
    console.log(`Loaded /aircraft/${req.params.tail_id}`);
    let query = `SELECT * FROM Aircraft WHERE tail_id = ${req.params.tail_id};`;             
    db.pool.query(query, function(error, rows, fields){
        console.log(`GET aircraftbyid = ${rows}`);
        res.status(200).contentType('application/json').json(rows);                
    })                                                     
});

// Post new aircraft
app.post('/add-aircraft', function(req, res) 
{
    console.log(`Loaded add-aircraft with body= ${JSON.stringify(req.body)}`);
    let data = req.body;
    let engine = parseInt(data.engine);
    if (isNaN(engine))
    {
        engine = 0;
    }

    let query = `INSERT INTO Aircraft (manufacturer, model, engine, iata_code) VALUES ('${data.manufacturer}', '${data.model}', ${engine}, '${data.iata_code}')`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.status(400).send(`Problems: ${error}`);
        }
        else
        {
            console.log(`Success!!!!!`);
            res.status(201).send(`Success!`);
        }
    })
});

app.delete('/aircraft/:tail_id', function(req,res,next){
    console.log(`/delete-aircraft = ${req.params.tail_id}`);
    let tail_id = parseInt(req.params.tail_id);
    let delete_Aircraft= `DELETE FROM Aircraft WHERE tail_id = ${tail_id}`;
  
    db.pool.query(delete_Aircraft, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            console.log(tail_id);
            res.sendStatus(400);
        } else {
            console.log(`Delete aircraft success`);
            res.sendStatus(204);
        }
    })
});

app.put('/put-aircraft/:tail_id', function(req,res,next){
    console.log(`/put-aircraft = ${req.params.tail_id}`);
    let data = req.body;
    let engine = parseInt(data.engine);
    let tail_id = parseInt(req.params.tail_id);

    if (isNaN(engine))
    {
        engine = 0
    }

    queryUpdate = `UPDATE Aircraft SET manufacturer =  '${data.manufacturer}', model =  '${data.model}',
    engine =  ${engine}, iata_code =  '${data.iata_code}' WHERE tail_id = ${tail_id};`;
    db.pool.query(queryUpdate, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            console.log(`Update aircraft success`);
            res.sendStatus(200);
        }
    })
});

// Get all airlines
app.get('/airlines', function(req, res)
{  
    console.log(`Loaded /airlines`);
    let query = `SELECT * FROM Airlines;`;             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Post new airlines
app.post('/add-airlines', function(req, res) 
{
    console.log(`Loaded add-airlines with body= ${JSON.stringify(req.body)}`);
    let data = req.body;
    let query = `INSERT INTO Airlines (name, hub, country, iata_code) VALUES ('${data.name}', '${data.hub}', '${data.country}', '${data.iata_code}')`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.status(400).send(`Problems: ${error}`);
        }
        else
        {   
            console.log(`Success!!!!!`);
            res.status(201).send(`Success!`);
        }
    })
});

app.delete('/airlines/:iata_code', function(req,res,next){
    console.log(`/delete-airlines = ${req.params.iata_code}`);
    let delete_Airlines= `DELETE FROM Airlines WHERE iata_code = '${req.params.iata_code}'`;

    db.pool.query(delete_Airlines, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            console.log(iata_code);
            res.sendStatus(400);
        } else {
            console.log(`Delete airlines success`);
            res.sendStatus(204);
        }
    })
});

app.put('/put-airlines/:iata_code', function(req,res,next){
    console.log(`/put-airlines = ${req.params.iata_code}`);
    let data = req.body;

    queryUpdate = `UPDATE Airlines SET name =  '${data.name}', hub =  '${data.hub}',
    country =  '${data.country}', iata_code = '${data.iata_code}' WHERE iata_code = '${data.iata_code}';`;
    db.pool.query(queryUpdate, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            console.log(`Update airlines success`);
            res.sendStatus(200);
        }
    })
});

// Get all pilots
app.get('/pilots', function(req, res)
{  
    console.log(`Loaded /pilots`);
    let query = "SELECT * FROM Pilots;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get all airport codes
app.get('/airportCode', function(req, res)
{  
    console.log(`Loaded /airportCode`);
    let query = "SELECT airport_code FROM Airports;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get pilots by employee_id
app.get('/pilots/:employee_id', function(req, res)
{  
    console.log(`Loaded /pilots/${req.params.employee_id}`);
    let query = `SELECT * FROM Pilots WHERE employee_id = ${req.params.employee_id};`;             
    db.pool.query(query, function(error, rows, fields){
        console.log(`GET pilotsbyid = ${rows}`);
        res.status(200).contentType('application/json').json(rows);                
    })                                                     
});

// Post new pilots
app.post('/add-pilots', function(req, res) 
{
    console.log(`Loaded add-pilots with body= ${JSON.stringify(req.body)}`);
    let data = req.body;

    let query = `INSERT INTO Pilots (airport_code, name, rank, iata_code) VALUES ('${data.airport_code}', '${data.name}', '${data.rank}', '${data.iata_code}')`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.status(400).send(`Problems: ${error}`);
        }
        else
        {
            console.log(`Success!!!!!`);
            res.status(201).send(`Success!`);
        }
    })
});

app.delete('/pilots/:employee_id', function(req,res,next){
    console.log(`/delete-pilots = ${req.params.employee_id}`);
    let employee_id = parseInt(req.params.employee_id);
    let delete_Pilots= `DELETE FROM Pilots WHERE employee_id = ${employee_id}`;
  
    db.pool.query(delete_Pilots, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            console.log(employee_id);
            res.sendStatus(400);
        } else {
            console.log(`Delete pilots success`);
            res.sendStatus(204);
        }
    })
});

app.put('/put-pilots/:employee_id', function(req,res,next){
    console.log(`/put-pilots = ${req.params.employee_id}`);
    let data = req.body;
    let employee_id = parseInt(req.params.employee_id);

    queryUpdate = `UPDATE Pilots SET airport_code =  '${data.airport_code}', name =  '${data.name}',
    rank =  '${data.rank}', iata_code =  '${data.iata_code}' WHERE employee_id = ${employee_id};`;
    db.pool.query(queryUpdate, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            console.log(`Update pilots success`);
            res.sendStatus(200);
        }
    })
});

// Get all airports
app.get('/airports', function(req, res)
{  
    console.log(`Loaded /airports`);
    let query = `SELECT * FROM Airports;`;             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Post new airports
app.post('/add-airports', function(req, res) 
{
    console.log(`Loaded add-airports with body= ${JSON.stringify(req.body)}`);
    let data = req.body;
    let query = `INSERT INTO Airports (name, city, country, airport_code) VALUES ('${data.name}', '${data.city}', '${data.country}', '${data.airport_code}')`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.status(400).send(`Problems: ${error}`);
        }
        else
        {   
            console.log(`Success!!!!!`);
            res.status(201).send(`Success!`);
        }
    })
});

app.delete('/airports/:airport_code', function(req,res,next){
    console.log(`/delete-airports = ${req.params.airport_code}`);
    let delete_Airports= `DELETE FROM Airports WHERE airport_code = '${req.params.airport_code}'`;

    db.pool.query(delete_Airports, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            console.log(airport_code);
            res.sendStatus(400);
        } else {
            console.log(`Delete airports success`);
            res.sendStatus(204);
        }
    })
});

app.put('/put-airports/:airport_code', function(req,res,next){
    console.log(`/put-airports = ${req.params.airport_code}`);
    let data = req.body;

    queryUpdate = `UPDATE Airports SET name =  '${data.name}', city =  '${data.city}',
    country =  '${data.country}', airport_code = '${data.airport_code}' WHERE airport_code = '${data.airport_code}';`;
    db.pool.query(queryUpdate, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            console.log(`Update airports success`);
            res.sendStatus(200);
        }
    })
});

// Get all flights
app.get('/flights', function(req, res)
{  
    console.log(`Loaded /flights`);
    let query = "SELECT * FROM Flights;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get all employee ids
app.get('/employee_id', function(req, res)
{  
    console.log(`Loaded /employee_id`);
    let query = "SELECT employee_id FROM Pilots;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get all tail ids
app.get('/tail_id', function(req, res)
{  
    console.log(`Loaded /tail_id`);
    let query = "SELECT tail_id FROM Aircraft;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get flights by flight_id
app.get('/flights/:flight_id', function(req, res)
{  
    console.log(`Loaded /flights/${req.params.flight_id}`);
    let query = `SELECT * FROM Flights WHERE flight_id = ${req.params.flight_id};`;             
    db.pool.query(query, function(error, rows, fields){
        console.log(`GET flightsbyid = ${rows}`);
        res.status(200).contentType('application/json').json(rows);                
    })                                                     
});

// Post new flights
app.post('/add-flights', function(req, res) 
{
    console.log(`Loaded add-flights with body= ${JSON.stringify(req.body)}`);
    let data = req.body;
    let employee_id = parseInt(data.employee_id);
    let tail_id = parseInt(data.tail_id);
    let hours = parseInt(data.hours);

        if (isNaN(tail_id))
    {
        tail_id = 0;
    }

        if (isNaN(employee_id))
    {
        employee_id = 0;
    }

        if (isNaN(hours))
    {
        hours = 0;
    }

    let query = `INSERT INTO Flights ( destination_airport, origin_airport, hours, date, airport_code, tail_id, employee_id ) VALUES ('${data.destination_airport}', '${data.origin_airport}', ${hours}, '${data.date}', '${data.airport_code}', ${tail_id}, ${employee_id})`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.status(400).send(`Problems: ${error}`);
        }
        else
        {
            console.log(`Success!!!!!`);
            res.status(201).send(`Success!`);
        }
    })
});

app.delete('/flights/:flight_id', function(req,res,next){
    console.log(`/delete-flights = ${req.params.flight_id}`);
    let flight_id = parseInt(req.params.flight_id);
    let delete_Flights= `DELETE FROM Flights WHERE flight_id = ${flight_id}`;
  
    db.pool.query(delete_Flights, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            console.log(flight_id);
            res.sendStatus(400);
        } else {
            console.log(`Delete flights success`);
            res.sendStatus(204);
        }
    })
});

app.put('/put-flights/:flight_id', function(req,res,next){
    console.log(`/put-flights = ${req.params.flight_id}`);
    let data = req.body;
    let flight_id = parseInt(req.params.flight_id);
    let tail_id = parseInt(data.tail_id);
    let employee_id = parseInt(data.employee_id);
    let hours = parseInt(data.hours);

    if (isNaN(employee_id))
    {
        employee_id = 0
    }

    if (isNaN(tail_id))
    {
        tail_id = 0
    }

    if (isNaN(hours))
    {
        hours = 0
    }

    queryUpdate = `UPDATE Flights SET airport_code =  '${data.airport_code}', origin_airport =  '${data.origin_airport}',
    destination_airport =  '${data.destination_airport}', tail_id =  ${tail_id}, employee_id =  ${employee_id}, hours =  ${hours}, date = '${data.date}'  WHERE flight_id = ${flight_id};`;
    db.pool.query(queryUpdate, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            console.log(`Update flights success`);
            res.sendStatus(200);
        }
    })
});

// Get all maintenance logs
app.get('/maintenance', function(req, res)
{  
    console.log(`Loaded /maintenance`);
    let query = "SELECT * FROM Maintenance_logs;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get all Tail IDs
app.get('/tail', function(req, res)
{  
    console.log(`Loaded /tail`);
    let query = "SELECT tail_id FROM Aircraft;";             
    db.pool.query(query, function(error, rows, fields){  
        res.status(200).contentType('application/json').json(rows);                  
    })                                                     
});

// Get maintenance by maintenance_logs_id
app.get('/maintenance/:tail_id', function(req, res)
{  
    console.log(`Loaded /maintenance/${req.params.maintenance_logs_id}`);
    let query = `SELECT * FROM Maintenance_logs WHERE maintenance_logs_id = ${req.params.maintenance_logs_id};`;             
    db.pool.query(query, function(error, rows, fields){
        console.log(`GET maintenancebyid = ${rows}`);
        res.status(200).contentType('application/json').json(rows);                
    })                                                     
});

// Post new maintenance
app.post('/add-maintenance', function(req, res) 
{
    console.log(`Loaded add-maintenance with body= ${JSON.stringify(req.body)}`);
    let data = req.body;

    let query = `INSERT INTO Maintenance_logs (date, tail_id) VALUES ( '${data.date}', '${data.tail_id}')`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.status(400).send(`Problems: ${error}`);
        }
        else
        {
            console.log(`Success!!!!!`);
            res.status(201).send(`Success!`);
        }
    })
});

app.delete('/maintenance/:maintenance_logs_id', function(req,res,next){
    console.log(`/delete-maintenance = ${req.params.maintenance_logs_id}`);
    let maintenance_logs_id = parseInt(req.params.maintenance_logs_id);
    let delete_Maintenance= `DELETE FROM Maintenance_logs WHERE maintenance_logs_id = ${maintenance_logs_id}`;
  
    db.pool.query(delete_Maintenance, function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            console.log(maintenance_logs_id);
            res.sendStatus(400);
        } else {
            console.log(`Delete maintenance success`);
            res.sendStatus(204);
        }
    })
});

app.put('/put-maintenance/:maintenance_logs_id', function(req,res,next){
    console.log(`/put-maintenance = ${req.params.maintenance_logs_id}`);
    let data = req.body;
    let maintenance_logs_id = parseInt(req.params.maintenance_logs_id);

    queryUpdate = `UPDATE Maintenance_logs SET date =  '${data.date}', tail_id =  '${data.tail_id}' WHERE maintenance_logs_id = ${maintenance_logs_id};`;
    db.pool.query(queryUpdate, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            console.log(`Update maintenance success`);
            res.sendStatus(200);
        }
    })
});
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on port:' + PORT + '; press Ctrl-C to terminate.')
});