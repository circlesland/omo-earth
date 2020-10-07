FROM node:latest

COPY ./auth ./auth
COPY ./data ./data
COPY ./safe ./safe

RUN cd safe && ./rebuild.sh

# Alias host "omo.local" with "auth" so that the safe can reach the auth-container.
# DOESN'T WORK - FCK...
# RUN echo "omo.local auth" > /etc/host.aliases
# RUN sh -c "export HOSTALIASES=/etc/host.aliases"

CMD ["node", "safe/server/dist/main.js"]
