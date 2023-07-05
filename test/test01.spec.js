import { beforeAll, expect, test } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

beforeAll(async () => {
    await app.ready();
})

test('Testar o código de retorno do post', async () => {
    await request(app.server)
        .post('/users')
        .send({
            name: 'teste',
            email: 'email@teste.com'
        }).expect(201);
    //const codigo = 500;
    //expect(codigo).toEqual(200);
})

test('Testar o código de retorno do get', async () => {
    await request(app.server)
        .get('/users')
        .expect(200);
})

test('Testar o código de retorno do post transactions', async () => {
    await request(app.server)
        .post('/users')
        .send({
            name: 'teste',
            email: 'email@teste.com'
        })
    const user_id = await request(app.server)
        .get('/users')
    await request(app.server)
        .post('/')
        .send({
            title: 'teste',
            value: 100,
            type: 'credit',
            user_id: user_id.body[0].id 
        }).expect(201);
})

test('Testar o código de retorno do get transactions', async () => {
    await request(app.server)
        .get('/')
        .expect(200);
})