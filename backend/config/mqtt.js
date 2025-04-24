const mqtt = require('mqtt');
const fs = require('fs');
const Telemetria = require('../models/Telemetria');

console.log('📂 Iniciando carga de certificados TLS...');


const client = mqtt.connect({
    host: process.env.MQTT_HOST,
    port: 8883,
    protocol: 'mqtts',
    rejectUnauthorized: true,
    key: fs.readFileSync('./certs/client.key'),
    cert: fs.readFileSync('./certs/client.crt'),
    ca: fs.readFileSync('./certs/ca.crt'),
  });

client.on('connect', () => {
    console.log('🟢 Conectado al broker MQTT (TLS)');
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

client.on('error', (err) => {
    console.error('❌ Error MQTT:', err.message);
    console.error('📋 Detalles:', err);
  });
  

module.exports = client;
