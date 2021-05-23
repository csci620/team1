var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const token = require('jsonwebtoken');


const app = express();



const db = require("./app/models");
const hotelRoute = require("./app/routes/hotels.routes");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


  app.use("/images", express.static(path.join("images")));  
  app.use("/js", express.static(path.join("js"))); 
  app.use("/css", express.static(path.join("css"))); 
  app.use("/fonts", express.static(path.join("fonts")));
  
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://jgsathe.us.auth0.com/.well-known/jwks.json' 
}),
audience: 'https://localhost:3000/dashboard',
issuer: 'https://jgsathe.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);






app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  
  
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', '*');
    return res.status(200).json({}) || res.status(204).json({});
  }
  next();
 
});

var whitelist = [
  'https://csci620-team1-ui.azurewebsites.net/*'
  
]
var corsOptions = {
  origin: function (origin, callback) {
    console.log( "origin-"+origin);
    if (whitelist.indexOf(origin) !== -1) {
      console.log("inside whitelist origin");
      callback(null, true)
    } else {
      callback(new Error(`Origin: ${origin} is not allowed by CORS`))
    }
  }
}
 


app.use(cors(corsOptions));


//app.use('/hotels', hotelRoute );
// simple route


require("./app/routes/hotels.routes")(app);
require("./app/routes/users.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//testing server

