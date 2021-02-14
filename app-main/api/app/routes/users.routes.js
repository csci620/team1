module.exports = app => {
    const hotels = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Create a new hotels
    router.post("/create", hotels.create);

    // Retrieve all hotels
    router.get("/", hotels.findAll);

    

    // Retrieve a single hotels with id
    router.get("/:id", hotels.findOne);

    // Update a hotels with id
    router.put("/:id", hotels.update);

    // Delete a hotels with id
    router.delete("/:id", hotels.delete);

    // Create a new hotels
    router.delete("/delete", hotels.deleteAll);

    app.use('/api/users', router);
  };