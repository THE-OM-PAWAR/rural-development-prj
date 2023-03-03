 //                        MODULE                           //
//=========== defining schema for adding user =============//

const bcrypt = require("bcryptjs/dist/bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

//============= connecting MongoDB ============//
var prototype3_database = mongoose.createConnection(
  "mongodb://127.0.0.1/Rural_DEvelopment",
  { useNewUrlParser: true }
);
  const users_schema =  new mongoose.Schema({
  user_name: String,
  user_mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  user_passward: {
    type: String,
    required: true,
  },
  user_Sale_Prd:[{
    grain_name : String,
    grain_quantity: Number,
    upload_date : String,
    selling_price : String,
    grain_unit : String,
    intrusted : [{
      intrusted_name : String,
      intrusted_mobile: Number,
      intrusted_img : String
    }]
  }],
  IM_intrusted : [{
    people_mobile :String,
    prds_date : String
  }],
  user_Job_Post:[{
    job_name : String,
    job_discription: String,
    upload_date : String,
    job_salary : String,
    job_unit : String,
    intrusted : [{
      intrusted_name : String,
      intrusted_mobile: Number,
      intrusted_img : String
    }]
  }],
  tokens : [{
    token: {
      type: String,
      required: true,
    },
  }],
  profile_img : String ,
  user_position :String,
})

 //                MIDDLEWARE                   //
//============ generating token ===============//
users_schema.methods.generateAuthToken = async function (){
  try {
      const token = jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN_KEY)
      this.tokens = this.tokens.concat({token : token})
      await this.save();
      console.log("token saved 40")
    return token
  } catch (error) {
    res.send("the error is  =>    " + error) 
    console.log("the error is  =>    " + error) 
  }
}

 //                    MIDDLEWARE                         //
//============ converting passward into hash =============//
users_schema.pre('save' , async function(next){
  if (this.isModified("user_passward")) {
     this.user_passward = await bcrypt.hash(this.user_passward , 10)
    next()
  }
} )


var users = prototype3_database.model("users_information", users_schema);

//======= Exportin Collection Here =======//
module.exports = { users };
