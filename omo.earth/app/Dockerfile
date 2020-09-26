FROM node:latest

RUN git clone https://github.com/omoearth/omo-earth.git
RUN git checkout dev

RUN cd omo-earth/app && npm i
RUN cd omo-earth/app && npm run build

FROM nginx:latest

COPY omo-earth/app/default.nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=0 omo-earth/app/public /usr/share/nginx/html