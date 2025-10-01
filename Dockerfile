# Use Node.js 20 Alpine
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all root folder contents
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port your frontend uses
EXPOSE 3000

# Start the frontend in production
CMD ["npm", "run", "start"]
