const API_URL = window.env?.VITE_API_URL || 'http://192.168.0.193:3000/api';

export const getUltimaLectura = async () => {
  const res = await fetch(`${API_URL}/telemetria/ultima`);
  return res.json();
};
