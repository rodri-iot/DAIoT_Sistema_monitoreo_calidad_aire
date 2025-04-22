#!/bin/bash

IP="192.168.0.193"
DAYS=365

CERT_DIR="./certs"
mkdir -p "$CERT_DIR"
cd "$CERT_DIR"

SUBJECT_CA="/C=AR/ST=CABA/L=CABA/O=FIUBA/OU=CA/CN=$IP"
SUBJECT_SERVER="/C=AR/ST=CABA/L=CABA/O=FIUBA/OU=Server/CN=$IP"
SUBJECT_CLIENT="/C=AR/ST=CABA/L=CABA/O=FIUBA/OU=Client/CN=$IP"

echo "🧹 Limpiando certificados anteriores..."
rm -f *.key *.crt *.csr *.srl extfile.cnf

echo "🛠️ Generando CA..."
openssl req -x509 -nodes -sha256 -newkey rsa:2048 \
  -subj "$SUBJECT_CA" -days $DAYS \
  -keyout ca.key -out ca.crt

echo "🔐 Generando certificado del servidor..."
openssl req -nodes -sha256 -new -subj "$SUBJECT_SERVER" \
  -keyout server.key -out server.csr

# ✅ Crear archivo SAN para el servidor
echo "subjectAltName=IP:$IP" > extfile.cnf

openssl x509 -req -sha256 -in server.csr \
  -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out server.crt -days $DAYS \
  -extfile extfile.cnf

echo "👤 Generando certificado del cliente..."
openssl req -nodes -sha256 -new -subj "$SUBJECT_CLIENT" \
  -keyout client.key -out client.csr

# ✅ Crear archivo SAN para el cliente
echo "subjectAltName=IP:$IP" > extfile.cnf

openssl x509 -req -sha256 -in client.csr \
  -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out client.crt -days $DAYS \
  -extfile extfile.cnf

echo "✅ Certificados listos:"
ls -l *.crt *.key

echo "🧹 Limpiando archivos temporales..."
rm -f *.csr *.srl extfile.cnf
