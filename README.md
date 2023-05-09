# NC News API

Welcome to the NC News API project! This project is a RESTful API built with Node.js and Express, providing data for a Reddit-style news aggregation and discussion board.

## Setting up Environment Variables

In order to connect to the two databases locally, you will need to set up environment variables for each database. Please follow the instructions below to create the necessary environment variables:

- Create a file named `.env.development` in the root of your project directory with the following content:

```
PGDATABASE=nc_news
```

- Save the file
- Repeat the same steps for setting up environment variable `.env.test` for the test database `nc_news_test`.

With these environment variables set up, your local development environment should now be able to connect to the PSQL database.

**Note** that .env.\* files are already added to .gitignore to avoid exposing sensitive data. It is recommended to keep your database credentials in these environment variables instead of hard-coding them in your code or committing them to version control.
