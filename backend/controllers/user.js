
const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (request, response, next) => {
  bcrypt.hash(request.body.password, 10)
    .then(hash => {
      const user = new User({
        email: request.body.email,
        password: hash
      });
      user.save()
        .then(() => response.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => response.status(400).json({ error }));
    })
    .catch(error => response.status(500).json({ error }));
};

exports.login = (request, response, next) => {
  User.findOne({ email: request.body.email })
    .then(user => {
      if (!user) {
        return response.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(request.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return response.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          response.status(200).json({
            userId: user._id,
            token: jsonWebToken.sign({
            	userId: user._id
            },
            'RANDOM_TOKEN_SECRET', {
            	expiresIn: '24h'
            })
          });
        })
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error }));
};