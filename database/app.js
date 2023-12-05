const express = require('express');
const app = express();
const port = 8085;
const knex = require('knex')(require('./knexfile.js')["development"]);

app.use(express.json());

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