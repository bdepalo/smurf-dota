FROM node:16
WORKDIR /usr/src
COPY . .
RUN npm install

EXPOSE 30322

ENTRYPOINT ["npm","run","dev"]