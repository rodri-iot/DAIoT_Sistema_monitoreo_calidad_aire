import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './Dashboard';

const API_BASE = import.meta.env.VITE_API_URL;
const PING_URL = API_BASE.replace('/api', '') + '/ping';

function App() {
  const [brokerStatus, setBrokerStatus] = useState('Desconectado');

  useEffect(() => {
    const checkBroker = async () => {
      try {
        const res = await fetch(PING_URL);
        const data = await res.json();
        if (res.ok && data.message == 'pong'){
          setBrokerStatus('Conectado');
        } else {
          setBrokerStatus('Desconectado');
        }
      } catch (error) {
        setBrokerStatus('Desconectado');
      }
    };

    checkBroker();
    const interval = setInterval(checkBroker, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar brokerStatus={brokerStatus} />
      <div className="container">
        <Dashboard />
      </div>
    </>
  );
}

export default App;
