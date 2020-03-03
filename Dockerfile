FROM node:13.8-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

# install only development dependencies
RUN npm install --only=development

COPY . .

# build the app to produce a /dist 
# folder that can be run in production
RUN npm run build

FROM node:13.8-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# install only production dependencies
RUN npm install --only=production

COPY . .

# get the /dist folder produced in the previous stage
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]