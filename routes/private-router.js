const express = require ('express');
const path = require ('path');
const privateRouter = express.Router();


// middleware que chekea si a la ruta /private se le pasa 'dami' como param query,
// si es asi te da acceso, si no te redirije con un 302 a /
privateRouter.use('/private', (req,res,next) =>
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

privateRouter.get('/private', (req,res) =>
{
    const privatePath = path.join(__dirname, '../views/private.html');
    res.status(200).sendFile(privatePath);
});

module.exports = privateRouter;