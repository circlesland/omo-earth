FROM node:latest

ARG PROXY_PROTOCOL
ARG PROXY_EXTERN_DOMAIN
ARG PROXY_EXTERN_PORT

COPY ./public ./public
COPY ./src ./src

COPY ./package.json ./package.json
COPY ./postcss.config.js ./postcss.config.js
COPY ./rollup.config.js ./rollup.config.js
COPY ./tailwind.config.js ./tailwind.config.js
COPY ./tsconfig.json ./tsconfig.json

RUN printf "PROXY_PROTOCOL=${PROXY_PROTOCOL}\n" > ./.env
RUN printf "PROXY_EXTERN_DOMAIN=${PROXY_EXTERN_DOMAIN}\n" >> ./.env
RUN printf "PROXY_EXTERN_PORT=${PROXY_EXTERN_PORT}\n" >> ./.env
RUN echo "$(cat ./.env)"

RUN npm i
RUN npm run build

FROM nginx:latest

COPY ./default.nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=0 ./public /usr/share/nginx/html