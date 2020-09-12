FROM node:latest

COPY ./public ./public
COPY ./src ./src

COPY ./package.json ./package.json
COPY ./postcss.config.js ./postcss.config.js
COPY ./rollup.config.js ./rollup.config.js
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./tsconfig.json ./tsconfig.json

RUN npm i
RUN npm run build

FROM nginx:latest

COPY ./default.nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=0 ./public /usr/share/nginx/html