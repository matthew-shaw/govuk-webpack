FROM node:jod-alpine AS builder

WORKDIR /app

COPY .browserslistrc babel.config.json package*.json webpack.config.js ./
COPY src ./src

RUN npm install && \
    npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /app/static