const express = require('express');
const routes = express.Router();

routes.get('/getComponents',(req,res) =>{
    const fs = require('fs');
    let files = fs.readdirSync("../frontend/src/Components/ToRenderComponents");

    res.json(files)
})

routes.get('/teste',(req,res)=>{
    res.send('It Works!');
})

module.exports = routes;