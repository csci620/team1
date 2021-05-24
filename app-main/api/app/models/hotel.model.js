module.exports = mongoose => {
    const Hotel = mongoose.model(
      "hotel",
      mongoose.Schema(
        {
          userId: String,
          hotelName: String,
          checkIn: String,
          checkOut: String,
          duration: String,
          members: String,
         
        },
        { timestamps: true }
      )
    );

    return Hotel;
  };