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

module.exports = router;
