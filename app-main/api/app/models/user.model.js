const mongoose = require("mongoose");
module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          
          userId: String,
          join_date: Date

        },
        { timestamps: true }
      )
    );

    return User;
  };

 