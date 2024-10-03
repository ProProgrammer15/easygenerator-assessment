# Use the official Node.js image as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use the Node.js image to serve the application
FROM node:18

# Set the working directory
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/build ./build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the application using the serve command
CMD ["serve", "-s", "build", "-l", "3000"]
