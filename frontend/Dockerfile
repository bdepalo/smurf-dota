FROM node:16 AS build
WORKDIR /smurf
COPY . .
RUN npm i && npm run build

FROM nginx
COPY --from=build /smurf/dist /usr/share/nginx/html