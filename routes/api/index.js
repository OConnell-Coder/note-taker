const { writeFile } = require('fs');
let data = require('../../db/db.json'); //file path wrong? Error in browser.
const router = require('express').Router();

router.get('/notes', (req, res) => res.json(data));

router.post('/notes', ({body}, res) => {
    body.id = Math.floor(Math.random()*1000000).toString(16);

    data.push(body);
    writeFile('../../db/db.json', JSON.stringify(data), err => { //file path wrong? Error in browser.
        if(err) return console.log(err);
        res.json(data)});
});

module.exports = router;