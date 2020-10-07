FROM node:latest

COPY ./auth ./auth
COPY ./data ./data
COPY ./keyStore ./keyStore

RUN cd keyStore && ./rebuild.sh

# Alias host "omo.local" with "auth" so that the keyStore can reach the auth-container.
# DOESN'T WORK - FCK...
# RUN echo "omo.local auth" > /etc/host.aliases
# RUN sh -c "export HOSTALIASES=/etc/host.aliases"

CMD ["node", "keyStore/server/dist/main.js"]
