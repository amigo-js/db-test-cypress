# Base imgae taken from https://github.com/cypress-io/cypress-docker-images
FROM node:latest

WORKDIR /db-tests

COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress
# Let's copy the essential files that we must use to run our scripts

# Установка PostgreSQL и создание пользователя
RUN apt-get update \
    # && apt-get install -y postgresql \
    # && service postgresql start \
    # && su postgres -c "psql -c \"CREATE USER testuser WITH PASSWORD 'password';\""
    && apt-get install -y postgresql-client

RUN npm ci --quiet

COPY . .

CMD ["npm", "run", "start"]


