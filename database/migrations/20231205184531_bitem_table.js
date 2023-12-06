/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item_table', table =>{
    table.increments('id');
    table.string('Item_Name');
    table.string('Description');
    table.integer('Quantity');
    table.integer('UserId');
    table.foreign('UserId').references('user_table.UserId');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable ('item_table', table => {
    table.dropForeign('UserId');
    })
    .then(function(){
    return knex.schema.dropTableIfExists('item_table')
}
    )};
