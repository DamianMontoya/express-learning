const path = require('path');
const express = require('express');

const app = express();
const port = 4004;

app.get('/', (req, res) =>
{
    console.log('Someone accessed to my home page');
    res.status(200).send('This is my home page');
});

app.get('/login', (req,res) =>
{
    console.log('Someone accessed to my log in page');
    res.status(200).res.send('Log in page')
});

// si el usuario intenta acceder a cualquier recurso no definido devuelve un 404
app.all('*', (req,res) =>
{
    res.status(404).send('<h1>Resource is not available<h1>')
})

app.listen(port, () =>
{
    console.log(`Server up and listening on http://localhost:${port}`);
});