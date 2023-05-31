import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className = "fixed">
            <Link className='navLinks' to="/homepage">Safety Dashboard</Link>
            <Link className='navLinks' to="/airlines"> Manage Airlines Information</Link>
            <Link className='navLinks' to="/aircraft"> Manage Aircraft Information</Link>
            <Link className='navLinks' to="/airports"> Manage Airports Information</Link>
            <Link className='navLinks' to="/pilots"> Manage Pilots Information</Link>
            <Link className='navLinks' to="/flights"> Manage Flight Information</Link>
            <Link className='navLinks' to="/maintenance"> Manage Maintenance Information</Link>
        </nav>
    );
}

export default Navigation;
