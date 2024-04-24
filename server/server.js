// ENV variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// IMPORT DEPENDENCIES
const express = require("express");
const connectToDb = require("./config/connectToDb");
const equipmentController = require("./controllers/equipmentController");
const cors = require("cors");

// CREATE AN EXPRESS APP
const app = express();

// CONFIGURE EXPRESS APP
app.use(express.json());
app.use(cors()); //allows the server to accept request from any domain

// CONNECT TO DATABASE
connectToDb();

// ROUTING
// RETRIEVING (GET)
app.get("/", (req, res) => {
  res.json({ hello: "world" });
}); //testing

// FETCH ALL DATA (GET)
app.get("/equipment", equipmentController.fetchEquipments);

// FETCH SINGLE PIECE OF EQUIPMENT
app.get("/equipment/:id", equipmentController.fetchEquipment);

// CREATING (POST)
app.post("/equipment", equipmentController.createEquipment);

// UPDATE (PUT)
// this will not send back the updated equipment without finding the updated equipemnt again
app.put("/equipment/:id", equipmentController.updateEquipment);

// DELETE ==========================================================> this is still showing in my mongodb database although it is reflecting as deleted in postman
app.delete("/equipment/:id", equipmentController.deleteEquipment);
// START SERVER
app.listen(process.env.PORT);
