# Use Node.js LTS Alpine as base image
FROM node:lts-alpine 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilizes layer caching for dependencies 
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install -g @nrwl/cli
RUN npm install

# Copy application code
COPY . .

# Build application
RUN nx run angular-ar:build:production

# Move to dist folder containing build output
WORKDIR /app/dist/angular-ar

# Expose port 4200 for Angular
EXPOSE 4200 

# Serve app using nginx
CMD ["nginx", "-g", "daemon off;"]