const express = require('express');
const app = express();
const port = 8085;
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')["development"])

app.use(express.json());

app.use(cors());

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
app.get('/items/users/:id', function(req, res){
    var { id } = req.params;
    knex.from('item_table')
        .join('user_table', 'user_table.UserId', 'item_table.UserId')
        .where('user_table.UserId', id) 
        .then(function(data){
            res.send(data)
        })
})

//post method
app.post('/items', async(req, res) => {
    const maxIdQuery = await knex('item_table').max('id as maxId').first();

    await knex('item_table').insert({
            id: maxIdQuery.maxId + 1,
            Item_Name: req.body.Item_Name,
            Description: req.body.Description,
            Quantity: req.body.Quantity,
            UserId: req.body.UserId
        })
        .then(() => {
            knex('item_table')
            .select('*')
            .then(item => {
                res.json(item);
            })
    });
});
