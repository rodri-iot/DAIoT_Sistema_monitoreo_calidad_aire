import paho.mqtt.client as mqtt
import json
import time

broker = "localhost"
port = 1883
topic = "telemetria/nodo1"

client = mqtt.Client()
client.connect(broker, port)

while True:
    payload = {
        "sensorId": "nodo1",
        "temperatura": 23.4,
        "presion": 1013.25
    }
    client.publish(topic, json.dumps(payload))
    print("Publicado:", payload)
    time.sleep(5)
