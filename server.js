const express=require('express');
var request = require('request');
const fetch=require('node-fetch')
var cors = require('cors')

const app=express()
const port=process.env.PORT || 3000

app.use(express.static('public'));

const bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd()+"/public/Web-HW8/"));
app.get('*', (req,res) => {
    res.sendFile(process.cwd()+"/public/Web-HW8/")
  });

// const corsOptions={
//     "origin": "*"
// }
// app.use(cors(corsOptions));

app.get('/',function(req,res){
    res.send(__dirname);
});

//enable CORS
var lastWorkingDay=''
var d = new Date();
var pastYear = d.getFullYear() - 2;
d.setFullYear(pastYear);
var dateTwoYearsAgo=d.toISOString().substring(0,10);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://angularhw8app.us-east-1.elasticbeanstalk.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//search result route
app.get('/:stock',function(req,res){
    fetch(`https://api.tiingo.com/tiingo/utilities/search/${req.params.stock}?token=0331e1bdc9fb8f79fad5f2ccb5ee1c33bbda3205`)
    .then(res => res.json())
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.send(err)
    });
});





app.get('/detail/topleft/:stock',function(req,res){ 
    fetch(`https://api.tiingo.com/tiingo/daily/${req.params.stock}?token=0331e1bdc9fb8f79fad5f2ccb5ee1c33bbda3205`)
    .then(res => res.json())
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.send(err)
    })
});

app.get('/detail/topright/:stock',function(req,res){ 
    fetch(`https://api.tiingo.com/iex?tickers=${req.params.stock}&token=0331e1bdc9fb8f79fad5f2ccb5ee1c33bbda3205`)
    .then(res => res.json())
    .then(data =>{
        lastWorkingDay=data[0]['lastSaleTimestamp']
        lastWorkingDay=lastWorkingDay.substring(0,10);
        console.log(lastWorkingDay);
        res.send(data);
    })
    .catch(err=>{
        res.send(err)
    })
});



app.get('/dailyChart/:stock',function(req,res){ 
    fetch(`https://api.tiingo.com/iex/${req.params.stock}/prices?startDate=${lastWorkingDay}&resampleFreq=4min&token=0331e1bdc9fb8f79fad5f2ccb5ee1c33bbda3205`)
    .then(res => res.json())
    .then(data =>{
        console.log(lastWorkingDay,"lwd");
        res.send(data);
    })
    .catch(err=>{
        res.send(err)
    })
});


app.get('/historicalChart/:stock',function(req,res){ 
    fetch(`https://api.tiingo.com/tiingo/daily/${req.params.stock}/prices?startDate=${dateTwoYearsAgo}&token=0331e1bdc9fb8f79fad5f2ccb5ee1c33bbda3205`)
    .then(res => res.json())
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.send(err)
    })
});

app.get('/news/:stock',function(req,res){ 
    fetch(`https://newsapi.org/v2/everything?apiKey=14fb46cfe59b415eba40be2047dadbad&q=${req.params.stock}`)
    .then(res => res.json())
    .then(data =>{
        res.send(data['articles']);
    })
    .catch(err=>{
        res.send(err)
    })
});

app.listen(port, ()=>console.log("listening on port 3000.."));