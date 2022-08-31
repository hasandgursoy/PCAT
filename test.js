const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create schema
const PhotoSchema = new Schema({
    title: String,
    description: String
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Create a photo
// Photo.create({
//     title: "Photo Title 2",
//     description: "Photo description 3 lorem ipsum"
// });

// read a photo 
Photo.find({}, (err, data) =>
{
    console.log(data);
});

// Update a photo

const id = "630f331fd0f731986e59699a";
Photo.findByIdAndUpdate(id,
    {
        title: "Araba Fotosu Ve Uçak",
        description: "Arabalar uçarken kene koşucaksın."
    },
    {
        // Console'da güncellenmiş halini görebilmek için
        new:true
    },
    (err, data) =>
    {
        console.log(data);
    }
);

Photo.find({}, (err, data) =>
{
    console.log(data);
});

// delete a photo
Photo.findByIdAndDelete(id,(err,data)=>{
    console.log('Photo is removed');
});
