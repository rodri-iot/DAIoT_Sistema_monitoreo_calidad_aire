import paho.mqtt.client as mqtt
import ssl
import json
import time

broker_host = "localhost"  # O "mqtt" si estás dentro de Docker
broker_port = 8883
topic = "telemetria/nodo-001"

# Carga de certificado CA
ca_cert = "../mosquitto/certs/ca.crt"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("🟢 Conectado al broker MQTT con TLS")
        payload = {
            "sensorId": "nodo-001",
            "temperatura": 26.5,
            "presion": 1021.3
        }
        client.publish(topic, json.dumps(payload))
        print("📤 Mensaje enviado:", payload)
        time.sleep(1)
        client.disconnect()
    else:
        print("❌ Fallo la conexión, código:", rc)

client = mqtt.Client()
client.tls_set(ca_certs=ca_cert, certfile=None, keyfile=None, tls_version=ssl.PROTOCOL_TLSv1_2)
client.tls_insecure_set(False)  # Cambiar a True solo para debugging

client.on_connect = on_connect

print("🔌 Conectando...")
client.connect(broker_host, broker_port)
client.loop_forever()
