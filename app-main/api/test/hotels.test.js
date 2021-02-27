// Note, this requires our server to be running. We will look at how
// to automate this later. For now, it just creates this request object
// to use in our tests.
const request = require("supertest")("http://localhost:3000/api");

// Pull in chai
const expect = require("chai").expect;

// Some sample data to load the API
const test_data = [
  ["Eeee", "California" , "400", "dollar", "25525555", "ritz@gmail.com", "true"],
  ["Ritz2", "Texas" , "450", "dollar", "122122422", "ritz2@gmail.com", "true"],
  ["Ritz3", "Vegas" , "500", "dollar", "788788555", "ritz3@gmail.com", "true"]
  
];

describe("DELETE /hotels", function () {
    it("Deletes all hotels", async function () {
      const response1 = await request.delete("/hotels");
      expect(response1.status).to.eql(200);
      // expect(response.body.data.length).to.eql(30);
      const response2 = await request.get("/hotels");
      expect(response2.status).to.eql(200);
      expect(response2.body.length).to.eql(0);
    });
  });

describe("POST /hotels", function () {

  it("Adds a new hotel", async function () {
    const response = await request
      .post("/hotels")
      .send({ hotelName: test_data[0][0], hotelAddr: test_data[0][1], hotelPricePerDay: test_data[0][2], hotelPriceCurr: test_data[0][3], hotelPhone: test_data[0][4], hotelEmail: test_data[0][5], isBooked: test_data[0][6] });

    expect(response.status).to.eql(200);

   
  })
});


describe("GET /hotels", function () {
    it("returns all hotels", async function () {
      await request.delete("/hotels");

      for (let hotel of test_data) {
        await request
          .post("/hotels")
          .send({
            hotelName: hotel[0],
            hotelAddr: hotel[1],
            hotelPricePerDay: hotel[2],
            hotelPriceCurr: hotel[3],
            hotelPhone: hotel[4],
            hotelEmail: hotel[5],
            isBooked: hotel[6],
          });
      }

      const response = await request.get("/hotels");

      expect(response.status).to.eql(200);
      expect(response.body.length).to.eql(test_data.length);
    });
  });
  
  describe("UPDATE /hotels", function () {
    it("Update a  hotel", async function () {
      let hotelId = null;

      for (let hotel of (await request.get("/hotels")).body) {
        if (hotel.hotelName == "Eeee") {
          hotelId = hotel._id;
          console.log("hotel Name to update => '" + hotel.hotelName + "'");
          break;
        }
      }

      const response = await request
        .put("/hotels/" + hotelId)
        .send({
          hotelName: "Hotel Hilton",
          hotelAddr: "Chico",
          hotelPricePerDay: "500",
          hotelPriceCurr: "$",
          hotelPhone: "522522522",
          hotelEmail: "hilton@gmail.com",
          isBooked: "false",
        });

      expect(response.status).to.eql(200);
      for (let hotel of (await request.get("/hotels")).body) {
        if (hotel._id == hotelId) {
          console.log("hotel Name after update '" + hotel.hotelName + "'");
        }
      }
    });
  });
  