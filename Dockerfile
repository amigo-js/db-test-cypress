# Base imgae taken from https://github.com/cypress-io/cypress-docker-images
FROM node:latest

WORKDIR /db-tests

COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress
# Let's copy the essential files that we must use to run our scripts

RUN npm ci --quiet

CMD ["npm", "run", "test"]


