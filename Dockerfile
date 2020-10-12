FROM node:current-slim
USER root
WORKDIR /usr/src/apiserver
COPY package*.json ./
COPY server.js ./
COPY app ./app
RUN npm install
RUN chgrp -R 0 /usr/src/apiserver && \
    chmod -R g=u /usr/src/apiserver
USER node
EXPOSE 8080
CMD ["node", "server.js"]
