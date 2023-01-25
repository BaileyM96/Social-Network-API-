const express = require('express');
//Create db file with config
const db = require('');
//create routes file
const routes = require('');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Have the database run the server once
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}!`);
    });
});