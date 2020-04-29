# --- DEPENDENCIES ---
FROM node:14-alpine AS deps

ARG NODE_AUTH_TOKEN

# inject and install dependencies
COPY package.json package-lock.json /app/
COPY .npmrc.ci /app/.npmrc
WORKDIR /app
RUN set -x && npm ci

# --- RUNTIME ---
FROM node:14-alpine

ENV METADATA_SERVICE_URL=
ENV PORT=3001
ENV POSTER_SERVICE_URL=

# inject dependencies
COPY --from=deps /app/node_modules /app/node_modules

# inject service logic
COPY . /app/

# build the application
WORKDIR /app
RUN set -x \
  && npm run typings:generate \
  && npm run build

# inject the startup script
COPY --chown=1000:0 serve.sh /serve.sh
RUN set -x && chmod u+x /serve.sh

# switch to a non-root user
USER 1000

# start the webserver on a dynamic port (as required by Heroku)
CMD "/serve.sh"
