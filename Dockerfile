# Stage 0, based on Node.js, to build and compile Angular
#Utilizamos una imagen de Node
FROM node:18-alpine as build-step
#Copiamos el código de la aplicación en una carpeta llamada app
RUN mkdir -p /app
WORKDIR /app
#Instalamos las dependencias del archivo package.json
COPY package.json /app
COPY . /app
RUN npm install --force
#Creamos los archivos de producción usando la imagen de Node
RUN npm run build

#Segunda Etapa
#Utilizamos una imagen del servidor de Nginx para crear un servidor y poder desplegar la aplicación en este.
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/dist/spotify /usr/share/nginx/html