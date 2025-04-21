const mqtt = require('mqtt');
const fs = require('fs');
const Telemetria = require('../models/Telemetria');

const client = mqtt.connect(process.env.MQTT_BROKER, {
    ca: fs.readFileSync('./mosquitto/certs/ca.crt'),
    rejectUnauthorized: false // solo para desarrollo
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

module.exports = client;
