const express = require('express');
const router = express.Router();
const db = require('../mongo/mongo');
const config = require('../config');
const request = require('request-promise');

//Google maps API Key & Host
const api_key = config.googlemaps.key;
const host = config.googlemaps.host;

// Numbers fact api
const numbers_key = config.numbers.key;
const numbers_host = config.numbers.host;

/* Connect to DB. */

db.connect((err, client) => {
    if (err) {
        console.log(`ERR: ${err}`);
    } else {
        console.log(`Connected`);
    }
});

router.get('/', function (req, res, next) {
    console.log(req.body.origin)
    let options = {
        uri: host,
        qs: {
            key: api_key,
            origins: req.body.origin,
            destinations: req.body.dest
        }
    };

    // Connect to the server
    let mongo = db.getDB();
    // check if request is cached in db
    mongo.collection('customers').findOne({orig: options.qs.origins, dest: options.qs.destinations}, {
            fields: {
                _id: 0,
                orig: 0,
                dest: 0
            }
        },
        function (err, tripObject) {
            if (err) {
                console.log(err);
            } else if (tripObject != null) {
                res.send({...tripObject, cached: true});
            } else { // call the api
                request(options)
                    .then(function (response) {
                        let responseObject = JSON.parse(response);
                        console.log(responseObject)
                        let {orig, dest, ...tripObject} = {
                            orig: options.qs.origins,
                            dest: options.qs.destinations,
                            origin: responseObject.origin_addresses[0],
                            destination: responseObject.destination_addresses[0],
                            duration: responseObject.rows[0].elements[0].duration.text,
                            distance: responseObject.rows[0].elements[0].distance.text,
                            fact: ""
                        };

                        let secondApi_options = {
                            headers: {"X-RapidAPI-Key": numbers_key},
                            uri: `${numbers_host}${Math.floor(parseInt(responseObject.rows[0].elements[0].duration.value) / 60)}/year?json=true}`
                        };
                        // call the second api
                        request(secondApi_options)
                            .then(function (response) {
                                response = JSON.parse(response)
                                tripObject.fact = response.text;
                                mongo.collection('customers').insertOne({orig, dest, ...tripObject},
                                    function (err, result) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.send({...tripObject, cached: false});
                                        }
                                    })
                            })
                            .catch(function (err) {
                                console.log("Error: ", err);
                            })
                    })
                    .catch(function (err) {
                        console.log("Error: ", err);
                    });
            }
        })
});

module.exports = router;
