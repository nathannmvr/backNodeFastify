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