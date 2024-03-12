//============= Require Module are here ============//

require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
var cookie = require("cookie");
const jwt = require("jsonwebtoken");
const port = 8000;
const authentication = require("./module/authentication");
const home_auth = require("./module/home_auth");
const { users } = require("./module/User_Module");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { Schemes_collection } = require("./module/Scheme.js");
const { product_scheme } = require("./module/grain_FS");
const { job_scheme } = require("./module/All_Emp_Post");
const data_serving = require("./module/user_data _server");
// const { Console } = require("console");


// //============= middleware ============//
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

// //============= Static file  ============//
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

//============= Storage For Image ============//
var storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    console.log(file);
    cb(null , file.originalname);
  },
});


//============= HOME pages are here ============//
app.get("/", home_auth, async (req, res) => {
  try {
    if (req.user) {
      res.sendFile(__dirname + "/public/index3.html");
    } else {
      res.sendFile(__dirname + "/public/index2.html");
    }
  } catch (error) {
    res.sendFile(__dirname + "/public/index2.html");
  }
});


//============= m_data are here ============//

app.get("/m_data", data_serving, (req, res) => {
  let user = req.user
  let position = user.user_position
  console.log(position)
  if ( position === "sarpanch" ) {
    res.status(200).json({position : "sarpanch"});
  } else {
    res.status(200).json({position : "user"});
  }
});

//=============================================//





//============= m_data are here ============//

app.get("/userPage", data_serving, (req, res) => {
  res.sendFile(__dirname + "/public/user_info.html");
});

//=============================================//

//============= m_data are here ============//

app.get("/giveInfo", data_serving, (req, res) => {
  res.status(200).json(req.user);
});

//=============================================//
//============= m_data are here ============//

app.get("/Addprds", (req, res) => {
  res.sendFile(__dirname + "/public/Forms/add_form.html")
});

//=============================================//
app.post("/Addprds",data_serving, (req, res) => {
  console.log(req.body)
  console.log(req.user.user_name, req.user.user_mobile)
  let date =  Date(Date.now()).toString()
  console.log(date)
   req.user.user_Sale_Prd.push({
    grain_name :  req.body.grain_name,
    grain_quantity:  req.body.grain_quantity,
    upload_date : date,
    selling_price : req.body.grain_Cost,
    grain_unit: req.body.grain_unit
  })
  req.user.save()
  // console.log(req.user.user_Sale_Prd)
  let item = req.user.user_Sale_Prd.filter((element)=>{
    if(element.upload_date == date) return element
  })
  // console.log(item[0]._id)

  
  var mydata = new product_scheme({
    // seller_prd_id : item[0]._id,
    seller_name : req.user.user_name,
    seller_img : req.user.profile_img,
    seller_mobile : req.user.user_mobile,
    grain_name: req.body.grain_name,
    upload_date : date,
    grain_quantity: req.body.grain_quantity,
    grain_cost: req.body.grain_Cost,
    grain_unit: req.body.grain_unit
  });
  mydata
    .save()
    .then(() => {
      console.log(mydata + 137)
      res.status(200).sendFile(__dirname + "/public/index3.html");
    })
    .catch(() => {
      res.status(400).send("not saveed");
    });
});

//=============================================//





// //============= m_data are here ============//

app.get("/Addemployment", (req, res) => {
  res.sendFile(__dirname + "/public/Forms/add_Job_form.html")
});

//=============================================//
app.post("/Addemployment",data_serving, (req, res) => {
  console.log(req.body)
  console.log(req.user.user_name, req.user.user_mobile)
  let date =  Date(Date.now()).toString()
   req.user.user_Job_Post.push({
    job_name :  req.body.job_name,
    job_discription:  req.body.job_discription,
    upload_date : date,
    job_salary : req.body.job_salary,
    job_unit: req.body.job_unit
  })
  req.user.save()
  
  let item = req.user.user_Job_Post.filter((element)=>{
    if(element.upload_date == date) return element
  })
  console.log(item[0]._id)

  
  var mydata = new job_scheme({
    owner_name : req.user.user_name,
    owner_img: req.user.profile_img,
    owner_mobile : req.user.user_mobile,
    job_name: req.body.job_name,
    upload_date : date,
    job_discription: req.body.job_discription,
    job_salary: req.body.job_salary,
    job_unit: req.body.job_unit
  });
  mydata
    .save()
    .then(() => {
      console.log("om 188")
      res.status(200).sendFile(__dirname + "/public/index3.html");
      console.log("om 1882")
    })
    .catch(() => {
      res.status(400).send("not saveed");
    });
  // res.sendFile(__dirname + "/public/Forms/add_form.html")
  // res.send("/public/Forms/add_form.html")
});

//=============================================//






const upload = multer({ storage: storage }).single("Scheme_Banners");

//============= Server adding product here ============//

app.get("/AddSchemes", (req, res) => {
  res.sendFile(__dirname + "/public/Forms/SCHEMES.html");
});

app.post("/AddSchemes", upload, (req, res) => {
  console.log(req.body);
  console.log(req.file.filename);
  var mydata = new Schemes_collection({
    Scheme_Name: req.body.Scheme_Name,
    Scheme_Banner: req.file.filename,
    Scheme_Link: req.body.Scheme_Link,
    Scheme_discription: req.body.Scheme_discription,
  });
  mydata
    .save()
    .then(() => {
      console.log(mydata);
      res.status(200).sendFile(__dirname + "/public/Forms/SCHEMES.html");
    })
    .catch(() => {
      res.status(400).send("not saveed");
    });
});

//============= logout pages are here ============//

app.get("/logout", authentication, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((current_obj) => {
      return current_obj.token !== req.token;
    });

    res.clearCookie("jwt_user");
    console.log("logout succesfully283");

    await req.user.save();
    console.log("logout succesfully286");
    res.status(201).json({
      user_name: "modal6",
      method: "get",
      headers: {
        "content-type": "application/json",
      },
      body: {
        modal_html: `
          <div class="modal_wrapper no ">
          <div class="modal_container">
                    <h2 class="modal_h2" >you have succesfully Logout</h2>
                    <p class="text">you have succesfully logout from this device and your account data is securly saved. <br> login for getting your account and Data</p>
                    <div class="action">
                        <a href="/" ><button class="btn_purple">Confirm</button></a>
                    </div>
                </div>
            </div>`,
      },
    });
  } catch (error) {
    res.send(500).send(error);
  }
});

//=============================================//

//============= logoutAll pages are here ============//

app.get("/logoutAll", authentication, async (req, res) => {
  try {
    req.user.tokens = [];

    res.clearCookie("jwt_user");
    console.log("logout succesfully");

    await req.user.save();
    res.status(201).json({
      user_name: "modal6",
      method: "get",
      headers: {
        "content-type": "application/json",
      },
      body: {
        modal_html: `
            <div class="modal_wrapper no ">
                <div class="modal_container">
                <h2 class="modal_h2" >you have succesfully Logout</h2>
                    <p class="text">you have succesfully logout from all devices and your account data is securly saved. <br> login for getting your account and All Data</p>
                    <div class="action">
                        <a href="/" ><button class="btn_purple">Confirm</button></a>
                        </div>
                        </div>
            </div>`,
      },
    });
  } catch (error) {
    res.send(500).send(error);
  }
});

//=============================================//

//============= Server signin user here ============//

app.get("/signIn", async (req, res) => {
  res.sendFile(__dirname + "/public/Forms/SIGN-IN.html");
});

app.post("/signIn",upload ,  async (req, res) => {
  try {
    if (req.body.password == req.body.C_password) {
      var mydata = new users({
        profile_img :  req.file.filename,
        user_name: req.body.username,
        user_mobile: req.body.mobile_No,
        user_passward: req.body.password,
      });
      const token = await mydata.generateAuthToken();
      console.log(token);
      console.log("omp 196");

      res.cookie("jwt_user", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        // secure:true
      });

      await mydata
        .save()
        .then((e) => {
          res.status(200).sendFile(__dirname + "/public/index3.html");
        })
        .catch((error) => {
          res.status(400).send("not saveed 210" + error);
        });
    } else {
      res.status(400).send("invalid details");
    }
  } catch (error) {
    res.status(400).send("not saveed 216" + error);
  }
});

//================================================//

//============= Server login user here ============//

app.get("/logIn", (req, res) => {
  res.sendFile(__dirname + "/public/Forms/LOGIN.html");
});

app.post("/logIn", async (req, res) => {
  try {
    const usrename_mobile_no = parseInt(req.body.user_mobile_No);
    const password = req.body.password;

    const user_info = await users.findOne({ user_mobile: usrename_mobile_no });
    const isMatch = await bcrypt.compare(password, user_info.user_passward);
    //   console.log(241 + await bcrypt.compare(password , user_info.user_passward))

    if (isMatch) {
      const token = await user_info.generateAuthToken();

      res.cookie("jwt_user", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnlysd: true,
        // secure:true
      });

      res.status(201).sendFile(__dirname + "/public/index3.html");
    } else {
      res.send("passward not matching");
    }
  } catch (error) {
    // res.status(400).sendFile(__dirname + "/public/login.html");
    res.send("passward not matching sr");
  }
});

//============= Server Listning here ============//
http.listen(port, () => {
  console.log(`the app is runing at port http://localhost:${port}`);
});





const save_user2 = async(moblile_no , date,intrusted_name , intrusted_mobile,intrusted_img )=>{
    const user_info = await users.findOne({ user_mobile: parseInt(moblile_no) });
    // console.log(user_info)
    user_info.user_Job_Post.forEach(async (element)=>{
      if( element.upload_date.toString() === date){
        for await (let i of element.intrusted){
          if (i.intrusted_mobile === intrusted_mobile) {
            console.log("om 397")
            return
          }
        }
        element.intrusted.push({
          intrusted_name :intrusted_name ,
          intrusted_mobile : intrusted_mobile,
          intrusted_img : intrusted_img
        })
        user_info.save()
        console.log( 406 + "saved sucsessfully")
   }

})
}
const save_user = async(moblile_no , date,intrusted_name , intrusted_mobile,intrusted_img )=>{
    const user_info = await users.findOne({ user_mobile: parseInt(moblile_no) });
    // console.log(user_info)
    user_info.user_Sale_Prd.forEach(async (element)=>{
      if( element.upload_date.toString() === date){
        for await (let i of element.intrusted){
          if (i.intrusted_mobile === intrusted_mobile) {
            console.log("om 397")
            return
          }
        }
        element.intrusted.push({
          intrusted_name :intrusted_name ,
          intrusted_mobile : intrusted_mobile,
          intrusted_img : intrusted_img
        })
        user_info.save()
        console.log( 406 + "saved sucsessfully")
   }

})
}






//==============PRODUCT SHORTING ALGO IS HERE=================//
const Give_Commerce = async (count) => {
  let prd_array = await product_scheme.collection
    .countDocuments()
    .then((value) => {
      // const count = parseInt(value);
      // const random = Math.floor(Math.random() * count);
      const query = {};
      const limit = 7;
      let product_array = product_scheme.find(query).skip(count*7).limit(limit);
      return product_array;
    });  
  return prd_array;  
};  



//==============PRODUCT SHORTING ALGO IS HERE=================//
const Give_job = async (count) => {
  let prd_array = await job_scheme.collection
    .countDocuments()
    .then((value) => {
      // const count = parseInt(value);
      // const random = Math.floor(Math.random() * count);
      const query = {};
      const limit = 7;
      let product_array = job_scheme.find(query).skip(count*7).limit(limit);
      return product_array;
    });  
  return prd_array;  
};  











//==============PRODUCT SHORTING ALGO IS HERE=================//
const Give_Product = async () => {

  let Schemes_coll = await Schemes_collection.collection
    .countDocuments()
    .then((value) => {
      const query = {};
      let product_array = Schemes_collection.find(query);
      return product_array;
    });  
  return Schemes_coll;  
};  






// Socket
const io = require("socket.io")(http);








// Socket
// const io = require("socket.io")(http);

io.on("connection", async (socket) => {
  console.log("Connected...");
  
  // sending products
  socket.on("send_prd", async () => {
    let data_schemes= await Give_Product();
    socket.emit("take_schemes", data_schemes);
  });



  // sending products
  socket.on("send_Commerce", async (count) => {
    let data_Commerce = await Give_Commerce(count);
    socket.emit("give_Commerce", data_Commerce);
  });



  // sending products
  socket.on("Employment", async (count) => {
    let data_Commerce = await Give_job(count);
    socket.emit("take_Employment", data_Commerce);
  });


  socket.on("iM_intrested", async(moblile_no , date ) => {
    const token_obj = cookie.parse(socket.handshake.headers.cookie);
      const token = token_obj.jwt_user;
      const verifyUser = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
      const user = await users.findOne({ _id: verifyUser._id });
      // console.log(user)
      
      async function user_save0(){
      // console.log(user)
        for await (let i of user.IM_intrusted){
          if (i.prds_date == date) {
            return
          }
        }
        console.log(user)

        user.IM_intrusted.push({
          people_mobile :moblile_no,
          prds_date : date
        })

      }
      user_save0()
      await user.save()

        let intrusted_name = user.user_name
        let intrusted_mobile = user.user_mobile
        let intrusted_img = user.user_DP
    save_user(moblile_no , date , intrusted_name , intrusted_mobile,intrusted_img  )
  });




  socket.on("iM_intrested2", async(moblile_no , date ) => {
    const token_obj = cookie.parse(socket.handshake.headers.cookie);
      const token = token_obj.jwt_user;
      const verifyUser = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
      const user = await users.findOne({ _id: verifyUser._id });


     async function user_save0(){
      for await (let i of user.IM_intrusted){
        if (i.prds_date == date) {
          return
        }
      }
        user.IM_intrusted.push({
          people_mobile :moblile_no,
          prds_date : date
        })

      }
      user_save0()
      await user.save()

        let intrusted_name = user.user_name
        let intrusted_mobile = user.user_mobile
        let intrusted_img = user.user_DP
    save_user2(moblile_no , date , intrusted_name , intrusted_mobile,intrusted_img  )
  });


  socket.on("give_tis_please", async( data1 , data2) => {
      const user = await users.findOne({ user_mobile : data1 });
      user.user_Sale_Prd.forEach((element) => {
      if (element.upload_date == data2) {
        // new
        let obj = {
          people_name : user.user_name,
          people_mobile : user.user_mobile,
          people_img : user.profile_img,
          grain_name: element.grain_name,
          grain_quantity:element.grain_quantity,
          selling_price:element.selling_price,
          grain_unit:element.grain_unit
        }
        socket.emit("take_data", obj);
        // new
      }
    })
      user.user_Job_Post.forEach((element) => {
      if (element.upload_date == data2) {
        console.log(element)
        // new
        let obj = {
          people_name : user.user_name,
          people_mobile : user.user_mobile,
          people_img : user.profile_img,
          job_name: element.job_name,
          job_discription:element.job_discription,
          job_salary:element.job_salary,
          job_unit:element.job_unit
        }
        socket.emit("take_data", obj);
        // new
      }
    })

  });

  // giving menu here
  socket.on("menu-please", async (info) => {
    try {
      if (info === "loged_in") {
        let menu = [
          { name: "Account", herf: "userPage" },
          { name: "Logout", herf: "logout" },
          { name: "Logout from all device", herf: "logoutAll" },
          { name: "Term & Condition", herf: "#" },
          { name: "Setting", herf: "#" },
          { name: "Addemployment", herf: "Addemployment" },
        ];
        socket.emit("take-menu", menu);
      } else if (info === "remain") {
        let menu = [
          { name: "Account", herf: "userPage" },
          { name: "Log in", herf: "logIn" },
          { name: "Sign in", herf: "signIn" },
          { name: "Term & Condition", herf: "#" },
          { name: "Setting", herf: "#" },
          { name: "Addemployment", herf: "Addemployment" },
        ];
        socket.emit("take-menu", menu);
      }else if (info === "sarpanch") {
        let menu = [
          { name: "Account", herf: "userPage" },
          { name: "Logout", herf: "logout" },
          { name: "Logout from all device", herf: "logoutAll" },
          { name: "History", herf: "#" },
          { name: "Term & Condition", herf: "#" },
          { name: "Addemployment", herf: "Addemployment" },
          { name: "Add Scheme", herf: "AddSchemes" },
        ];
        socket.emit("take-menu", menu);
      }
    } catch (error) {
      console.log(error);
    }
  });


  

});
