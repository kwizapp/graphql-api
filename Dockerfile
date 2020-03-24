# extend basic alpine image
FROM node:13.8-alpine

ARG NODE_AUTH_TOKEN

# inject and install dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json tsconfig.build.json .npmrc ./
RUN set -x && npm ci

# inject service logic
COPY . .

# build the application
RUN set -x \
  && npm run typings:generate \
  && npm run build

# switch to a non-root user
USER 1000

# inject the startup script
COPY --chown=1000:0 serve.sh /serve.sh
RUN set -x && chmod u+x /serve.sh

# start the webserver on a dynamic port (as required by Heroku)
CMD ["/serve.sh"]
