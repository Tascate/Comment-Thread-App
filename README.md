# Comment Thread App - Bobyard Challenge

Comment thread web application using a React frontend with a Express.js and PostgreSQL backend and database.

## Pre-setup

### Install and start a PostgreSQL database

This requires a PostgreSQL database that Express.js is able to connect to. Setup a PostgreSQL database and edit the .env variables accordingly

### Setup env variables

Create a .env file in the root directory and setup environment variables

```
POSTGRES_USER=my_username
POSTGRES_PASSWORD=my_password
POSTGRES_DATABASE=database_name
CLIENT_URL=localhost
CLIENT_PORT=5432
PORT=3001
VITE_SERVER_URL=http://localhost:3001/
```

## Building

### Install packages for Express.js server and React app

Install packages from root directory and client directory

```
npm install
cd client
npm install
```

## Testing

### Start the server

Run the command in the root directory to start the server.

```
cd root
npm start
```

### Start the React app

Run the start in the client directory to start the React website.

```
cd client
npm run dev
```

Alternatively

```
cd client
npm run build
npm run preview
```

### Open website

Open website url to see the React website. Default is:

```
http://localhost:3001/
```
