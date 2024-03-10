# Base image
FROM node:18.16.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the entire directory to the /usr/src/app directory
COPY . .

# Build the TypeScript files
RUN yarn build

# Expose port
EXPOSE 4000

# Start application
CMD ["yarn", "start"]