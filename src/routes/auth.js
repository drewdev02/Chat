const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const dotenv = require('dotenv').config();

const router = express.Router();

const keyJWT = process.env.keyJWT 
const expiresJWT = process.env.expiresJWT

router.post('/register', async (req, res) => {
  const { username, correo, password, role } = req.body;

  try {
    // Comprobar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    //Comprobacion si el correo existe
    const existingCorreo = await User.findOne({correo});
    if (existingCorreo){
      return res.status(409).json({message: 'La direccion de Correo ya existe para un Usuario'});
    }

    // Cifrar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const user = new User({ username, correo, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    // Comprobar si el usuario existe
    const email  = await User.findOne({ correo });
    if (!email) {
      return res.status(401).json({ message: 'Direccion de correo o contrasena incorrecto' });
    }


    // Comprobar la contraseña
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Direccion de correo o contraseña incorrectos' });
    }

    // Generar un JWT
    const token = jwt.sign(
      { username: User.username, role: User.role },
      "mi_secreto",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

module.exports = router;
