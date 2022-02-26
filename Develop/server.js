const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');

const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join('public')));

// get notes from the db.json file
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note)

    fs.writeFileSync(
        path.join(__dirname, '.Develop/db/db.json'),
        JSON.stringify({notes: notesArray }, null, 2)
    );
    return body;
};