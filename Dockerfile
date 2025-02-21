# Stage 1: Node.js Scraper
FROM node:18-slim AS scraper  


WORKDIR /app

# Install Chromium (Minimal Required Dependencies)
RUN apt-get update && apt-get install -y chromium chromium-common --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Use system-installed Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Copy dependencies and install
COPY package.json package-lock.json .  
RUN npm install --omit=dev  

# Copy application files
COPY scrape.js server.py .  

# Create an empty JSON file to prevent errors
RUN touch scraped_data.json  

# Run the scraper
RUN node scrape.js || echo '{"error": "Scraper failed"}' > scraped_data.json  

# Stage 2: Python Flask API
FROM python:3.10-slim AS api

WORKDIR /app

# Copy scraped data and API server
COPY --from=scraper /app/scraped_data.json .  
COPY server.py .  

# Install Flask
RUN pip install --no-cache-dir flask  

EXPOSE 5000  

# Start the Flask server
CMD ["python", "server.py"]



