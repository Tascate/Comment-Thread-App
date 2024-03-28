# Comment Thread App - Bobyard Challenge

Comment thread web application using a React frontend with a Express.js and PostgreSQL backend and database.

## Pre-setup

### Install and start a PostgreSQL database

This requires a PostgreSQL database that Express.js is able to connect to. Setup a PostgreSQL database and edit the .env variables accordingly

### Setup env variables

Create a .env file in the root directory and setup environment variables according to the PostgreSQL database

```
POSTGRES_USER=my_username
POSTGRES_PASSWORD=my_password
POSTGRES_DATABASE=user_comments
CLIENT_URL=localhost
CLIENT_PORT=5432
PORT=3001
VITE_SERVER_URL=http://localhost:3001/
```

## Building and Running the Express.js server

### Install packages

Install packages from root directory

```
npm install
```

### Start the Server

Start the server from the root directory

```
npm start
```

## Building and Running the React website

### Install client packages

```
cd client
npm install
```

### Start the Vite dev server

```
npm run dev
```

Alternatively,

```
npm run build
npm run preview
```

### Preview website

Open the website url to see the React website. Default url is:

```
http://localhost:3001/
```
