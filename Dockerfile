FROM node:latest

RUN echo "No cache"
RUN git clone https://github.com/omoearth/omo-earth.git
RUN cd omo-earth && git checkout dev
RUN cd omo-earth/app && npm i
RUN cd omo-earth/app && npm run build

EXPOSE 5000/tcp

CMD cd omo-earth/app && npm run start