FROM node:14-alpine


Run mkdir -p /usr/lib/node_modules && chown -R node:node /usr/lib/node_modules
Run mkdir -p /usr/local/lib/node_module && chown -R node:node /usr/local/lib/node_module

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN mkdir -p /home/node/app/storage


WORKDIR /home/node/app

RUN npm install -g typescript
# COPY storage ./
COPY package*.json ./
COPY tsconfig*.json ./
COPY nodemon*.json ./

USER node

RUN npm install



COPY --chown=node:node . .

RUN npm run build

EXPOSE 4000

ENTRYPOINT [ "node", "build/src/app.js" ]