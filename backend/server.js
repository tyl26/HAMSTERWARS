const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config({
    path: "./config.env"
})
const port = process.env.PORT || 1997;

app.use(cors());
app.use(express.json())
app.use(require('./routes/hamsters'))

const db = require('./database/database')


app.listen(port, () => {
    db.connectToServer(function (err) {
        if (err) {
            console.log(err);
        }
    })
    console.log('listening to port', port);
})