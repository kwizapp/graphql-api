FROM node:13.8-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json tsconfig.build.json ./

RUN set -x && npm ci

COPY . .

RUN set -x && npm run build

# -------------------------------

FROM node:13.8-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN set -x && npm ci --only=production

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]