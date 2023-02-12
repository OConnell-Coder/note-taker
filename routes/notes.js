const { readFromFile, readAndAppend, writeToFile } = require('../fsUtils');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) =>
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);


router.post('/', (req, res) => {

    id = Math.floor(Math.random()*1000000).toString(16);

    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id
        };
    
        readAndAppend(newNote, './db/db.json');

        const response = {
          status: 'success',
          body: newNote,
        };

        res.json(response);

      } else {
        res.json('Error in adding note.');
      }

});


router.get('/:id', (req, res) => {
  const requestedID = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === requestedID);
      return result.length > 0
      ? res.json(result)
      : res.json('No note with that ID. 🙁');
    });
});


 router.delete('/:id', (req, res) => {
  const deletingID = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const saveNotes = json.filter((note) => note.id !== deletingID);

      writeToFile('./db/db.json', saveNotes);

      res.json(`Item ${deletingID} has been deleted. 🗑️`);
    });
});


module.exports = router;