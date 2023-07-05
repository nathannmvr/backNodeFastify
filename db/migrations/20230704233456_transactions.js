export async function up(knex) {
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.text('title').notNullable;
        table.decimal('value').notNullable;
        table.string('type');
        table.uuid('user_id');
    }); 
};

export async function down(knex) {
    await knex.schema.dropTable('transactions');
};