import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import Aircraft from './pages/aircraft';
import AircraftEdit from './pages/aircraftEdit';
import Maintenance from './pages/maintenance';
import MaintenanceEdit from './pages/maintenanceEdit';
import Airlines from './pages/airlines';
import AirlinesEdit from './pages/airlinesEdit';
import Airports from './pages/airports';
import AirportsEdit from './pages/airportsEdit';
import Pilots from './pages/pilots';
import PilotsEdit from './pages/pilotsEdit';
import Flights from './pages/flights';
import FlightsEdit from './pages/flightsEdit';
import Header from './components/header';
import Navigation from './components/navigation';
import Footer from './components/footer';

function App() {  
  const [aircraftToEdit, setAircraftToEdit] = useState();
  const [maintenanceToEdit, setMaintenanceToEdit] = useState();
  const [airlinesToEdit, setAirlinesToEdit] = useState();
  const [airportsToEdit, setAirportsToEdit] = useState();
  const [pilotsToEdit, setPilotsToEdit] = useState();
  const [flightsToEdit, setFlightsToEdit] = useState();

  const fieldValidator = function(val, val_type, field_name) {
    // pass in a value and how you want to test... returns true/false and message
    console.log(`Received ${val}, ${val_type}, and ${field_name}`);
    
    // We only want to test for blanks when specified, otherwise, blanks are ok
    if(val_type !== 'notblank' && val.trim() === "") {
      return {test_result:true,message:""};
    }

    // apply an value test based on the type of input
    switch(val_type) {
      case "email":
        if(val.trim().length > 5 && val.includes('@') && val.includes('.')) {
          return {test_result:true,message:""};
        } else {
          return {test_result:false,message:`${field_name} is not a proper email`};
        }
      case "notblank":
        if(val === null || val.trim() === ""){
          return {test_result:false,message:`${field_name} cannot be blank`};
        } else {
          return {test_result:true,message:""};
        }
      case "number":
        if(isNaN(val) || isNaN(parseFloat(val))) {
          return {test_result:false,message:`${field_name} is not a number`};
        } else {
          return {test_result:true,message:""};
        }
      case "text":
        if(typeof val === 'string') {
          return {test_result:true, message:""};
        } else {
          return {test_result:false,message:`${field_name} is not text`};
        }
        case "date":
          if(isNaN(Date.parse(val))) {
            return {test_result:false,message:`${field_name} is not a proper date`};
          } else {
            return {test_result:true, message:""};
          }
        default:
        {
           return {test_result:true, message:""};
        }
    }
  }

  const evaluateForm = field_array => {
    // Evaluate all fields in form
    console.log(`Received ${JSON.stringify(field_array)}`);

    let form_response = {
      valid:true,
      message:""
    };

    // Loop through fields
    for (const field of field_array) { 
      let field_state = fieldValidator(field.val, field.val_type, field.field_name);
      if(!field_state.test_result) {
        form_response.valid = false;
        if(form_response.message !== "") {
          form_response.message += ", ";
        } 
        form_response.message += field_state.message;
      }
    }

    return form_response;
  }

  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Navigation></Navigation>
        <br/>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/homepage">
          <HomePage/>
        </Route>
        <Route path="/airlines">
          <Airlines setAirlinesToEdit={setAirlinesToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/airlinesEdit">
          <AirlinesEdit airlinesToEdit={airlinesToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/aircraft">
          <Aircraft setAircraftToEdit={setAircraftToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/aircraftEdit">
          <AircraftEdit aircraftToEdit={aircraftToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/maintenance">
          <Maintenance setMaintenanceToEdit={setMaintenanceToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/maintenanceEdit">
          <MaintenanceEdit maintenanceToEdit={maintenanceToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/airports">
          <Airports setAirportsToEdit={setAirportsToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/airportsEdit">
          <AirportsEdit airportsToEdit={airportsToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/pilots">
          <Pilots setPilotsToEdit={setPilotsToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/pilotsEdit">
          <PilotsEdit pilotsToEdit={pilotsToEdit} evaluateForm={evaluateForm}/>
        </Route>
        <Route path="/flights">
          <Flights setFlightsToEdit={setFlightsToEdit}/>
        </Route>
        <Route path="/flightsEdit">
          <FlightsEdit flightsToEdit={flightsToEdit}/>
        </Route>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;