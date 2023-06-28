import fastify from "fastify";
import { knex } from "./database.js";
import { randomUUID } from "node:crypto";

const app = fastify();

app.get('/users', async (req, res) => {
    try{
        const data = await knex('users').select('*');
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send();
    }
})

app.post('/users', async (req,res) => {
    const { name, email } = req.body;
    const id = randomUUID();
    try{
        await knex('users').insert({
            id,
            name,
            email
        });
        return res.status(201).send();
    } catch (error) {
        return res.status(400).send();
    }
})

app.put('/users', async (req, res) => {
    const { id, name, email } = req.body;
    try{
        await knex('users').where('id', id).update({
            name,
            email
        });
        return res.status(200).send();
    } catch (error) {
        return res.status(400).send();
    }
})

app.delete('/users', async (req, res) => {
    const { id } = req.body;
    try{
        await knex('users').where('id', id).del();
        return res.status(200).send();
    } catch (error) {
        return res.status(400).send();
    }
})

app.listen({
    port: 3333
}).then(() => {
    console.log('Server iniciado');
})