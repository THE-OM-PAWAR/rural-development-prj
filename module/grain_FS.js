//=========== defining schema for adding product =============//


const mongoose = require("mongoose");
const { stringify } = require("querystring");


//============= connecting MongoDB ============//
var prototype3_database = mongoose.createConnection("mongodb://127.0.0.1/Rural_DEvelopment", { useNewUrlParser: true })


var product_scheme = prototype3_database.model( "All_Prd_forSale" , new mongoose.Schema({
    seller_prd_id: String,
    seller_name : String,
    seller_img : String,
    seller_mobile : Number,
    upload_date : String ,
    grain_name : String,
    grain_Banner : String,
    grain_quantity : String,
    grain_cost: String,
    grain_unit: String
  }));


  //======= Exportin Collection Here =======//
  module.exports = { product_scheme }