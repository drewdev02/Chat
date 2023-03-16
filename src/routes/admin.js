const express = require('express');
const { authMiddleware } = require('../middleware/middleware.js');
const User = require('../models/User');

const router = express.Router();

router.get('/users', authMiddleware, async (req, res) => {
  try {
    // Comprobar el rol del usuario que ha iniciado sesión
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }

    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
    console.log(error)
  }
});

module.exports = router;
