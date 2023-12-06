const express = require('express');
const app = express();
const port = 8085;
const knex = require('knex')(require('./knexfile.js')["development"]);
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.listen(port, () => {
    console.log(`Your application is running on port ${port}`);
});


//first get to main page of database to show that the app.listen part works
app.get('/', (req, res) => {
    res.send(`Your application is running`);
});

//second get to /items shows the list of items in the database from the items table
app.get('/items', (req, res) => {
    knex('item_table')
        .select('*')
        .then(items => {
            res.json(items);
        });
});

//third get shows the item by its specific id 
app.get('/items/:id', (req, res) => {
    var { id } = req.params;
    knex('item_table')
        .select('*')
        .where('id', id)
        .then(items => {
            res.json(items);
        });
});

//post request to post a new item
app.post('/items', async(req, res) => {
    const maxIdQuery = await knex('item_table').max('id as maxId').first();

    await knex('item_table').insert({
            id: maxIdQuery.maxId + 1,
            UserId: req.body.UserId,
            Item_Name: req.body.Item_Name,
            Description: req.body.Description,
            Quantity: req.body.Quantity
        })
        .then(() => {
            knex('item_table')
            .select('*')
            .then(item => {
                res.json(item);
            })
        })
});

//delete method
app.delete('/items/:id', (req, res) => {
    knex('item_table')
    .where('id', req.params.id)
    .del()
    .then(function(){
        knex('item_table')
            .select('*')
            .then(items => {
                res.json(items);
            })
    })
})

//update method
app.patch('/items/:id', (req, res) => {
    knex('item_table')
        .where('id', req.params.id)
        .update({
            'Quanitity': req.params.Quanitity
        })
        .then(() => res.json(newItem));
})


//get users
app.get('/users', (req, res) => {
    knex('user_table')
        .select('*')
        .then(users => {
            res.json(users);
        });
});

//get users by id 
app.get('/users/:id', (req, res) => {
    var { id } = req.params;
    knex('user_table')
        .select('*')
        .where('id', id)
        .then(users => {
            res.json(users);
        });
});

//post request to post a new user
app.post('/users', async(req, res) => {
    const maxIdQuery = await knex('user_table').max('id as maxId').first();

    await knex('user_table').insert({
            id: maxIdQuery.maxId + 1,
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Username: req.body.Username,
            Password: req.body.Password
        })
        .then(() => {
            knex('user_table')
            .select('*')
            .then(user=> {
                res.json(user);
            })
        })
});

//delete method
app.delete('/users/:id', (req, res) => {
    knex('user_table')
    .where('id', req.params.id)
    .del()
    .then(function(){
        knex('user_table')
            .select('*')
            .then(users => {
                res.json(users);
            })
    })
})

//update method
app.patch('/users/:id', (req, res) => {
    knex('user_table')
        .where('id', req.params.id)
        .update({
            'Password': req.params.Password
        })
        .then(() => res.json(newPassword));
})
