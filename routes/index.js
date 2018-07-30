var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
	let response = {
		message:'Welcome to the Lake Afton Public Observatory API! To contribute, visit https://github.com/openwichita/lake-afton-api'
	};
	res.json(response);
});

router.get('/hours', function(req, res, next) {
	let currentTime = new Date()
	let month = currentTime.getMonth() + 1
	let day = currentTime.getDate()
	let year = currentTime.getFullYear()
	let response = {
		hours:{
			prettyHours:'',
			open:'',
			close:''
		}
	};
	switch (month) {
		case 3:
		case 4:
			response.hours.prettyHours = '7:30pm - 9:30pm';
			response.hours.open = '7:30pm';
			response.hours.close = '9:30pm';
			break;
		case 5:
		case 6:
		case 7:
		case 8:
			response.hours.prettyHours = '9:00pm - 11:30pm';
			response.hours.open = '9:00pm';
			response.hours.close = '11:30pm';
			break;
		case 9:
		case 10:
			response.hours.prettyHours = '8:30pm - 10:30pm';
			response.hours.open = '8:30pm';
			response.hours.close = '10:30pm';
			break;
		case 11:
		case 12:
		case 1:
		case 2:
			response.hours.prettyHours = '7:30pm - 9:30pm';
			response.hours.open = '7:30pm';
			response.hours.close = '9:30pm';
			break;
	}
	res.json(response);
})

router.get('/planets', function(req, res, next) {
	let lat = 37.62218579135644;
	let lon = -97.62695789337158;
	let url = 'http://www.astropical.space/astrodb/api-ephem.php?lat='+lat+'&lon='+lon;

	fetch(url)
	.then(response => response.json())
	.then(data => {
		// now we have the data
		let planets = data.response

		let visiblePlanets = []

		planets.forEach(function(planet) {
			if (planet.alt > 0) {

				let brightness = ''

				if (planet.mag < -3) {
					brightness = 'extremely bright'
				} else if (planet.mag >= -3 && planet.mag < 0) {
					brightness = 'very bright'
				} else if (planet.mag >= 0 && planet.mag < 1) {
					brightness = 'bright'
				} else if (planet.mag >= 1 && planet.mag < 2) {
					brightness = 'average'
				} else if (planet.mag >= 2 && planet.mag < 6.5) {
					brightness = 'dim'
				} else {
					brightness = 'not visible to naked eye'
				}

				let prettyPlanetStruct = {
					name:planet.name,
					altitudeDegrees:planet.alt,
					distanceFromEarthAU:planet.au_earth,
					magnitude:planet.mag,
					brightness:brightness,
					constellation:planet.const
				}

				visiblePlanets.push(prettyPlanetStruct)
			}
		})

		res.json(visiblePlanets)
	})
	.catch(err => {
		console.log(err)
		res.json(err)
	})

})

module.exports = router;
