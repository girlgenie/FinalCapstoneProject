const Equipment = require("../models/equipment");

const fetchEquipments = async (req, res) => {
  // find the equipment
  const equipment = await Equipment.find();
  // respond with equipment
  res.json({ equipment: equipment });
};

const fetchEquipment = async (req, res) => {
  // get ID off url
  const equipmentID = req.params.id;
  // find the equipment by ID
  const equipment = await Equipment.findById(equipmentID);
  // respond with equipment
  res.json({ equipment: equipment });
};

const createEquipment = async (req, res) => {
  // get sent in data off request body
  const name = req.body.name;
  const weight = req.body.weight;
  const max_length = req.body.max_length;
  const location = req.body.location;
  // create equipment object
  const equipment = await Equipment.create({
    name,
    weight,
    max_length,
    location,
  });
  // respond with the new equipment
  res.json({ equipment: equipment });
};

const updateEquipment = async (req, res) => {
  // get the id off url
  const equipmentID = req.params.id;
  // get the data off the req body
  const name = req.body.name;
  const weight = req.body.weight;
  const max_length = req.body.max_length;
  const location = req.body.location;

  // find and update the record
  await Equipment.findByIdAndUpdate(equipmentID, {
    name,
    weight,
    max_length,
    location,
  });

  // find updated equipment record
  const equipment = await Equipment.findById(equipmentID);

  // respond with it
  res.json({ equipment: equipment });
};

const deleteEquipment = async (req, res) => {
  // get id off url
  const equipmentID = req.params.id;
  console.log(equipmentID);
  //delete the record
  await Equipment.deleteOne({ _id: equipmentID });
  // respond
  res.json({ equipment: "Record Deleted" });
};

module.exports = {
  fetchEquipments: fetchEquipments,
  fetchEquipment: fetchEquipment,
  createEquipment: createEquipment,
  updateEquipment: updateEquipment,
  deleteEquipment: deleteEquipment,
};
