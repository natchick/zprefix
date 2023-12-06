/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_table').del()
  await knex('user_table').insert([
    {UserId: 1, First_Name:'Adam', Last_Name:'Levin', Username:'al234', Password: 'password'},
    {UserId: 2, First_Name:'Maddy', Last_Name:'Cross', Username:'maddyc', Password: 'woohoo'},
    {UserId: 3, First_Name:'Ken', Last_Name:'Poll', Username:'pollken', Password: 'banana'}
  ]);
};
