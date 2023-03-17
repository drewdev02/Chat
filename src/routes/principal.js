const express = require('express');
const router = express.Router();


router.get('/principal', (req, res) => {
    res.render('index', { title: 'Mi página', message: 'Hola, mundo!' });
  });

module.exports = router;