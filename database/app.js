const express = require('express');
const app = express();
const port = 8085;
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')["development"])

app.use(express.json());

app.use(cors())

app.listen(port, () => {
    console.log(`Your application is running on port ${port}`);
});

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

//get users
app.get('/users', (req, res) => {
    knex('user_table')
        .select('*')
        .then(items => {
            res.json(items);
        })
})

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


//get users by id
app.get('/users/:id', (req, res) => {
    var { id } = req.params;
    knex.from('user_table')
        .select('*')
        .where('UserId', id)
        .then(users => {
            res.json(users);
        })
})

// get all items that the user has posted
app.get('/items/user/:id', function(req, res){
    var { id } = req.params;
    knex.from('item_table')
        .join('user_table', 'user_table.UserId', 'item_table.UserId')
        .where('user_table.UserId', id) 
        .then(function(data){
            res.send(data)
        })
})

//edit item information 
app.put('/items/:id', function (req, res){
    knex('item_table').where('id', req.params.id)
        .update({
            Item_Name: req.body.Item_Name,
            Description: req.body.Description,
            Quantity: req.body.Quantity,
        })
        .then(() => {
            knex('item_table')
            .select('*')
            .then(item => {
                res.json(item);
            })
        })
})

//post method to add a new item
app.post('/items', async(req, res) => {
    const maxIdQuery = await knex('item_table').max('id as maxId').first();

    await knex('item_table').insert({
            id: maxIdQuery.maxId + 1,
            Item_Name: req.body.Item_Name,
            Description: req.body.Description,
            Quantity: req.body.Quantity,
            // UserId: req.body.UserId
        })
        .then(() => {
            knex('item_table')
            .select('*')
            .then(item => {
                res.json(item);
            })
    });
});

//delete an item
app.delete('/items/:id', async(req, res) => {
    knex('item_table').where('id', req.params.id)
        .del()
        .then(function(){
            knex('item_table')
                .select('*')
                .then(item => {
                    res.json(item);
                })
        })
})
//post to add a user to the database when creating an account
app.post('/users', async(req, res) => {
    const maxIdQuery = await knex('user_table').max('UserId as maxId').first();

    await knex('user_table').insert({
            UserId: maxIdQuery.maxId + 1,
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Username: req.body.Username,
            Password: req.body.Password
        })
        .then(() => {
            knex('user_table')
            .select('*')
            .then(item => {
                res.json(item);
            })
    });
});

//post to check a user against the datbase when logging in
app.get('/users/login', (req, res) => {
    var { Username, Password} = req.params;
    knex.from('user_table')
        .select('*')
        .where('Username', Username)
        .then(user => {
            res.json(user);
        })
})

//get a specific users info
app.get('/users/:id', (req, res) => {
    var { id } = req.params;
    knex.from('user_table')
        .select('*')
        .where('UserId', id)
        .then(users => {
            res.json(users);
        })
})

//get a login page
app.use('login', (req, res) => {
    knex('user_table')
        .select('*')
        .then(items => {
            res.json(items);
        })
})