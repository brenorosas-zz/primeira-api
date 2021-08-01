const express = require('express');
const localRoutes = express.Router();
const fs = require('fs');

localRoutes.get('/local/ativo', (req, res) => {
    let rawData = fs.readFileSync('./data/db.json');
    let obj = JSON.parse(rawData);
    return res.json(obj.db);
});

localRoutes.get('/local/ativo/:id', (req, res) => {
    let rawData = fs.readFileSync('./data/db.json');
    let obj = JSON.parse(rawData);
    const id = req.params.id;
    let asset = obj.db.filter(x => x.id == id);
    if(!asset[0]){
        return res.status(404).end();
    }
    return res.json(asset);
});

localRoutes.post('/local/ativo', (req, res) => {
    let rawData = fs.readFileSync('./data/db.json');
    let obj = JSON.parse(rawData);
    const name = req.body.name;
    const max = req.body.max;
    const min = req.body.min;
    const identification = obj.identification;
    if(!name || !max || !min)
        return res.status(400).end();
    let asset = { "id": identification, "name": name, "max": max, "min": min }
    try{
        obj.identification += 1;
        obj.db.push(asset);
        obj = JSON.stringify(obj, null, 4);
        fs.writeFileSync('./data/db.json', obj);
        return res.status(201).end();
    } catch{
        return res.status(400).end();
    } 
});

localRoutes.delete('/local/ativo/:id', (req, res) => {
    let rawData = fs.readFileSync('./data/db.json');
    let obj = JSON.parse(rawData);
    let id = req.params.id;
    try{
        obj.db = obj.db.filter(x => x.id != id);
        obj = JSON.stringify(obj, null, 4);
        fs.writeFileSync('./data/db.json', obj);
        return res.status(200).end();
    } catch{
        return res.status(400).end();
    }
});

localRoutes.put('/local/ativo/:id', async (req, res) => {
    let rawData = fs.readFileSync('./data/db.json');
    let obj = JSON.parse(rawData);
    let id = req.params.id;
    let min = req.body.min;
    let max = req.body.max;
    if(!min || !max)
        return res.status(400).end();
    try{
        obj.db.map(x => {
            if(x.id == id){
                x.min = min;
                x.max = max;
                return x;
            }
        })
        obj = JSON.stringify(obj, null, 4);
        fs.writeFileSync('./data/db.json', obj);
        return res.status(200).end();
    } catch{
        return res.status(400).end();
    }
});

module.exports = localRoutes;