# backend-project
Api Rest para acortar URL´s

## Getting Started

### Prerequisites

Make sure you have Node.js and the MySQL server installed.

Create database named "shorts_urls" in MySQL.

Add user with structure and data privileges to Mysql server with username "shorturl_u" and password "hmJ9j5TByrjwBlSK".

### Installing libraries

Go to the root folder of the project and run the following line:

```
npm install
```

### Execute migration

Run the following line:

```
node_modules/.bin/sequelize db:migrate
```

## Run project

Run the following line:

```
npm start
```

The app should now be running on localhost:5000.
