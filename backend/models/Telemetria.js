const mongoose = require('mongoose');

const TelemetriaSchema = new mongoose.Schema({
  sensorId: String,
  temperatura: Number,
  presion: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Telemetria', TelemetriaSchema);
