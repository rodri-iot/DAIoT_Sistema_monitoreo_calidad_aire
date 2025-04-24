import { useEffect, useState } from 'react';
import M from 'materialize-css';
import SensorCard from './components/SensorCard';
import SensorCharts from './components/SensorCharts';
import './Dashboard.css';



function Dashboard() {
  const [sensores, setSensores] = useState([]);
  const API_URL = window.env?.VITE_API_URL || 'http://192.168.0.193:3000/api';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/telemetria/por-sensor?limit=10`);
        const data = await res.json();
        setSensores(data);
      } catch (error) {
        console.error("Error al obtener datos por sensor:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sensores.length === 0) return;

    setTimeout(() => {
      const tabs = document.querySelectorAll('.tabs');
      M.Tabs.init(tabs);
    }, 100);
  }, [sensores]);

  if (sensores.length === 0) {
    return <p className="center-align">Cargando datos...</p>;
  }

  return (
<div className="dashboard-container">
  <ul className="tabs">
    {sensores.map((sensor, index) => (
      <li className="tab col s3" key={sensor.sensorId}>
        <a href={`#sensor-${sensor.sensorId}`} className={index === 0 ? 'active' : ''}>
          {sensor.sensorId}
        </a>
      </li>
    ))}
  </ul>

    {sensores.map(sensor => {
    const ultima = sensor.lecturas[0];
    return (
        <div id={`sensor-${sensor.sensorId}`} key={sensor.sensorId} className="sensor-section">
        <div className="sensor-title">Mediciones de {sensor.sensorId}</div>

        <div className="card blue-grey darken-1 white-text sensor-card">
            <div className="card-content">
            <span className="card-title">Última lectura</span>
            <p><strong>Temperatura:</strong> {ultima.temperatura} °C</p>
            <p><strong>Presión:</strong> {ultima.presion} hPa</p>
            <p><strong>Timestamp:</strong> {new Date(ultima.timestamp).toLocaleString()}</p>
            </div>
        </div>

        <div className="sensor-charts">
            <SensorCharts sensor={sensor} />
        </div>
        </div>
    );
    })}
    </div>
  );
}

export default Dashboard;