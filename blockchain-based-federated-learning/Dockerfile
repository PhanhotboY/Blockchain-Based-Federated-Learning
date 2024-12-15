# Use an official Python runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package.json /app
COPY hardhat.config.cjs /app
COPY .env /app

# Install any needed packages specified in requirements.txt
RUN npm install --legacy-peer-deps

# Make port 80 available to the world outside this container
EXPOSE 8545
 
# Run Hardhat node
CMD ["npx", "hardhat", "node"]