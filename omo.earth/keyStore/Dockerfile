FROM node:latest

RUN git clone https://github.com/omoearth/omo-earth.git
RUN cd omo-earth && git checkout dev

RUN cd omo-earth/identity && ./rebuild.sh

CMD ["node", "omo-earth/identity/server/dist/main.js"]
