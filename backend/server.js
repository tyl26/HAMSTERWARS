const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config({
    path: "./config.env"
})
const port = process.env.PORT || 1997;

app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use(require('./routes/hamsters'))
app.use(require('./routes/matches'))

const db = require('./database/database')


app.listen(port, () => {
    db.connectToServer(function (err) {
        if (err) {
            console.log(err);
        }
    })
    console.log('listening to port', port);
})