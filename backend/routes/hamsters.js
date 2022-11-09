
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
                response.status(404).json('opp cant find hamsters')
            }
            response.status(200).json(result)
        })
})




// hömtar en specifik hamster med hjälp av id 
routes.route('/hamsters/:id').get(async function (req, response) {
    let connectDB = db.getDb()
    let myquery = {
        _id: ObjectId(req.params.id)
    }

    await connectDB.collection('hamster')
        .findOne(myquery, function (err, result) {
            if (err) {
                response.status(404).send('connat find any hamster with that id :(')
            }
            response.status(200).send(result)
        })
})



//lägger till en ny hamster

routes.route('/hamsters').post(async function (req, response) {
    let connectDB = db.getDb();
    let newHamster = {
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood,
        loves: req.body.loves,
        imgName: req.body.imgName,
        wins: 0,
        defeats: 0,
        games: 0,
    }
    await connectDB
        .collection('hamster')
        .insertOne(newHamster, function (err) {
            if (err) {
                response.status(400).send('ops, something is not right!')
            }
            response.status(200).json(newHamster)
        })
})

//uppdaterar vår databas


routes.route('/hamsters/:id').put( async function (req, response) {
    let connectDB = db.getDb()
    let myquery = {
        _id: ObjectId(req.params.id)
    };

    let updatedHamster = {
        $set: {
            wins: req.body.wins,
            defeats:req.body.defeats,
            games: req.body.games
        }
    }
     await connectDB.collection('hamster')
        .updateOne(myquery, updatedHamster, function (err) {
            if (err) {
                response.status(400).json('ops, something is not right!')
            }
          response.sendStatus(200)
        })
})



//tarbort från databasen
routes.route('/hamsters/:id').delete(async function (req, res) {
    let connectDB = db.getDb();
    let myquery = {
        _id: ObjectId(req.params.id)
    };
    await connectDB
        .collection('hamster')
        .deleteOne(myquery, function (err) {
            if (err) {
                res.status(404).json('ops, cant find hamsters')

            }else{

                res.sendStatus(200);
            }
        })

})


//slump bilder ska göras här för tävlingen

routes.route('/hamster/random').get(function (req, res) {
    let connectDB = db.getDb('Hamsters');
    connectDB.collection('hamster')
        .find({})
        .toArray(function (err, result) {
            //göra kopisa på hamster aaray
            let hamstersarray = [...result];
            //första hamster
            let hamsterOneid = [Math.floor(Math.random() * result.length)]
            //andrahamster
            let randomHamsterOne = hamstersarray[Math.floor(Math.random() * result.length)];
            //tabort hamster i list kopian
            hamstersarray.splice(hamsterOneid, 1)

            //hämtar den andra hamster
            let randomHamstertwo = hamstersarray[Math.floor(Math.random() * result.length)];

            //sätter båda hamster i en varible
            let randomHamsters = [randomHamsterOne, randomHamstertwo]

            if (err) {
                response.status(404).json('ops, cant find hamsters')

            }else{

                res.status(200).json(randomHamsters)
            }
        })
});






module.exports = routes