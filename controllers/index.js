'use strict';

var IndexModel = require('../models/index');

module.exports = function (app) {

  var model = new IndexModel();

  app.get('/', function (req, res) {
    res.render('index', model);
  });

  app.post('/score', function (req, res) {
    if (!req.body.hasOwnProperty('scores')) {
      res.statusCode = 400;
      return res.send('Error 400: Post syntax incorrect.');
    }

    console.log('scores:', req.body.scores);

    res.json(true);
  });

};
