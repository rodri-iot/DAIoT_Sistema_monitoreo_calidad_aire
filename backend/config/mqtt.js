/*
const mqtt = require('mqtt');
const client = mqtt.connect(process.env.MQTT_BROKER);

client.on('connect', () => {
  console.log('🟢 Conectado al broker MQTT');
  client.subscribe('telemetria/#');
});

client.on('message', (topic, message) => {
  console.log(`[MQTT] ${topic}:`, message.toString());
  // En este punto, podrías parsear el mensaje y guardarlo en Mongo
});

module.exports = client;

*/

const mqtt = require('mqtt');
const Telemetria = require('../models/Telemetria');

const client = mqtt.connect(process.env.MQTT_BROKER);

client.on('connect', () => {
  console.log('🟢 Conectado al broker MQTT');
  client.subscribe('telemetria/#', (err) => {
    if (err) {
      console.error('❌ Error al suscribirse al tópico MQTT:', err);
    } else {
      console.log('📡 Suscripción activa al tópico: telemetria/#');
    }
  });
});

client.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    console.log(`📥 [MQTT] Mensaje recibido en ${topic}:`, payload);

    // Guardar en MongoDB
    const nuevaLectura = new Telemetria({
      sensorId: payload.sensorId || 'desconocido',
      temperatura: payload.temperatura,
      presion: payload.presion
    });

    await nuevaLectura.save();
    console.log('✅ Telemetría guardada en MongoDB');
  } catch (error) {
    console.error('❌ Error al procesar mensaje MQTT:', error.message);
  }
});

module.exports = client;
