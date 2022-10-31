const {
    response
} = require('express');
const express = require('express')
const routes = express.Router()

//connect för att kunna hämta databasen
const db = require('../database/database')
const ObjectId = require('mongodb').ObjectId;


//hämtar alla database
routes.route('/hamsters').get(function (req, response) {
    let connectDB = db.getDb('Hamsters');
    connectDB.collection('hamster')
        .find({})
        .toArray(function (err, result) {

            if (err) {
                response.status(404).json({
                    err: 'connat find any hamsters :('
                })
            }
            response.status(200).json(result)
        })
})


//slump bilder ska göras här 



// hömtar en specifik hamster med hjälp av id 
routes.route('/hamsters/:id').get(function (req, response) {
    let connectDB = db.getDb()
    let myquery = {
        _id: ObjectId(req.params.id)
    }

    connectDB.collection('hamster')
        .findOne(myquery, function (err, result) {
            if (err) {
                response.status(404).json('connat find any hamster :(')
            }
            response.status(200).json(result)
        })
})



//lägger till en ny hamster

routes.route('/hamsters').post(function (req, response) {
    let connectDB = db.getDb();
    let newHamster = {
        
        //idindex?
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood,
        loves: req.body.loves,
        //bilden ska hit
        wins: 0,
        defeats: 0,
        games: 0,
    }
    connectDB
        .collection('hamster')
        .insertOne(newHamster, function (err, res) {
            if (err) {
                response.status(400).json('ops, something is not right!')
            }
            response.status(200).json(newHamster)
        })
})

//uppdaterar vår databas


routes.route('/hamsters/:id').put(function (req, response) {
    let connectDB = db.getDb()
    let myquery = {
        _id: ObjectId(req.params.id)
    };
    let updatedHamster = {
        $set: {
            wins: req.body.wins,
            defeats: req.body.defeats,
            games: req.body.games
        }
    }
    connectDB.collection('hamster')
        .updateOne(myquery, updatedHamster, function (err, result) {
            if (err) {
                response.status(400).json('ops, something is not right!')
            }
            response.sendStatus(200)
        })



})

//raderar en hamster från databasen

routes.route('/hamsters/:id').delete(function (req, response) {
    let connectDB = db.getDb()
    let myquery = {
        _id: ObjectId(req.params.id)
    };
    connectDB.collection('hamster')
        .deleteOne(myquery, function (err) {
            if (err) {
                response.sendStatus(400)
            }

            response.sendStatus(200)
        })
})






module.exports = routes