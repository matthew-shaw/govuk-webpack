FROM node:jod-alpine

WORKDIR /web

COPY .browserslistrc eslint.config.mjs package*.json webpack.config.js ./
COPY src src

RUN npm install && \
    npm run build