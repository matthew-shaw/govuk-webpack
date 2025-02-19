FROM node:jod-alpine AS builder

WORKDIR /app

COPY package*.json webpack.config.js ./
COPY src ./src

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=builder app/dist /assets/
