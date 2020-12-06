const { response } = require('express');
const express = require('express');
const fetch = require("node-fetch");
const sequelize = require('../config/sequelize');
const router = express.Router();
const db = require('../config/sequelize');
const File = require('../models/File');
const app = express();
const { QueryTypes } = require('sequelize');

// File.sync({ force : true}); 

const sendJson = (obj, status,res) => {
    res.status(status);
    res.send(obj);
}

const makeParts = (body, parts) => {
    let partsContainer = [];
    let sp = Math.floor(body.byteLength/parts);
    let partLen = Math.floor(body.byteLength/parts);
    // console.log(sp, partLen)
    let prv = 0,temp = [];
    for(let i =0 ;i<parts;i++){
        temp = [];
        for(let j=prv;j<sp;j++){
            temp.push(new DataView(body).getInt8(j));
        }
        partsContainer.push(new Buffer(temp));
        prv = sp;
        sp = partLen + sp;
    }
    temp = [];
    for(let i=prv;i<body.byteLength;i++){
        temp.push(new DataView(body).getInt8(i));
    }
    let last = partsContainer.pop();
    let tm = new Buffer(temp);
    partsContainer.push( Buffer.concat([last,tm]));
    // console.log(partsContainer)
    return partsContainer;
}

const generateKeys = (id, parts) => {
    let keysContainer = []
    let temp = [];
    for(let i=0;i<parts;i++){
        temp = [];
        temp = id.concat(i);
        keysContainer.push(temp);
    }
    // console.log(keysContainer)
    return keysContainer;
}

// routes

router.get('/', async (req,res) => 
    await File.findAll()
        .then(files => {
            console.log(files);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
)


// to initiate download, send a POST request to localhost:5000/download
router.post('/', async (req, res) => {
    try {
        const url = req.body.url;
        const partCount = req.body.parts;
        const [, name, ext] = url.match(/\/([A-Za-z0-9-_.%]+)(\.\w+)$/i);
        // console.log(name, ext, partCount);
        const f = {
            name : name,
            ext : ext,
            partCount : partCount
        }
        const file = await File.create(f);
        await fetch(url, { headers : { 'Accept' : 'application/arraybuffer'}})
        .then(async (response) => {
            // if(response.status == 200){
            //     console.log(response);
            // }
            if(response.status != 200){
                file.status ='failed';
                file.reason = response.error ? 'Wrong URL' : response.error;
                await file.save();
                return;
            }
            return response.arrayBuffer();
        })
        .then(async (data) => {
            file.parts = makeParts(data,partCount);
            // console.log('inside data');
            file.status ='done';
            file.keys = generateKeys(file.id, partCount)
            await file.save();
        })
        .catch(e => console.log('something is wrong', e.message));
        // console.log(file);
        sendJson(file,200,res);
        
    } catch (err) {
        sendJson(err,500,res);
        console.log(err);
    };
});

// route for worker threads to get the partition data
router.post('/:key', async (req, res) => {
    try {
        const uid = req.params.key.slice(0,36);
        const index = parseInt(req.params.key.slice(uid.length)) + 1;
        console.log(uid, index);
        const part = await sequelize.query(`SELECT parts[${index}] from files where id ='${uid}';`);
        console.log(part);
        sendJson(part,200,res);

    } catch (err) {
        sendJson(err,500,res);
        console.error(err.message);
    }
});

module.exports = router;