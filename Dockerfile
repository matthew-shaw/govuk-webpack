FROM node:jod-alpine

WORKDIR /web

COPY .browserslistrc babel.config.json package*.json webpack.config.js ./
COPY src src

RUN npm install && \
    npm run build