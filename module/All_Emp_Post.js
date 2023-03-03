//=========== defining schema for adding product =============//


const mongoose = require("mongoose");
const { stringify } = require("querystring");


//============= connecting MongoDB ============//
var prototype3_database = mongoose.createConnection("mongodb://127.0.0.1/Rural_DEvelopment", { useNewUrlParser: true })


var job_scheme = prototype3_database.model( "All_Employment_Post" , new mongoose.Schema({
    owner_name : String,
    owner_img : String,
    owner_mobile : Number,
    upload_date : String ,
    job_name : String,
    job_Banner : String,
    job_discription : String,
    job_salary: String,
    job_unit: String
  }));


  //======= Exportin Collection Here =======//
  module.exports = { job_scheme }