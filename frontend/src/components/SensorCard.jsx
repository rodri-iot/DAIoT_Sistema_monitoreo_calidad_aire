import React from 'react';

function SensorCard({ lectura }) {
  if (!lectura) return <p>No hay datos aún para este nodo.</p>;

  return (
    <div className="card blue-grey darken-1 white-text">
      <div className="card-content">
        <span className="card-title">Última lectura de {lectura.sensorId}</span>
        <p><strong>Temperatura:</strong> {lectura.temperatura} °C</p>
        <p><strong>Presión:</strong> {lectura.presion} hPa</p>
        <p><strong>Timestamp:</strong> {new Date(lectura.timestamp).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default SensorCard;
