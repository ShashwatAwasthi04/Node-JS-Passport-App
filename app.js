const express =require("express");
const expressLayouts = require('express-ejs-layouts');
const mongoose= require('mongoose');

const app = express();

const db= require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useUnifiedTopology: true,useNewUrlParser : true})
.then(()=> console.log('Mongo DB Connected'))
.catch(err => console.log(err));

app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on Port ${PORT}`));
