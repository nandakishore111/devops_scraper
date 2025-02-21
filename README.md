#  DevOps Scraper

This project is a web scraper built using Puppeteer (Node.js) and a Flask API (Python).  
It scrapes data from a website and serves it via an API, running inside a Docker container.

---

##  Features
 Scrapes web pages using Puppeteer & Chromium  
 Saves extracted data to `scraped_data.json`  
 Exposes a Flask API (`GET /`) to serve the scraped data  
 Dockerized for easy deployment  

---

##  Prerequisites
Before running the project, make sure you have **Docker** installed:  
- [Download Docker](https://www.docker.com/get-started)

To verify Docker installation, run:  

docker --version

---

## Clone the Repository

git clone https://github.com/nandakishore111/devops_scraper.git
cd devops-scraper

---

## Build the Docker Image

docker build --no-cache -t devops-scraper .

---

## Run the Container

docker run -p 5000:5000 devops-scraper

---

## Check the Scraped Data
Open in a browser:
http://127.0.0.1:5000

---

## output:
{
  "title": "Example Domain",
  "heading": "Example Domain"
}














