const dotenv = require('dotenv');
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
        silent: true
    });
}

//habilitar index
app.use(express.static(path.resolve(__dirname, '../public'))); //agrega el archivo index.html ubicado en la carpeta public
app.use(require('./routes/index')); //añade las rutas a utilizar
mongoose.connect(process.env.MONGO_URI_DEV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {
    try {
        if (err) {
            console.log('No se puede conectar a la BBDD');
            throw err;
        } else {
            console.log('Conexión  establecida con la BBDD .');
        }
    } catch (error) {
        console.log(error)
    }
});

app.listen(process.env.PORT, () => console.log(`Bienvenido a Grabame REST Server -> http://localhost:${process.env.PORT}!`));
// The error handler must be before any other error middleware and after all controllers
