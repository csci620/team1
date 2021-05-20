const db = require("../models");
const User = db.users;

exports.create = (req, res) => {
  // Validate request
 
  const users = new User({

    userId: req.user.sub,
    join_date: new Date()
    
  });

  let authToken = req.user.sub;
  User.findOne({  "userId": authToken }, function (err, count) {
    console.log(" user count => " + count);
    if (count === null || count == 0) {
     
      console.log(" creating user in databse...")
      // Create a user in db
      const users = new User({
        userId: authToken,
        join_date: new Date(req.body.join_date),
      });

      // Save User in the database
      users
        .save(users)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User.",
          });
        });
    }  else {
       console.log(" user exists in database ");
    //res.status(400).send({ message: "Content can not be empty!" });
    return;
   }
  });
};

  exports.findAll = (req, res) => {
    const fName = req.query.fName;
    const custAddress = req.query.custAddress;
    var condition = fName ? { fName: { $regex: new RegExp(fName), $options: "i" } } : {};

    User.find({ $or: [{fName: condition}, {custAddress: custAddress}]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Hotel with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

  exports.deleteAll = (req, res) => {
    User.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Users were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Users."
        });
      });
  };

  