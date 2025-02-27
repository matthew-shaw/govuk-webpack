FROM node:jod-alpine AS builder

WORKDIR /app

COPY package*.json webpack.config.js ./
COPY src ./src

RUN npm install && \
    npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /app/static
COPY --from=builder /app/node_modules/govuk-frontend/dist/govuk/assets/images /app/static/assets/images
COPY --from=builder /app/node_modules/govuk-frontend/dist/govuk/assets/manifest.json /app/static/assets