FROM cypress/included:8.6.0

WORKDIR /app

COPY . .

CMD ["npm", "run", "test"]
