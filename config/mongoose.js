const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contact_list_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error on connecting to db'));


db.once('open', function () {
    // we're connected!
    console.log("we are connected");
});