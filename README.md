# NC News API

Welcome to the NC News API project! This project is a RESTful API built with Node.js and Express, providing data for a Reddit-style news aggregation and discussion board.

## Link to hosted version

You can find the hosted version of the NC News API
[here](https://nc-news-erky.onrender.com/api)

## Getting started

To get started with the NC News API on your local machine, follow the instructions below.

## Prerequisites

Make sure you have the following software installed:

- Node.js (version 19.8.1 or higher)
- Postgres (version 15.2 or higher)

## Clone the repository

To clone te repository use the following command:

```
git clone https://github.com/andrewmar/news-api.git
```

## Install dependencies

To install the dependencies navigate to the folder

```
cd news-api
```

and use

```
npm install
```

to install all required packages

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

## Seed the Local Database

To seed the local database with sample data, run the following commands:

```
npm run setup-dbs
```

and

```
npm run seed
```

## Running Tests

To run the tests for the NC News API, execute the following command:

```
npm test
```

## API Documentation

For detailed information about the available endpoints and how to use them, please refer to the API documentation. You can find the documentation [here](https://nc-news-erky.onrender.com/api)
