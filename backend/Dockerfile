# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto 5000
EXPOSE 5000

# Comando para iniciar el backend
CMD ["npm", "start"]
