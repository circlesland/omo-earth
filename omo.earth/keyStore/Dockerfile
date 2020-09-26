FROM node:latest

RUN git clone https://github.com/omoearth/omo-earth.git
RUN cd omo-earth && git checkout dev

RUN cd omo-earth/keyStore && ./rebuild.sh

CMD ["node", "omo-earth/keyStore/server/dist/main.js"]
