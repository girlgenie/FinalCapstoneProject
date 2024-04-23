const mongoose = require('mongoose'); 


// SCHEMA MODEL
const EquipmentSchema = new mongoose.Schema({
    name: String, 
    weight: String, 
    max_length: String, 
    location: String,
  });

//   CREATE THE MODEL USING THE SCHEMA
  const Equipment  = mongoose.model('Equipment', EquipmentSchema);

  module.exports = Equipment; 
