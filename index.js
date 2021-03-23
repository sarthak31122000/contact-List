const express = require('express');

const ejs = require('ejs');

const path = require('path');

const port = 3000;

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
    return res.render('home', {
        title: "My contact List",
        contact_list: contactList
    });

});

app.get('/practice', function (req, res) {

    return res.render('practice', {
        title: "let's play with ejs"
    });
});
app.get('/delete-contact/', function (req, res) {
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if (contactIndex != -1) {
        contactList.splice(contactIndex, 1);
    }

    return res.redirect("back");

});
app.post('/create-contact', function (req, res) {
    // const object1 = {
    //     name: req.body.name,
    //     phone: req.body.phone
    // }
    contactList.push(req.body);
    return res.redirect('back');

});
app.listen(port, function (err) {

    if (err) {
        console.log(err);
        return;
    }
    console.log("server is running on port", port);
});