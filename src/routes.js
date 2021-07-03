const express = require('express');
const routes = express.Router();

let db = [
    {Ativo: 'Ativo1', Max: 20, Min: 40},
    {Ativo: 'Ativo2', Max: 20, Min: 40},
    {Ativo: 'Ativo3', Max: 20, Min: 40}
]

routes.get('/', (req, res) => {
    return res.json(db);
});

routes.post('/add', (req, res) => {
    const body = req.body;
    if(!body)
        return res.status(400).end();
    
    db.push(body);
    return res.json(body);
});

routes.delete('/:ativo', (req, res) => {
    let newDb = [];
    let ativo = req.params.ativo;
    for(let i = 0; i < db.length; i++){
        if(db[i].Ativo != ativo)
            newDb.push(db[i]);
    }
    db = newDb;
    return res.json(db);
});
routes.put('/:ativo/:min/:max', (req, res) => {
    let ativo = req.params.ativo;
    let min = req.params.min;
    let max = req.params.max;
    for(let i = 0; i < db.length; i++){
        if(db[i].Ativo === ativo){
            db[i].Min = min;
            db[i].Max = max;
            break;
        }
    }
    return res.json(db);
});
module.exports = routes;