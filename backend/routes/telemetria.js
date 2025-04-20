const express = require('express');
const router = express.Router();
const Telemetria = require('../models/Telemetria');

// GET /api/telemetria/ultima
router.get('/ultima', async (req, res) => {
  try {
    const ultima = await Telemetria.findOne().sort({ timestamp: -1 }).exec();
    if (!ultima) {
      return res.status(404).json({ message: 'Sin datos aún' });
    }
    res.json(ultima);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET /api/telemetria/por-sensor
router.get('/por-sensor', async (req, res) => {
    try {
      const N = parseInt(req.query.limit) || 10;
  
      // Obtener los sensorId únicos
      const sensores = await Telemetria.distinct("sensorId");
  
      // Para cada sensor, buscar las últimas N lecturas
      const data = await Promise.all(sensores.map(async (sensorId) => {
        const lecturas = await Telemetria.find({ sensorId })
          .sort({ timestamp: -1 })
          .limit(N)
          .exec();
        return {
          sensorId,
          lecturas
        };
      }));
  
      res.json(data);
    } catch (err) {
      console.error("Error en /por-sensor:", err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });
  

module.exports = router;
