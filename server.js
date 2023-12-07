const path = require('path');
const express = require('express');
const privateRouter = require('./routes/private-router.js');

const app = express();
const port = 4005;

// files estaticos, dan acceso sin necesidad de ruta
app.use(express.static(path.join(__dirname, 'public')));

//middleware que me logea la url accesidad y el metodo
app.use((req,res, next) =>
{
    console.log(`Route: ${req.url} with method ${req.method}`);
    next();
});

app.use(privateRouter);

app.get('/', (req, res) =>
{
    console.log('Someone accessed to my home page');
    res.status(200).sendFile(path.resolve(__dirname, './public/index.html'));
});

app.get('/login', (req,res) =>
{
    console.log('Someone accessed to my log in page');
    res.status(200).sendFile(path.resolve(__dirname,'./public/log-in.html'))
});

app.get('/contact', (req,res) => 
{
    console.log('Someone accessed my contact page');
    res.status(200).sendFile(path.resolve(__dirname, './public/contact.html'));
});



// si el usuario intenta acceder a cualquier recurso no definido devuelve un 404
app.all('*', (req,res) =>
{
    console.log('Someone tried to acces to not defined resources');
    res.status(404).send('<h1>Resource is not available<h1>')
});

app.listen(port, () =>
{
    console.log(`Server up and listening on http://localhost:${port}`);
});




/*

// middleware que chekea si a la ruta /private se le pasa 'dami' como param query,
// si es asi te da acceso, si no te redirije con un 302 a /
app.use('/private', (req,res,next) =>
{
    if(req.query.param === 'dami')
    {
        next();
    }
    else
    {
        res.status(302).redirect('/');
    }
});

app.get('/private', (req,res) =>
{
    const privatePath = path.join(__dirname, '../views/private.html');
    res.status(200).sendFile(privatePath);
});

*/