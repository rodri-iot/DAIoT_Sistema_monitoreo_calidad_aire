import { useEffect, useState } from 'react'

function App() {
  const [lectura, setLectura] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/telemetria/ultima`)
        const data = await res.json()
        setLectura(data)
      } catch (error) {
        console.error("Error al obtener lectura:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🌡️ Sistema de Monitoreo IoT</h1>
      {lectura ? (
        <div>
          <p><strong>Sensor:</strong> {lectura.sensorId}</p>
          <p><strong>Temperatura:</strong> {lectura.temperatura} °C</p>
          <p><strong>Presión:</strong> {lectura.presion} hPa</p>
          <p><strong>Última lectura:</strong> {new Date(lectura.timestamp).toLocaleString()}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  )
}

export default App
