const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=' + process.env.MAPBOX_API_TOKEN + '&limit=1'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Impossible de se connecter au service de localisation !', undefined)
        } else if (body.features.length === 0){
            callback('Erreur : L\'adresse n\'existe pas !', undefined)
        } else {

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode