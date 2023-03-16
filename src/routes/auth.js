const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Comprobar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Comprobar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }

    // Comprobar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }

    // Generar un JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      'mi_secreto',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

module.exports = router;
