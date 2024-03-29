const db = require("../models");
const Hotel = db.hotels;
const User = db.users;
exports.create = (req, res) => {
    // Validate request
    

    console.log("REQUEST TOKEN AFTER DECODE => " + JSON.stringify(req.user)); 
    let authToken = req.user.sub;
    console.log("hotel phone => " + authToken);
   // if (User.findOne({  _id: authToken })) {

     

      
      

        console.log("user is a member of this site!")
           // Create a Hotel
    const hotel = new Hotel({

      userId: req.user.sub,
      hotelName: req.body.hotelName,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      duration: (req.body.duration),
      members: ( req.body.members)
      
      
    });
    console.log("HOTEL DATA  => " + JSON.stringify(hotel)); 
    // Save Hotel in the database
    
    hotel
      .save(hotel)
      .then(data => {
        console.log("success....");
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the hotel."
        });
      });

     // } else {
        console.log("user is not a member!")
    //  }
    
   
  };

  exports.findAll = (req, res) => {
   // const hotelName = req.query.hotelName;
    //const hotelAddr = req.query.hotelAddr;
   // console.log("hotelName findall()=> " + hotelName);
    //var condition = hotelName ? { hotelName: { $regex: new RegExp(hotelName), $options: "i" } } : {};

    Hotel.find({userId: req.user.sub})
      .then(data => {
        
        
          res.send(data);
       
       
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Hotel."
        }); 

       
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;

    Hotel.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Hotel with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Hotel with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    Hotel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Hotel with id=${id}. Maybe Hotel was not found!`
          });
        } else res.send({ message: "Hotel was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Hotel with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;

    Hotel.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Hotel with id=${id}. Maybe Hotel was not found!`
          });
        } else {
          res.send({
            message: "Hotel was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Hotel with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    
    Hotel.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Hotels were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all hotels."
        });
      });
  };

  exports.findAllBookedHotels = (req, res) => {
    Hotel.find({ isBooked: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving hotels."
        });
      });
  };