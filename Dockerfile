FROM node:boron

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app

RUN npm run deploy:prod

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000
CMD [ "npm", "start" ]
