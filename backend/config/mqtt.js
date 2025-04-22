/*
const mqtt = require('mqtt');
const fs = require('fs');
const Telemetria = require('../models/Telemetria');

console.log('📂 Iniciando carga de certificados TLS...');

let client;

try {
  const ca = fs.readFileSync('./mosquitto/certs/ca.crt');
  const key = fs.readFileSync('./mosquitto/certs/client.key');
  const cert = fs.readFileSync('./mosquitto/certs/client.crt');

  console.log('✅ Certificados TLS cargados correctamente.');

  client = mqtt.connect({
    host: '192.168.0.193',
    port: 8883,
    protocol: 'mqtts',
    rejectUnauthorized: true, // prueba también con false si sigue fallando
    key,
    cert,
    ca
  });

  client.on('connect', () => {
    console.log('🟢 Conectado al broker MQTT (TLS)');
    client.subscribe('telemetria/#', (err) => {
      if (err) {
        console.error('❌ Error al suscribirse al tópico MQTT:', err.message);
      } else {
        console.log('📡 Suscripción activa al tópico: telemetria/#');
      }
    });
  });

  client.on('error', (err) => {
    console.error('❌ Error de conexión MQTT:', err.message);
    console.error('🧪 Revisión sugerida: verificar si el certificado de cliente es correcto y coincide con la CA');
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

} catch (error) {
  console.error('❌ Error al cargar certificados TLS:', error.message);
  process.exit(1);
}

module.exports = client;
*/



const mqtt = require('mqtt');
const fs = require('fs');
const Telemetria = require('../models/Telemetria');

console.log('📂 Iniciando carga de certificados TLS...');

const client = mqtt.connect({
    host: '192.168.0.193',
    port: 8883,
    protocol: 'mqtts',
    rejectUnauthorized: true,
    key: fs.readFileSync('./mosquitto/certs/client.key'),
    cert: fs.readFileSync('./mosquitto/certs/client.crt'),
    ca: fs.readFileSync('./mosquitto/certs/ca.crt'),
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
