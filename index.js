const express = require('express');

const ejs = require('ejs');

const path = require('path');

const port = 3000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('assets'));


let contactList = [{
        name: "Arpan",
        phone: "123523746874"
    },
    {
        name: "sarthak",
        phone: "832yr3yr348784"
    },
    {
        name: "hwdhkw",
        phone: "32423432434"
    }
]

app.get('/', function (req, res) {

    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("error in connecting db");
            return;
        }
        return res.render('home', {
            title: "My contact List",
            contact_list: contacts
        });

    })

});

app.get('/practice', function (req, res) {

    return res.render('practice', {
        title: "let's play with ejs"
    });
});
app.get('/delete-contact/', function (req, res) {
    let Id = req.query.id;

    Contact.findByIdAndDelete(Id, function (err) {
        if (err) {
            console.log("error in deletion");
            return;
        }
        return res.redirect('back');
    });

});
app.post('/create-contact', function (req, res) {
    // const object1 = {
    //     name: req.body.name,
    //     phone: req.body.phone
    // }
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log("error");
            return;
        }
        return res.redirect('back');
    });



});
app.listen(port, function (err) {

    if (err) {
        console.log(err);
        return;
    }
    console.log("server is running on port", port);
});