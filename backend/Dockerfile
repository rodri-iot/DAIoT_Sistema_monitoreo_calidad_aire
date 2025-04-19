# Imagen base oficial de Node.js
FROM node:20

# Crear directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que usa tu backend
EXPOSE 3000

# Comando por defecto para iniciar la app
CMD ["npm", "start"]
