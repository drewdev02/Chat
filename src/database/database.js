const mongoose = require('mongoose');

const user = process.env.user
const pass = process.env.pass
const namedatabase = process.env.namedatabase
const URL = `mongodb+srv://${user}:${pass}@cluster0.abhqnha.mongodb.net/${namedatabase}`



const dbConnection = async() => {

    try {

        await mongoose.connect( URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });
    
        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}




module.exports = {
    dbConnection
}