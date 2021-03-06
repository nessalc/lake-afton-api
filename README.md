[![Build Status](https://travis-ci.org/nessalc/lake-afton-api.svg?branch=master)](https://travis-ci.org/nessalc/lake-afton-api)

# Lake Afton API
An endpoint for getting data about Lake Afton Public Observatory
http://api.lakeafton.com

### Contribute

You're gonna need node.js; this was written on v8.11.3. You'll also need Python 3.5+; this was written with v3.7.2.

1. Make a fork
2. Clone to your machine
3. CD into the folder
4. Fill out the .env file (use .env_example as a guideline)
5. run ```npm install```
6. run ```pip install -r requirements.txt```
7. run ```npm start``` or ```nodemon start``` if you have nodemon installed.
8. Write code
9. Upload to your fork
10. Submit a pull request

If you have access to the server you can deploy the code yourself:

1. SSH to the server and log in
2. cd /var/www/lake-afton-api/
3. sudo git pull

The Express server is using PM2 to stay running in the background. Check out the docs for PM2 if you have questions about that.

If you have other any questions, you can reach out at sduncan@lakeafton.com

### Endpoints

* LAPO Specific -- These take no additional parameters, and are specific to use by Lake Afton Public Observatory
    * GET `/` -- returns a basic welcome message
    * GET `/hours` -- returns current hours of operation
    * GET `/events` -- returns summary, description, start/end time and location of events happening in the next 30 days
    * GET `/schedule` -- returns info on the viewing program for the upcoming/current weekend
    * GET `/whatsup_next` -- returns names of objects brighter than magnitude 6 that will be visible the next time LAPO is open.
* Configurable -- These are configurable and accept parameters for use in specific situations and for special events, e.g. star parties and Messier marathons.
    * ***Parameter Notes:***
        * `lat` is latitude in degrees, positive for north, negative for south. DMS format is not accepted--must be in decimal degrees (e.g. 37.6222 rather than 37°37'19.8688")
        * `lon` is longitude in degrees, positive for east, negative for west. DMS format is not accepted--must be in decimal degrees (e.g. -97.6270 rather than -97°37'37.0484")
        * `dt` is a timestamp in a very particular format: YYYY-MM-DDThh:mm:ss±hhmm. YYYY is the year; negative values are acceptable but behavior may not be predictable. MM and DD are the month and day, respectively, and must be entered as two digit values. hh is the hour in a 24-hour format, and must be entered with two digits. mm and ss are minutes and seconds, respectively. Decimals may be added to seconds to increase precision, but output will only be to the whole second. ±hhmm specifies the timezone offset of the timestamp. This must be entered with a sign (+ or -) and four digits: the hours and minutes each as two digits. An alternative is the letter Z, denoting UTC. All parameters are required at this time.
        * `tz` is a timezone in the format of the Olson database for the output of the query. Default is 'America/Chicago'. Currently all formats are allowed, but in the future only canonical names and aliases may be accepted (ability to recognize deprecated names will be removed).
        * Parameters are entered as a standard query string, e.g. `/whatsup/?key1=value1&key2=value2`. Order among different keys is unimportant. If a key is dupicated, only the *last* value associated with a key will be utilized. If a value is inappropriate for the type, it will be ignored and the default will be used. The program does its best to decide what you meant, but typos can still cause unexpected issues.
    * GET `/planets` -- returns planets that are visible right now
        * Valid parameters (defaults):
            * `lat` (37.62218579135644)
            * `lon` (-97.62695789337158)
    * GET `/planets2` -- returns the following information about *all* planets:
        * current right ascension/declination
        * current size (diameter in arcseconds)
        * current magnitude
        * current earth distance (au, km, mi)
        * current sun distance (au, km, mi)
        * current phase
        * current constellation
        * rise time/rise azimuth
        * transit time/transit altitude
        * set time/set azimuth,
        * Valid parameters (defaults):
            * `lat` (37.62218579135644)
            * `lon` (-97.62695789337158)
            * `tz` (America/Chicago)
            * `dt` (now)
    * GET `/sun` -- returns sunrise, sunset, twilight, and dusk information
        * Valid parameters (defaults):
            * `lat` (37.62218579135644)
            * `lon` (-97.62695789337158)
            * `tz` (America/Chicago)
    * GET `/sun2` -- returns the following information about the sun (based on the current date and time):
        * right ascension/declination
        * size (diameter in arcseconds)
        * magnitude
        * earth distance (au, km, mi)
        * next solstice
        * next equinox
        * constellation
        * rise time/rise azimuth
        * transit time/transit altitude
        * set time/set azimuth,
        * Valid parameters (defaults):
            * `lat` (37.62218579135644)
            * `lon` (-97.62695789337158)
            * `tz` (America/Chicago)
            * `dt` (now)
    * GET `/moon` -- returns moonrise, moonset, and phase of the moon
        * Valid parameters (defaults):
            * `lat` (37.62218579135644)
            * `lon` (-97.62695789337158)
            * `tz` (America/Chicago)
    * GET `/moon2` -- returns the following information about the moon (based on the current date and time):
        * right ascension/declination
        * size (diameter in arcseconds)
        * magnitude
        * earth distance (au, km, mi)
        * sun distance (au, km, mi)
        * phase
        * illuminated surface
        * phase name
        * next new moon
        * next first quarter
        * next full moon
        * next last quarter
        * constellation
        * rise time/rise azimuth
        * transit time/transit altitude
        * set time/set azimuth
        * Valid parameters (defaults):
            * `lat` (37.62218579135644)
            * `lon` (-97.62695789337158)
            * `tz` (America/Chicago)
            * `dt` (now)
    * GET `/whatsup` -- return names of objects brighter than magnitude 6 (see [here](objects.md) for list of objects)
        * Valid parameters (defaults):
            * `lat` (37.62218579135644)
            * `lon` (-97.62695789337158)
            * `tz` (America/Chicago)
            * `start` (now)
            * `end` (now)
    * GET `/mars-weather` -- return weather data from the Curiosity rover

***One more note:*** the data provided at these endpoints is probably more than enough to get a hobbyist started, to at least get an object of interest in a finder scope. And while these numbers are at least mostly accurate, don't try to steer Hubble or launch a rocket to Neptune with them.
