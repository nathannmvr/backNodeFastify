import initialKnex from "knex";

export const config = {
    client: 'sqlite3',
    connection : {
        filename: './db.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
        directory: './db/migrations'
    }
}

export const knex = initialKnex(config);

export async function get() {
    return { get: 'get' }
}

export async function post() {
    return { post: 'post' }
}

export async function put() {
    return { post: 'put' }
}

export async function delet() {
    return { delete: 'delet' }
}