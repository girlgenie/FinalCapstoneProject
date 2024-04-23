// ENV variables 
if (process.env.NODE_ENV != "production") { 
require('dotenv').config(); 
}


// IMPORT DEPENDENCIES 
const express = require('express'); 
const connectToDb = require('./config/connectToDb');
const Equipment = require("./models/equipment")

// CREATE AN EXPRESS APP 
const app = express(); 

// CONFIGURE EXPRESS APP
app.use(express.json()); 

// CONNECT TO DATABASE 
connectToDb(); 

// ROUTING 
// RETRIEVING (GET) 
app.get('/', (req,res)=> { 
   res.json({hello: "world"}) 
})

// FETCH ALL DATA (GET) 
app.get('/equipment', async (req, res)=> { 
    // find the equipment 
const equipment = await Equipment.find(); 
    // respond with equipment
    res.json({equipment:equipment}); 
})

// FETCH SINGLE PIECE OF EQUIPMENT
app.get('/equipment/:id', async (req,res)=> { 
    // get ID off url
    const equipmentID = req.params.id;
    // find the equipment by ID
    const equipment = await Equipment.findById(equipmentID); 
    // respond with equipment
    res.json({equipment: equipment})

})

// CREATING (POST)
app.post('/equipment', async (req, res)=> { 
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
    location})
// respond with the new equipment
res.json({equipment: equipment})
})

// UPDATE (PUT)
// this will not send back the updated equipment without finding the updated equipemnt again 
app.put('/equipment/:id', async (req, res)=> { 
    // get the id off url
    const equipmentID = req.params.id;  
    // get the data off the req body
    const name = req.body.name; 
const weight = req.body.weight; 
const max_length = req.body.max_length; 
const location = req.body.location; 

// find and update the record
await Equipment.findByIdAndUpdate(equipmentID,
    {name, weight, max_length, location}); 
    
    // find updated equipment record
    const equipment= await Equipment.findById(equipmentID)
    
    // respond with it 
    res.json({equipment:equipment});
})

// DELETE
app.delete('/equipment/:id', async (req, res)=> {
    // get id off url 
    const equipmentID = req.params.id; 
    //delete the record
    const equipment = await Equipment.deleteOne({id:equipmentID}); 
    // respond 
    res.json({success: "Record Deleted"})
})
// START SERVER 
app.listen(process.env.PORT); 