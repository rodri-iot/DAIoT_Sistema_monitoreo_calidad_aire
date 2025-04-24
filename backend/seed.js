// backend/seed.js
const mongoose = require('mongoose');
const Telemetria = require('./models/Telemetria');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/iotdb';

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    const count = await Telemetria.countDocuments();
    
    if (count === 0) {
      console.log('🌱 Insertando datos iniciales...');
      await Telemetria.insertMany([
        {
          sensorId: 'nodo1',
          temperatura: 22.5,
          presion: 1011.0,
          timestamp: new Date()
        },
        {
          sensorId: 'nodo1',
          temperatura: 23.1,
          presion: 1011.8,
          timestamp: new Date(Date.now() - 60000)
        },
        {
          sensorId: 'nodo2',
          temperatura: 26.8,
          presion: 1012.2,
          timestamp: new Date(Date.now() - 120000)
        }
      ]);
      console.log('✅ Datos de prueba insertados.');
    } else {
      console.log('📦 La base ya contiene datos. Se omite la carga.');
    }
  } catch (err) {
    console.error('❌ Error al cargar datos iniciales:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedDB();
