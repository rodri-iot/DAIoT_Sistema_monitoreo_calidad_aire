import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function SensorCharts({ sensor }) {
  const tempChartRef = useRef(null);
  const presChartRef = useRef(null);

  useEffect(() => {
    // 🔁 Destruir gráficos anteriores si existen
    if (tempChartRef.current) {
      tempChartRef.current.destroy();
    }
    if (presChartRef.current) {
      presChartRef.current.destroy();
    }

    // 🟠 Temperatura
    const tempCtx = document.getElementById(`chart-temp-${sensor.sensorId}`);
    if (tempCtx) {
      tempChartRef.current = new Chart(tempCtx, {
        type: 'line',
        data: {
          labels: sensor.lecturas.map(e => new Date(e.timestamp).toLocaleTimeString()),
          datasets: [{
            label: 'Temperatura (°C)',
            data: sensor.lecturas.map(e => e.temperatura),
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.2)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // 🔵 Presión
    const presCtx = document.getElementById(`chart-pres-${sensor.sensorId}`);
    if (presCtx) {
      presChartRef.current = new Chart(presCtx, {
        type: 'line',
        data: {
          labels: sensor.lecturas.map(e => new Date(e.timestamp).toLocaleTimeString()),
          datasets: [{
            label: 'Presión (hPa)',
            data: sensor.lecturas.map(e => e.presion),
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // 🧹 Limpieza al desmontar o actualizar
    return () => {
      if (tempChartRef.current) tempChartRef.current.destroy();
      if (presChartRef.current) presChartRef.current.destroy();
    };
  }, [sensor]);

  return (
    <div>
      <div className="sensor-chart">
        <h6 className="center-align">Gráfico de Temperatura</h6>
        <div style={{ height: "250px" }}>
          <canvas id={`chart-temp-${sensor.sensorId}`}></canvas>
        </div>
      </div>

      <div className="sensor-chart">
        <h6 className="center-align">Gráfico de Presión</h6>
        <div style={{ height: "250px" }}>
          <canvas id={`chart-pres-${sensor.sensorId}`}></canvas>
        </div>
      </div>
    </div>
  );
}

export default SensorCharts;
