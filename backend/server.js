const express = require('express')
const app = express()
const cors = require('cors')

//hämntar mina "secrets"
require('dotenv').config({
    path: "./config.env"
})
const port = process.env.PORT || 1997;

app.use(cors({
    origin: '*'
}));

//middlewears
app.use(express.json())
app.use(require('./routes/hamsters'))
app.use(require('./routes/matches'))

const db = require('./database/database')

//serverproduction
if(process.env.NODE_ENV = "production"){
app.use(express.static(path.join('frontend/build')))
app.get("*", (req, res)=> res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html' )))
}


//listnar på min port och connectar till min databas 
app.listen(port, () => {
    db.connectToServer(function (err) {
        if (err) {
            console.log(err);
        }
    })
    console.log('listening to port', port);
})