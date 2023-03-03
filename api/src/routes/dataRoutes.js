const { Router } = require("express");

const { data } = require("../controllers/dataControlles");

const dataRoutes = Router();

dataRoutes.get("/", async (req, res) => {
  try {
    const dat = await data();
    res.status(200).json(dat);
  } catch (error) {
    console.log(error)
    res.status(400).json( {error} );
  }
});

module.exports = dataRoutes;
