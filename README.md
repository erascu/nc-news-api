# Northcoders News API

Welcome to the **Northcoders News API**! This is a RESTful API designed to simulate a real-world backend service, similar to Reddit. It allows users to interact with articles, topics, and users, and includes full CRUD functionality for managing these resources.

## Hosted Version 🌐
You can access the live API here:  
[Northcoders News API - Live Version](https://nc-news-api-qfui.onrender.com/api)

## Project Overview 📋
This project provides endpoints to interact with the data on topics, articles, and users. It simulates a news platform where users can post articles, vote on them, and comment on topics.

### Key Features:
- User management (create, update, delete)
- CRUD operations for articles
- Vote on articles and comments
- Comment on articles

## 📦 System Requirements

Before running the project, please ensure you have the following installed:

- Node.js (>= 14.x) 🟢
- PostgreSQL 🛠️
- npm 📦


## 🚀 Getting Started

To get the API up and running, follow these steps:

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/erascu/nc-news-api.git
```

### 2. Install Dependencies 🛠️

Navigate to the project directory and install the required dependencies using npm:
```bash
cd nc-news-api
npm install
```

### 3. Set up Environment Variables 🔑

This project uses <b>dotenv</b> to securely manage the database connection. You need to create two environment files for different environments:

- <b>.env.development</b> for your local development environment.
- <b>.env.test</b> for testing purposes.

<b>Steps to set up:</b>
1. <b>Create the files</b> in the root directory of the project.
2. Add the following lines to each file:

- .env.development:
  ```bash
  PGDATABASE=nc_news
  ```

- .env.test:
```bash
PGDATABASE=nc_news_test
```

### 🛡️ Why are .env files gitignored?
For security reasons, the <b>.env</b> files are added to <b>.gitignore</b> to prevent sensitive information (like database credentials) from being uploaded to GitHub or any other public repositories. In a real-world application, you should <b>never</b> share your actual database connection details publicly. The <b>.env</b> files are local to your machine, and by gitignoring them, we ensure your credentials remain private.

### 4. Set up the Database 🛠️
Before seeding the database with initial data, you need to set up the database by creating and dropping the necessary tables. Run the following command to drop and create the tables:
  ```bash
  npm run setup-dbs
  ```

### 5. Seed the Database 🌱
After setting up the database, you'll need to seed it with initial data. Use the following command to seed the database:
  ```bash
  npm run seed
  ```

### 6. Run the Tests ✅
To ensure everything is working correctly, run the tests using:
  ```bash
  npm test
  ```

## Available API Endpoints 🛠️
You can interact with the following endpoints via the hosted version of the API:

- <b>GET /api/topics</b> - Get all topics
- <b>GET /api/articles</b> - Get all articles or filter them (optional query parameters: sort_by, order)
- <b>GET /api/articles/:article_id</b> - Get a single article by ID
- <b>GET /api/users</b> - Get a list of all users
- <b>POST /api/articles</b> - Create a new article
- <b>PATCH /api/articles/:article_id</b> - Update article votes
- <b>DELETE /api/articles/:article_id</b> - Delete an article

## Additional Information 💡
- This project was developed to demonstrate full-stack REST API design using Node.js, Express, and PostgreSQL.
- The project is configured for easy deployment on platforms like <b>Render</b>, and it uses <b>Supabase</b> for database management.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
