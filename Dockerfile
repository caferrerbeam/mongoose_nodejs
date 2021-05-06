FROM node:16-alpine3.11

RUN mkdir /app
COPY . /app

#cambiarse de carpeta y que todos los RUN se ejecuten en esa ubicacion
WORKDIR /app

#construyendo app
RUN npm i

#ejecuto la app..
#CMD define el comando por defecto que ejecutar el contenedor.
CMD node index.js