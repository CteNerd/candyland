# Stage 1: Build the React application
FROM node:16 AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2: Serve the React application using http-server
FROM node:16-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
COPY server.js ./
RUN npm install express
EXPOSE 80
CMD ["node", "server.js"]