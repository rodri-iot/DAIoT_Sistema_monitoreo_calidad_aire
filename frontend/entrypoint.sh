#!/bin/sh

echo "✅ Sustituyendo variables de entorno en nginx.conf..."
envsubst '$VITE_API_URL' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

echo "🚀 Iniciando NGINX..."
exec nginx -g 'daemon off;'
