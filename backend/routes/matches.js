const express = require('express');
const routes = express.Router();


//connect för att kunna hämta databasen
const db = require('../database/database')
const ObjectId = require('mongodb').ObjectId;
//lista över våra matches
routes.route('/matches').get(function (req, response) {
    let connectDB = db.getDb('Hamsters');
    connectDB.collection('matches')
        .find({})
        .toArray(function (err, result) {

            if (err) {
                response.status(404).json('opp cant find hamsters')
            }
            response.status(200).json(result)
        })
})

//GET match from ID
routes.route("/matches/:id").get(function (req, res) {
    console.log(req.params);
    let _id = req.params.id;
    console.log(_id);
    db.getDb('Hamsters')
        .collection('matches')
        .findOne({
            _id: ObjectId(_id)
        }, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

//POST new match
routes.route("/matches").post(function (req, res) {
    let newMatch = {
        winner: req.body.winner,
        loser: req.body.loser,
        namewinner: req.body.namewinner,
        nameloser: req.body.nameloser,
        gameswinner: req.body.gameswinner,
        gamesloser: req.body.gamesloser
    };
    db.getDb('Hamsters')
        .collection('matches')
        .insertOne(newMatch, function (err, result) {
            if (err) {
                response.status(400).json('ops something went wrong')
            }
            res.status(200).json(newMatch)
        });
});
//Delete match
routes.route('/matches/:id').delete(async function (req, res) {
    let db_connect = db.getDb();
    let myquery = {
        _id: ObjectId(req.params.id)
    };
   await db_connect
        .collection('matches')
        .deleteOne(myquery, function (err) {
            if (err) throw err;
            res.status(200);

        })
});
module.exports = routes;