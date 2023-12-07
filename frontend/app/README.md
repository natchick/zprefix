#Getting Started

Welcome to the inventory app.

To begin, cd into the database and run 
$   npm install pg express knex cors

then create a database named "inventory" inside of your postgres image or change the knexfile.js details to connect to your image and database

then run:
$   npx knex migrate:latest
$   npx knex seed:run

this will set up your database tables and seeds in the inventory database

then make sure you are cd'd into database and run:
$   node app.js

this will start your backend server on port 8081

NEXT

cd into the frontend and run
$cd app
$   npm install pg express knex cors react react-router-dom

$ cd src
$   npm install pg express knex cors react react-router-dom

$   npm start

Now your app will run on port 3000

The Home page shows a read only view of the items in the inventory

The Login Page allows you to log in : 
example username: maddyc
example password: woohoo
this will get you a successful login and a link will appear to "My Inventory"
Click the link and it will be editable and able to create your own item

If you don't have an account, go to Create an Account this will add you to the users directory so you can login

