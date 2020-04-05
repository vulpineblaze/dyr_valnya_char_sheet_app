const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4003;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const sheetRoute = require('./sheet.route');
const quirkRoute = require('./quirk.route');
const flawsRoute = require('./flaws.route');
const magickaRoute = require('./magicka.route');
const weaponRoute = require('./weapon.route');
const armorRoute = require('./armor.route');
const horseRoute = require('./horse.route');
const emptyRoute = require('./empty.route');
const specialtyRoute = require('./specialty.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/sheet', sheetRoute);
app.use('/quirk', quirkRoute);
app.use('/flaws', flawsRoute);
app.use('/magicka', magickaRoute);
app.use('/weapon', weaponRoute);
app.use('/armor', armorRoute);
app.use('/horse', horseRoute);
app.use('/empty', emptyRoute);
app.use('/specialty', specialtyRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});