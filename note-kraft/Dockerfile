# Base image
FROM node:18.19.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install app dependencies
COPY package.json yarn.lock ./
RUN yarn install --production=true

# Bundle app source
COPY . .

# Build the app
RUN yarn build

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]