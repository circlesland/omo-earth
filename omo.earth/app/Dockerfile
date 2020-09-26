FROM node:latest

ARG PROXY_PROTOCOL
ARG PROXY_EXTERN_DOMAIN
ARG PROXY_EXTERN_PORT

RUN git clone https://github.com/omoearth/omo-earth.git
RUN cd omo-earth && git checkout dev

RUN printf "PROXY_PROTOCOL=${PROXY_PROTOCOL}\n" > omo-earth/app/.env
RUN printf "PROXY_EXTERN_DOMAIN=${PROXY_EXTERN_DOMAIN}\n" >> omo-earth/app/.env
RUN printf "PROXY_EXTERN_PORT=${PROXY_EXTERN_PORT}\n" >> omo-earth/app/.env
RUN echo "$(cat omo-earth/app/.env)"

RUN cd omo-earth/app && npm i
RUN cd omo-earth/app && npm run build

FROM nginx:latest

COPY --from=0 omo-earth/app/default.nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=0 omo-earth/app/public /usr/share/nginx/html