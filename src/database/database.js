const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:3001/loginChat"
// Conexión a la base de datos
const mongoConnection = () => mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
module.exports = { mongoConnection, PORT };