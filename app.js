const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

// TEMPLATE ENGINE
// Express'e diyoruz ki view engine olarak ejs kullanıcaz.
app.set("view engine","ejs");

const myLogger1 = (req, res, next) =>
{
    console.log("Middleware Log 1");
    next();
}
const myLogger2 = (req, res, next) =>
{
    console.log("Middleware Log 2");
    next();
}

// MIDDLEWARES
// Request ve Response arasında bulunan herşey middleware'dir.

// Bu middleware static dosyaları yakalar.
// Ancak dinamik bir yapıyı yakalayamayız.
// Bunun için template engine kavramına ihtiyacımız var.
app.use(express.static('public'));
app.use(myLogger1);
app.use(myLogger2);


// ROUTES
app.get('/', (req, res) =>
{
    res.render('index');
});

app.get('/about', (req, res) =>
{
    res.render('about');
});
app.get('/add', (req, res) =>
{
    res.render('add');
});

const port = 3000;
app.listen(port, () =>
{
    console.log(`Sunucu ${port} portunda başlatıldı...`)
});
