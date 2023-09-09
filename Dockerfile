# Use Node.js LTS Alpine as base image
FROM node:18.12.1-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilizes layer caching for dependencies 
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build application
RUN npx nx run angular-ar:build:production

# Move to dist folder containing build output
WORKDIR /dist/apps/angular-ar

# Expose port 4200 for Angular
EXPOSE 4200 

# Copy nginx config 
COPY nginx.conf /etc/nginx/nginx.conf

# Serve app using nginx
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]