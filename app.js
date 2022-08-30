const express = require('express');
const app = express();
const path = require('path');

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

app.use(express.static('public'));
app.use(myLogger1);
app.use(myLogger2);

app.get('/', (req, res) =>
{
    res.sendFile(path.resolve(__dirname,'temp/index.html'));
});


const port = 3000;
app.listen(port, () =>
{
    console.log(`Sunucu ${port} portunda başlatıldı...`)
});
