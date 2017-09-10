//====LIST DEPENDENCIES===//

const express = require('express');
const parseurl = require('parseurl');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const Signature = require('./models/signature');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const url = process.env.MONGOLAB_URI;

//=========================//

//====SET APP ENGINE===//

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

//=========================//

//====MONGOOSE PROMISE===//

mongoose.Promise = require('bluebird');

//==========================//

//====MONGOOSE PROMISE===//

mongoose.connect(url, function (err, db) {
 if (err) {
   console.log('Unable to connect to the mongoDB server. Error:', err);
 } else {
   console.log('Connection established to', url);
 }
});

//==========================//

//====GET ALL SIGNATURES===//

app.get('/api/signatures', function(req, res) {
  Signature.find({}).then(function(guest_signatures) {
        console.log(guest_signatures);
        res.render('signatures', {
          guest_signatures: guest_signatures,
        })
      });
    });

//==========================//

//====POST NEW SIGNATURE===//

app.post('/api/signatures', function(req, res) {
  Signature.create({
    guestSignature: req.body.SignatureOfGuest,
  }).then(guest_signatures => {
    res.redirect('/api/signatures')
  });
});

//==========================//

//====APP LISTEN ON ENVIRONMENT PORT===//

app.listen(process.env.PORT || 3000);
console.log('starting applicaiton.  Good job!');

//==========================//


//====EXPORT APP===//

module.exports = app;
