FROM node:latest

COPY ./auth ./auth
COPY ./data ./data
COPY ./marketplace ./marketplace

RUN cd marketplace && ./rebuild.sh

# Alias host "omo.local" with "auth" so that the marketplace can reach the auth-container.
# DOESN'T WORK - FCK...
# RUN echo "omo.local auth" > /etc/host.aliases
# RUN sh -c "export HOSTALIASES=/etc/host.aliases"

CMD ["node", "marketplace/server/dist/main.js"]
