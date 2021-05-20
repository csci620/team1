module.exports = mongoose => {
    const Hotel = mongoose.model(
      "hotel",
      mongoose.Schema(
        {
          userId: String,
          hotelName: String,
          hotelAddr: String,
          hotelPricePerDay: String,
          hotelPriceCurr: String,
          hotelPhone: Number,
          hotelEmail: String,
          isBooked: Boolean
        },
        { timestamps: true }
      )
    );

    return Hotel;
  };