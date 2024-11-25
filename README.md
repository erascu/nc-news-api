# Northcoders News API

Welcome to the **Northcoders News API**! This is a RESTful API designed to provide programmatic access to application data, simulating a real-world backend service like Reddit, with features for managing users, articles, and topics.

## 📦 Prerequisites

Before running the project, please ensure you have the following installed:

- Node.js (>= 14.x)
- PostgreSQL
- npm

## 🚀 Getting Started

To get the API up and running, follow these steps:

### 1. Install Dependencies 🛠️

First, install all required dependencies using npm:
npm install

### 2. Set up Environment Variables 🔑

This project uses dotenv to securely manage the database connection. You need to create two environment files for different environments:

.env.development for your local development environment.
.env.test for testing purposes.

Create the files in the root directory of the project and add the following lines to each:
🔹.env.development:
PGDATABASE=nc_news

🔹.env.test:
PGDATABASE=nc_news_test

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
