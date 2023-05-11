FROM cypress/included:8.6.0

WORKDIR /app

COPY . .

WORKDIR /my-cypress-project
# Let's copy the essential files that we must use to run our scripts
COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress
# Install the cypress dependencies in the work directory
RUN npm ci --quiet
# Executable commands the container will use[Exec Form]
CMD ["npm", "run", "test"]
