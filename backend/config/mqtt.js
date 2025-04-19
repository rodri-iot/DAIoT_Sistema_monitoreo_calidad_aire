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
