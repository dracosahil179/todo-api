const City = require("../../models/City");

const router = require("express").Router();

// @GET Route
// @DESC Get All the Cities
router.get("/all", async (req, res) => {
  try {
    const cities = await City.find({ deviceID: req.query.deviceID });
    return res.json(cities);
  } catch (error) {
    console.log(error.message);
  }
});

// @POST Route
// @DESC Create City
router.post("/create", async (req, res) => {
  try {
    const { name, deviceID } = req.body;

    let city = new City({ name: name, deviceID: deviceID });

    await city.save();
    return res.json({ statusCode: 200, messasge: "City Saved!" });
  } catch (error) {
    console.log(error.message);
  }
});

// @GDELETE Route
// @DESC Delete City BY ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    return res.json({ statusCode: 200, messasge: "City Deleted!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
