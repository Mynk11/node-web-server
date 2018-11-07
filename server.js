const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partial');
//use this command to embed partial views npm run nodemon -e js,hbs


hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
});

hbs.registerHelper('scream', (TEXT) => {
    return TEXT.toUpperCase()

});

//middleware is used in the order which we call the function so still i can view help .html under maintenance
app.use((req, res, next) => {
    next();//if we don't call next the route didn't work or the application stops on home page
    var now = new Date().toString();
    var log = `${now}:${req.method}:${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("Error :", err);
        }
    });
    console.log(`${now}:${req.method}:${req.url}:`);

});
//middleware
// app.use((req, res) => {
//     res.render('maintenance');
// });
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {

    res.render('home.hbs', {
        name: "Home",
        likes: [
            "Biking",
            "Travelling"
        ],

        developer: "Mayank"
    });

});


app.get("/first", (req, res) => {
    res.render('first.hbs', {
        first: "Game of ***",
        developer: "MG"
    });

});

app.get("/about", (req, res) => {
    res.render('about', {
        first: "Shivi",
        developer: "Gupta"
    });

});
//express by default send js object as json in response
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to handle request"

    });

});
//use npm run nodemon to use nodemon
app.listen(3008, () => {
    console.log("server is listening at 3008");
});