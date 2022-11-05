FROM node:16 AS build
WORKDIR /smurf
COPY . .
RUN npm i && npm run build

FROM nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /smurf/dist /usr/share/nginx/html