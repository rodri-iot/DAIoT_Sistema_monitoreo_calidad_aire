import React from "react";
import "./Navbar.css";
import logoFiuba from "../assets/logo-fiuba.png";

function Navbar({ brokerStatus }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logoFiuba} alt="FIUBA" />
      </div>
      <div className="navbar-content">
        <div className="navbar-title">
          Facultad de Ingeniería de la Universidad de Buenos Aires | <strong>FIUBA</strong>
        </div>
        <div className="navbar-status">
          Broker: <span className={brokerStatus === 'Conectado' ? 'green' : 'red'}>
            {brokerStatus}
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
