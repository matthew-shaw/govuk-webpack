FROM node:jod-alpine

WORKDIR /app

COPY package*.json webpack.config.js ./
COPY src ./src

RUN npm install
RUN npm run build