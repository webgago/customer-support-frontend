FROM node:boron

ENV APP /app
# Create app directory
RUN mkdir -p $APP
WORKDIR $APP

# Install app dependencies
COPY package.json $APP
RUN npm install

# Bundle app source
COPY . $APP

RUN npm run deploy
