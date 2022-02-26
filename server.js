const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./Develop/db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.static(path.join('public')));

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note)
    
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({notes: notesArray }, null, 1)
    );

    return body;

};

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;

}

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('Your note is not formatted correctly, please fix.');
    } else {
        const note = createNewNote(req.body, notes)
        res.json(note);
    }
})

app.get('/', (req,res) => {
    res,sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.listen(PORT, () => {
    console.log(`Server now on port ${PORT}!`);
});