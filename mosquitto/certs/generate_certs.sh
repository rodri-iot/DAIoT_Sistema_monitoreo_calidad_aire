#!/bin/bash

# 📁 Ruta donde se guardarán los certificados
CERT_DIR="./mosquitto/certs"
mkdir -p "$CERT_DIR"
cd "$CERT_DIR"

# 🔒 Datos del certificado
DAYS_VALID=365
CA_KEY="ca.key"
CA_CERT="ca.crt"
SERVER_KEY="server.key"
SERVER_CSR="server.csr"
SERVER_CERT="server.crt"

echo "🛠️ Generando autoridad certificante (CA)..."
openssl genrsa -out $CA_KEY 2048
openssl req -new -x509 -days $DAYS_VALID -key $CA_KEY -out $CA_CERT -subj "/CN=IoT CA"

echo "🔐 Generando clave privada del servidor..."
openssl genrsa -out $SERVER_KEY 2048

echo "📄 Generando CSR (solicitud de certificado)..."
openssl req -new -key $SERVER_KEY -out $SERVER_CSR -subj "/CN=localhost"

echo "✅ Firmando certificado del servidor con la CA..."
openssl x509 -req -in $SERVER_CSR -CA $CA_CERT -CAkey $CA_KEY -CAcreateserial -out $SERVER_CERT -days $DAYS_VALID

echo "🧹 Limpiando archivos intermedios..."
rm $SERVER_CSR
rm ca.srl

echo "📦 Certificados generados en: $CERT_DIR"
ls -l
