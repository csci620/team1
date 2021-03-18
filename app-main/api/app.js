var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');



const app = express();


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

const db = require("./app/models");
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

app.use(cors());
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to books application.",  });
});

require("./app/routes/hotels.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
//testing server
app.post('/api/hotels/create', (req,res) => {
res.send("hotel added success");
});
