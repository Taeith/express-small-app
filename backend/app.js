
const express = require('express');

const mongoose = require('mongoose');
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

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

app.post('/api/stuff', (request, response, next) => {
	console.log(request.body);
	response.status(201).json({
		message: 'L`\'objet à été enregistré',
	});
});

app.use('/api/stuff', (request, response, next) => {
	const stuff = [{
	  _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
  }];
	response.status(200).json(stuff);
});

module.exports = app;