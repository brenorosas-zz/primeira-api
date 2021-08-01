const connect = require("./db.js");
const express = require('express');
const routes = express.Router();

routes.get('/ativo', async (req, res) => {
    const conn = await connect();
    let db = (await conn.query('SELECT * FROM ativos')).rows;
    return res.json(db);
});

routes.get('/ativo/:id', async (req, res) => {
    const conn = await connect();
    const id = req.params.id;
    let db = (await conn.query(`SELECT * FROM ativos WHERE id = ${id}`)).rows;
    if(!db[0]){
        return res.status(404).end();
    }
    return res.json(db);
});

routes.post('/ativo', async (req, res) => {
    const conn = await connect();
    const name = req.body.name;
    const max = req.body.max;
    const min = req.body.min;
    if(!name || !max || !min)
        return res.status(400).end();
    try{
        await conn.query(`INSERT INTO ativos (name, max, min) VALUES('${name}', ${max}, ${min})`);
        return res.status(201).end();
    } catch{
        return res.status(400).end();
    } 
});

routes.delete('/ativo/:id', async (req, res) => {
    const conn = await connect();
    let id = req.params.id;
    try{
        await conn.query(`DELETE FROM ativos WHERE id = ${id}`)
        return res.status(200).end();
    } catch{
        return res.status(400).end();
    }
});

routes.put('/ativo/:id', async (req, res) => {
    const conn = await connect();
    let id = req.params.id;
    let min = req.body.min;
    let max = req.body.max;
    if(!min || !max)
        return res.status(400).end();
    try{
        await conn.query(`UPDATE ativos SET (max, min) = (${max}, ${min}) WHERE id = ${id}`);
        return res.status(200).end();
    } catch{
        return res.status(400).end();
    }
});

module.exports = routes;