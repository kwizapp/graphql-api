# extend basic alpine image
FROM node:14-alpine

ARG NODE_AUTH_TOKEN

# inject and install dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json tsconfig.build.json ./
COPY .npmrc.ci .npmrc
RUN set -x && npm ci

# inject service logic
COPY . .

# build the application
RUN set -x \
  && npm run typings:generate \
  && npm run build

# inject the startup script
COPY --chown=1000:0 serve.sh /serve.sh
RUN set -x && chmod u+x /serve.sh

# switch to a non-root user
USER 1000

# start the webserver on a dynamic port (as required by Heroku)
CMD ["/serve.sh"]
