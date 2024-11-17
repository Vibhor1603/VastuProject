# Use a Node image to build the app
FROM node:18-alpine AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vite app (output will go to /app/dist)
RUN npm run build

# Use a new lightweight Node.js image to serve the app
FROM node:18-alpine

# Install the serve package to serve the static files
RUN npm install -g serve

# Copy the built files from the build stage
COPY --from=build /app/dist /app

# Expose port 3000
EXPOSE 3000

# Serve the application
CMD ["serve", "-s", "/app", "-l", "3000"]