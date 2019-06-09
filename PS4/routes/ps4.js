const express = require('express');
const router = express.Router();
const config = require("../config.json");
const request = require('request-promise');

//Google maps API Key & Host
const api_key = config.googlemaps.key;
const host = config.googlemaps.host;

let options = {
    uri: host,
    qs: {
        key: api_key,
        origins: "seattle",
        destinations: "san+francisco"
    }
};
/* GET home page. */
router.get('/', function(req, res, next) {
    request(options)
        .then(function (response) {
            //console.log( responseText );
            let responseObject = JSON.parse( response );
            let renderObject = {origin: responseObject.origin_addresses, destination: responseObject.destination_addresses,
                duration: responseObject.rows[0].elements[0].duration.text, distance: responseObject.rows[0].elements[0].distance.text};
            //let time = responseObject.rows[0].elements[0];

            //console.log(time.duration.text);
            res.render('ps4', renderObject);
        })
        .catch(function (err) {
            console.log( "Error: ", err );
        });
});

module.exports = router;