//=========== defining schema for adding product =============//


const mongoose = require("mongoose");
const { stringify } = require("querystring");


//============= connecting MongoDB ============//
var prototype3_database = mongoose.createConnection("mongodb://127.0.0.1/Rural_DEvelopment", { useNewUrlParser: true })


var Schemes_collection = prototype3_database.model( "Schemes_collection" , new mongoose.Schema({
    Scheme_Name : String,
    Scheme_Banner : String,
    Scheme_Link : String,
    Scheme_discription: String
  }));


  //======= Exportin Collection Here =======//
  module.exports = { Schemes_collection }