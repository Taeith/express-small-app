
const express = require('express');

/* database */
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const User = require('./models/user');

/* routes */
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://taeith:x4Coibyiv4@cluster0.q7xmp.mongodb.net/test?retryWrites=true&w=majority', 
	{
	useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
	console.log("Connexion réussie à la base de données !");
}).catch(() => {
	console.log("La connexion à la base de données pas pas pu être établit.");
});

app.use(bodyParser.json());

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth/', userRoutes);

module.exports = app;