/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item_table').del()
  await knex('item_table').insert([
    {id: 1, Item_Name: 'Carlie Sweater', Description: 'comfy red sweater', Quantity: '2', UserId: 1},
    {id: 2, Item_Name: 'Candle', Description: 'Christmas Candle', Quantity: '5', UserId: 2},
    {id: 3, Item_Name: 'Socks', Description: 'Christmas Socks', Quantity: '10', UserId: 2}
  ]);
};
