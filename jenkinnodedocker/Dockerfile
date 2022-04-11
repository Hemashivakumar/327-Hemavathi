# it inherit all the properties of node for npm packages
FROM node:15    

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

COPY . ./

EXPOSE 2500
CMD [ "node", "server.js" ]