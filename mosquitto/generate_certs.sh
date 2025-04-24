#!/bin/bash

# =============================
# 📌 CONFIGURACIÓN GENERAL
# =============================

IP="${1:-mqtt}"
DAYS=365
CERT_DIR="./certs"

SUBJECT_CA="/C=AR/ST=CABA/L=CABA/O=FIUBA/OU=CA/CN=$IP"
SUBJECT_SERVER="/C=AR/ST=CABA/L=CABA/O=FIUBA/OU=Server/CN=$IP"
SUBJECT_CLIENT="/C=AR/ST=CABA/L=CABA/O=FIUBA/OU=Client/CN=$IP"

mkdir -p "$CERT_DIR"
cd "$CERT_DIR" || exit 1

echo "🔁 CN utilizado: $IP"
echo "📂 Generando certificados en: $(pwd)"

# =============================
# 🧹 Limpieza
# =============================
echo "🧹 Eliminando certificados previos..."
rm -f *.key *.crt *.csr *.srl

# =============================
# 🔐 Generación de CA
# =============================
echo "🔐 Generando CA..."
openssl req -x509 -nodes -sha256 -newkey rsa:2048 -subj "$SUBJECT_CA" \
  -days $DAYS -keyout ca.key -out ca.crt

# =============================
# 🔐 Certificado del servidor
# =============================
#echo "🔐 Generando certificado del servidor..."
#openssl req -nodes -sha256 -new -subj "$SUBJECT_SERVER" -keyout server.key -out server.csr
#openssl x509 -req -sha256 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
#  -out server.crt -days $DAYS

echo "🔐 Generando certificado del servidor (con SAN)..."
openssl req -nodes -sha256 -new -keyout server.key -out server.csr -config ../server_openssl.cnf
openssl x509 -req -sha256 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out server.crt -days $DAYS -extensions req_ext -extfile ../server_openssl.cnf

# =============================
# 👤 Certificado del cliente (ESP32 o backend)
# =============================
echo "👤 Generando certificado del cliente..."
openssl req -new -nodes -sha256 -subj "$SUBJECT_CLIENT" -keyout client.key -out client.csr
openssl x509 -req -sha256 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out client.crt -days $DAYS

# =============================
# ✅ Resultado
# =============================
echo "✅ Certificados generados:"
ls -lh *.crt *.key

# =============================
# 🧹 Limpieza final
# =============================
rm -f *.csr *.srl
echo "🧹 Archivos temporales eliminados."
