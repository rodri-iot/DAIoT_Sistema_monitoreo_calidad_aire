# DAIoT_Sistema_monitoreo_calidad_aire

# 🌱 Sistema de Monitoreo de Calidad del Aire

**Autor:** Ing. Rodrigo J. Pinedo Nava  
**Especialización:** Internet de las Cosas (IoT)  
**Institución:** Facultad de Ingeniería – Universidad de Buenos Aires (FIUBA)  
**Fecha:** Abril 2025

---

## 📌 Descripción del Proyecto

Este proyecto propone el desarrollo de un sistema IoT para el monitoreo ambiental, enfocado en la medición de **temperatura**, **presión atmosférica** y otros parámetros asociados a la calidad del aire. El sistema está construido sobre una arquitectura distribuida utilizando microcontroladores ESP32 y contenedores Docker, con despliegue previsto en una instancia de Google Cloud Platform (GCP).

---

## ⚙️ Arquitectura General

- 📟 **ESP32**: Sensor node que simula o captura datos de temperatura y presión.
- 📡 **MQTT (Mosquitto Broker con TLS)**: Canal seguro de comunicación para envío de datos.
- 🖥️ **Backend (Node.js + MQTT.js + MongoDB)**: API RESTful para almacenamiento y consulta.
- 💾 **MongoDB**: Base de datos NoSQL para telemetría.
- 🌐 **Frontend (React + Vite)**: Dashboard visual responsivo para visualizar métricas en tiempo real.
- 📦 **Docker & Docker Compose**: Orquestación de servicios para desarrollo y despliegue.

---

## 🧪 Tecnologías Utilizadas

- ESP32 (ESP-IDF, C)
- Mosquitto MQTT Broker (TLS mutuo)
- Node.js + Express + MQTT.js
- MongoDB + Mongoose
- React + Vite + MaterializeCSS
- Docker + Docker Compose
- GCP (Google Cloud Platform)

---

## 🗂️ Estructura del Repositorio

```
├── backend/ # Backend Node.js (API, MQTT, MongoDB) 
├── frontend/ # Frontend React (dashboard web) 
├── hardware/ # Firmware para ESP32 
├── docker/ # Certificados TLS y configuración de Mosquitto 
├── docker-compose.yml # Orquestación de servicios 
└── README.md # Documentación del proyecto
```

---

## 🚀 Instrucciones de Despliegue

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/proyecto-iot-calidad-aire.git
   cd proyecto-iot-calidad-aire

2. **Generar certificados TLS**

cd docker/mosquitto
./generate_certs.sh <192.XXX.X.XXX>

3. **Levantar los servicios**

docker compose up --build

4. Acceder al dashboard

 http://localhost:5173

🧪 **Simulación de Sensores**

Para fines de desarrollo, el ESP32 genera datos simulados cada 30 segundos utilizando el protocolo MQTT con TLS. En el firmware se pueden ajustar los rangos de temperatura y presión.

🔐 **Seguridad**
- Certificados TLS autofirmados
- Autenticación mutua cliente-servidor (ESP32 ↔ Mosquitto)
- Variables de entorno ocultas vía .env
- Consideraciones futuras: JWT y control de accesos

📊 **Visualización de Datos**
- Última lectura por sensor
- Gráficos de evolución (temperatura y presión)
- Tabs por cada nodo sensor
- Dashboard responsivo, accesible desde dispositivos móviles

🌍 **Despliegue en la Nube**

El sistema está diseñado para ser desplegado en una instancia de Google Cloud Platform (Compute Engine con IP estática), con posibilidad de escalar nodos sensores y habilitar balanceadores de carga si es necesario.

✍️ **Autor**

Rodrigo J. Pinedo Nava
Candidato a Especialista en Internet de las Cosas
📍 Buenos Aires, Argentina
🔗 LinkedIn ([Link al perfil](https://www.linkedin.com/in/rodrigopinedo/))