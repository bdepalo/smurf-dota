FROM node:14 AS build
WORKDIR /usr/src
COPY . .
RUN npm install && npm run build

FROM nginx
COPY --from=build /usr/src/dist /usr/share/nginx/html