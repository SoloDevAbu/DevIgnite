FROM node:20-slim

WORKDIR /app

# Copy the entire monorepo
COPY . ../../

# Install dependencies and build packages
RUN npm install && \
    npm run build && \
    npm install -g typescript ts-node-dev

EXPOSE 9090

CMD ["npm", "run", "dev"]
