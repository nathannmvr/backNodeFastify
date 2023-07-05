import fastify from "fastify";
import { knex } from "./database.js";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export const app = fastify();

app.get('/users', async (req, res) => {
    try{
        const data = await knex('users').select('*');
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send();
    }
})

app.post('/users', async (req,res) => {
    const getUserParams = z.object({
        name: z.string(),
        email: z.string().email(),
    });
    const { name, email } = getUserParams.parse(req.body);
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

app.get('/', async (req, res) => {
    try{
        const data = await knex('transactions').select('*');
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send();
    }
})

app.post('/', async (req,res) => {
    const getUserParams = z.object({
        title: z.string(),
        value: z.number(),
        type: z.enum(['credit', 'debit']),
        user_id: z.string().uuid()
    });
    const { title, value, type, user_id } = getUserParams.parse(req.body);
    const id = randomUUID();
    try{
        const userExists = await knex('users').where('id', user_id).select('*');
        if(userExists.length === 0) {
            return res.status(400).send(error);
        }
        await knex('transactions').insert({
            id,
            title,
            value,
            type,
            user_id
        });
        return res.status(201).send();
    } catch (error) {
        return res.status(400).send(error);
    }
})

app.get('/:id' , async (req, res) => {
    const getUserIdParams = z.object({
        id: z.string().uuid()
    });
    const { id } = getUserIdParams.parse(req.params);
    try{
        const data = await knex('transactions').where('user_id', id).select('*');
        return res.status(200).send(data);
    }
    catch (error) {
        return res.status(400).send();
    }
})

app.get ('/summary/:id', async (req, res) => {
    const getUserIdParams = z.object({
        id: z.string().uuid()
    });
    const { id } = getUserIdParams.parse(req.params);
    try{
        const data = await knex('transactions').where('user_id', id).select('*');
        const summary = data.reduce((acc, transaction) => {
            if(transaction.type === 'credit'){
                return acc + transaction.value;
            } else {
                return acc - transaction.value;
            }
        }, 0);
        return res.status(200).send({summary});
    }
    catch (error) {
        return res.status(400).send();
    }
})