# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the production application
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy the build artifacts from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
