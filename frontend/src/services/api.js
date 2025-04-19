const API_URL = import.meta.env.VITE_API_URL;

export const getUltimaLectura = async () => {
  const res = await fetch(`${API_URL}/telemetria/ultima`);
  return res.json();
};
