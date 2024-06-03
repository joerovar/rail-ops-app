import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"

const Navbar = ({ setToken }) => {
    const handleSubmit = (e) => {
      setToken("");
    };
    
    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                <Link>|</Link>
                <Link to="/dashboardOHare">O'Hare</Link>
                <Link>|</Link>
                <Link to="/dashboardFPark">Forest Park</Link>
                <Link>|</Link>
                <Link to="/dashboardUIC">UIC Halsted</Link>
                <Link>|</Link>
                <Link to="/dashboardGeneral">General</Link>
            </div>
        </nav>
    )
}

export default Navbar;