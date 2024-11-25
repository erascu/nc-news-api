# Northcoders News API

Welcome to the **Northcoders News API**! This is a RESTful API designed to provide programmatic access to application data, simulating a real-world backend service like Reddit, with features for managing users, articles, and topics.


## 📦 System Requirements

Before running the project, please ensure you have the following installed:

- Node.js (>= 14.x) 🟢
- PostgreSQL 🛠️
- npm 📦


## 🚀 Getting Started

To get the API up and running, follow these steps:


### 1. Install Dependencies 🛠️

First, install all required dependencies using npm:
```sh
npm install
```

### 2. Set up Environment Variables 🔑

This project uses <b>dotenv</b> to securely manage the database connection. You need to create two environment files for different environments:

🔹 <b>.env.development</b> for your local development environment.\
🔹 <b>.env.test</b> for testing purposes.

<b>Steps to set up:</b>
1. <b>Create the files</b> in the root directory of the project.
2. Add the following lines to each file:

🔹.env.development:
  ```sh
  PGDATABASE=nc_news
  ```

🔹.env.test:
```sh
PGDATABASE=nc_news_test
```

### 🛡️ Why are .env files gitignored?
For security reasons, the <b>.env</b> files are added to <b>.gitignore</b> to prevent sensitive information (like database credentials) from being uploaded to GitHub or any other public repositories. In a real-world application, you should <b>never</b> share your actual database connection details publicly. The <b>.env</b> files are local to your machine, and by gitignoring them, we ensure your credentials remain private.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
