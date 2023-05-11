# Base imgae taken from https://github.com/cypress-io/cypress-docker-images
FROM node:latest

# Установка PostgreSQL и создание пользователя
RUN apt-get update \
    && apt-get install -y postgresql \
    && service postgresql start \
    && su postgres -c "psql -c \"CREATE USER testuser WITH PASSWORD 'password';\""

WORKDIR /db-tests

COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress
# Let's copy the essential files that we must use to run our scripts
RUN npm ci --quiet

COPY . .

CMD ["npm", "run", "start"]


