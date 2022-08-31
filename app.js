const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');

const Photo = require('./models/Photo');

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// TEMPLATE ENGINE
// Express'e diyoruz ki view engine olarak ejs kullanıcaz.
app.set("view engine","ejs");

// const myLogger1 = (req, res, next) =>
// {
//     console.log("Middleware Log 1");
//     next();
// }
// const myLogger2 = (req, res, next) =>
// {
//     console.log("Middleware Log 2");
//     next();
// }

// MIDDLEWARES
// Request ve Response arasında bulunan herşey middleware'dir.

// Bu middleware static dosyaları yakalar.
// Ancak dinamik bir yapıyı yakalayamayız.
// Bunun için template engine kavramına ihtiyacımız var.
app.use(express.static('public'));
// tarayıcı ile gönderdiğimiz bilgileri yakalayabiliyoruz.
app.use(express.urlencoded({extended:true})); // URL deki nesnelere ulaşmamızı sağlar bu şekilde console'a yazdırabiliyoruz.
app.use(express.json());


// app.use(myLogger1);
// app.use(myLogger2);


// ROUTES
app.get('/', async (req, res) =>
{   
    const photos = await Photo.find({});
    res.render('index',{
        // Aşşağıdaki post metodundan buraya göderiyoruz.
        photos
    });
});

app.get('/about', (req, res) =>
{
    res.render('about');
});
app.get('/add', (req, res) =>
{
    res.render('add');
});

app.post('/photos', async (req, res) =>
{
    // console.log(req.body); tarayıcı ile gönderdiğimiz bilgileri yakalayabiliyoruz.
    // res.redirect('/');  tekrar anasayfaya git.

    await Photo.create(req.body)
    res.redirect('/');
});

const port = 3000;
app.listen(port, () =>
{
    console.log(`Sunucu ${port} portunda başlatıldı...`)
});
