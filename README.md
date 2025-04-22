# DAIoT_Sistema_monitoreo_calidad_aire




Generar certificados
# 🔐 Clave privada del cliente
openssl genrsa -out client.key 2048

# 📄 CSR (Solicitud de certificado para el cliente)
openssl req -new -key client.key -out client.csr -subj "/CN=esp32-client"

# ✅ Firmar con la CA
openssl x509 -req -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt -days 365

# 🧹 Limpiar archivos intermedios
rm client.csr
rm ca.srl