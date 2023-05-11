
FROM node:14

# Установка PostgreSQL и создание пользователя
RUN apt-get update \
    && apt-get install -y postgresql \
    && service postgresql start \
    && su postgres -c "psql -c \"CREATE USER testuser WITH PASSWORD 'password';\""

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["npm", "run", "start"]


