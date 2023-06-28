export async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.text('name').notNullable;
        table.text('email').notNullable;
    }); 
};

export async function down(knex) {
    await knex.schema.dropTable('users');
};