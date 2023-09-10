# # Use Node.js LTS Alpine as base image
# FROM node:18.12.1-alpine

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json before other files
# # Utilizes layer caching for dependencies 
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy application code
# COPY . .

# # Build application
# RUN npx nx run angular-ar:build:production

# # Move to dist folder containing build output
# WORKDIR /dist/apps/angular-ar

# # Expose port 4200 for Angula
# EXPOSE 80 

# # Copy nginx config 
# COPY nginx.conf /etc/nginx/nginx.conf

# # Serve app using nginx
# CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

# build environment
FROM node:18.12.1-alpine as builder
RUN mkdir -p /usr/repo 
WORKDIR /usr/repo
ENV PATH /usr/repo/node_modules/.bin:$PATH
# from where the code initially lives to the folder we want to work on

# Clone your GitHub repository into the Docker image
RUN apk update && apk add git  # Install git
RUN git clone https://github.com/DonaldMurillo/angular-ar .  # Replace with your GitHub repository URL

COPY . /usr/repo
RUN npm install
RUN npx nx run angular-ar:build:production

# production environment
FROM nginx:1.24.0-alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./nginx.conf /etc/nginx/conf.d/
COPY --from=builder /usr/repo/dist/apps/angular-ar /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# # build environment
# FROM node:18.12.1-alpine as builder
# # Clone your GitHub repository into the Docker image
# RUN apk update && apk add git  # Install git
# RUN git clone https://github.com/DonaldMurillo/angular-ar  # Replace with your GitHub repository URL

# RUN mkdir -p /usr/repo 
# RUN cp -r /angular-ar/* /usr/repo
# WORKDIR /usr/repo
# ENV PATH /usr/repo/node_modules/.bin:$PATH
# # from where the code initially lives to the folder we want to work on


# RUN npm install
# RUN npx nx run angular-ar:build:production

# # production environment
# FROM nginx:1.24.0-alpine
# RUN rm -rf /etc/nginx/conf.d
# RUN mkdir -p /etc/nginx/conf.d
# COPY ./nginx.conf /etc/nginx/conf.d/
# COPY --from=builder /usr/repo/dist/apps/angular-ar /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]