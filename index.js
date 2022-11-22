const { response } = require('express');
const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT  || 5000;

const apikey = 'bfc653be5596bf983a3b43b3c79fa0d8';
//const lat = '22.6997';
//const lon = '88.3183';

//const baseurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;

app.use(express.json());

app.get('/',(req, res)=>{
    res.send('Welcome to Open weather API.');
});


//GET weather update by lat and lon
app.get('/location/:lat/:lon',async(req, res)=>{
    
    const {lat} = req.params;
    const {lon} = req.params;

    const response = await request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`);
    res.json(JSON.parse(response));
});



//GET weather update by cityname
app.get('/weather/:cityname',async(req, res)=>{
    
    const {cityname} = req.params;
    //const {localtown} = req.params;

    const response = await request(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${apikey}`);
    res.json(JSON.parse(response));
});


//GET air pollution data by lat and lon
app.get('/airquality/:lat/:lon',async(req, res)=>{
    
    const {lat} = req.params;
    const {lon} = req.params;
    

    const response = await request(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`);
    res.json(JSON.parse(response));
});

//GET location data by country shortname and pin code
app.get('/pincode/:countrynamecode/:zipcode',async(req, res)=>{
    
    const {countrynamecode} = req.params;
    const {zipcode} = req.params;
    

    const response = await request(`https://api.zippopotam.us/${countrynamecode}/${zipcode}`);
    res.json(JSON.parse(response));
});






app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));