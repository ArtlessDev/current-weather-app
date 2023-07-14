const { log } = require('console');
const express = require('express');
const app = express();
const https = require('https')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function(){
    console.log('server is running')
})

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.post('/', function(req, res){
    console.log(req.body.userChosenCity)
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + req.body.userChosenCity + '&appid=45395fdc02129ef4b42c633e1363af47&units=imperial'

    https.get(url, function(response){
        
        response.on('data', function(data){

            //this line converts the json into legible js
            const weatherData = JSON.parse(data);
            //if we want the reverse ie: js into json then use JSON.stringify(object)
            const temp = weatherData.main.temp;
            console.log(weatherData);
            const city = weatherData.name
            const weatherImg = weatherData.weather[0].icon

            //res.write() <= this adds to what will be part of the res.send
            res.send(`<h1>${city}-Temperature:${temp}</h1><img src="https://openweathermap.org/img/wn/${weatherImg}@2x.png" alt="">`)
        })
        //console.log(response.statusCode);
    })
    //res.send('server running')
})

// app.get('/', function(req, res){

// })