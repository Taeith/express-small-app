
const express = require('express');

const mongoose = require('mongoose');
const Thing = require('./models/thing');

const bodyParser = require('body-parser');

const app = express();

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

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

app.post('/api/stuff', (request, response, next) => {
	delete request.body._id;
	const thing = new Thing({
		...request.body
	});
	thing.save()
		 .then(() => {
		 	response.status(201).json({
				message: 'L`\'objet à été enregistré',
			});
		 })
		 .catch(() => {
		 	response.status(201).json({
		 		error
		 	});
		 });
});

app.get('/api/stuff/:id', (request, response, next) => {
	Thing.findOne({ _id: request.params.id })
		 .then(thing => response.status(200).json(thing))
		 .catch(error => response.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/stuff', (request, response, next) => {
	Thing.find()
		 .then(things => response.status(200).json(things))
		 .catch(error => response.status(400).json({ error }))
});

module.exports = app;