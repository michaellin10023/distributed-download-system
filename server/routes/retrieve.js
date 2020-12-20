const express = require('express');
const router = express.Router();
const db = require('../config/sequelize');
const File = require('../models/File');

const sendJson = (obj, status,res) => {
    res.status(status);
    res.send(obj);
}

router.get('/', async (req,res) => {
    try {
        return sendJson({msg : 'hello'}, 200, res)
    } catch (error) {
        console.log(error)
    }
})


router.post('/status', async (req,res) => {
    // console.log(req.body)
    if(!req.body.id){
        return sendJson({type : 'error', reason : 'no id key'},404,res)
    }
    await File.findByPk(req.body.id)
        .then(file => {
            // console.log(file);
            sendJson(file,200,res)
        })
        .catch(err => sendJson(err,500,res))
})


router.post('/', async (req,res) => {
    if(!req.body.id && !req.body.index){
        return sendJson({type: 'error', reason: 'no id key or index'},404,res)
    }
    await File.findByPk(req.body.id)
        .then(file => {
            if(Object.keys(file).length === 0){
                sendJson({type: 'error', reason: 'invalid id'},404,res)
            }
            console.log(file)
            res.send(file.parts[req.body.index])
        })
        .catch(err => sendJson(err,500,res))
})


module.exports = router;