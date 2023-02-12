const { readFromFile, readAndAppend, writeToFile } = require('../fsUtils');
const express = require('express');
const router = express.Router();

// router.get('/notes', (req, res) => res.json(data));

router.get('/', (req, res) =>
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/', (req, res) => {

    noteID = Math.floor(Math.random()*1000000).toString(16);

    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            noteID
        };
    
        readAndAppend(newNote, './db/db.json');
        // res.json(`Note added successfully!`);

        const response = {
          status: 'success',
          body: newNote,
        };

        res.json(response);
        // res.send(res.json(response));

      } else {
        res.json('Error in adding note.');
      }

    // data.push(body);
    // appendFile('../../db/db.json', JSON.stringify(data), err => { //file path wrong? Error in terminal console.
    //     if(err) return console.log(err);
    //     res.json(data)});
});

module.exports = router;