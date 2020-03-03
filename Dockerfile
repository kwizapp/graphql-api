FROM node:13.8-alpine AS builder

# inject and install dependencies
COPY package*.json tsconfig.build.json /app/
WORKDIR /app
RUN set -x && npm ci
RUN set -x && npm run build

COPY . /app/

# -------------------------------

FROM node:13.8-alpine

# switch to a non-root user
USER 1000

COPY . .
COPY --from=builder --chown=1000:0 /app/dist ./dist

CMD ["node", "dist/main.js"]