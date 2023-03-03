const socket = io();
let mydata;
const imfo_data = async () => {
  // call server for require options
  const response = await fetch(`http://localhost:8000/giveInfo`);

  //   getting data of response
  let data = await response.json();
  mydata = data;

  let user_img_real = document.getElementById("user_img_real");
  let user_name = document.getElementById("user_name");
  user_name.textContent = data.user_name;
  user_img_real.removeAttribute("src");
  user_img_real.setAttribute("src", `uploads/${mydata.profile_img}`);
  console.log(data);
};
imfo_data();

const action_user = (element) => {
  if (element.value == "E-Commerce") {
    document.getElementById("User_data_sec").innerHTML=``
    let product_arr = mydata.user_Sale_Prd;
    console.log(product_arr);
    product_arr.forEach((element) => {
      let ok =""
      let style =""
      if (element.intrusted.length > 0 ) {
         ok = "showIntested3(this)"
         style= `background:#006db1`
      }
      let sale_grain_box = document.createElement("sale_grain_box");
      sale_grain_box.className = "sale_grain_box";
      sale_grain_box.innerHTML = `   
      <div class="seller_info">
        <div class="seller_img">
          <img src="uploads/${mydata.profile_img}" alt="" />
        </div>
        <div class="seller_name">
          <h4 class="name_head">${mydata.user_name}</h4>
        </div>
      </div>
      <div class="grain_info">
        <div class="grain_name">
          <h3 class="grain_name_head">${element.grain_name}</h3>
          <p class="stock">${element.grain_quantity}kg in stock</p>
        </div>
        <div class="grain_quantity">
          <h3 class="quantity_head">${element.selling_price}rs/kg</h3>
        </div>
      </div>
      <div class="seller_contact">
        <div class="logo_contact"></div>
        <h3 class="molbile_no">${mydata.user_mobile}</h3>
      </div>
      <div class="intrusted_btn" style="${style}" onclick="${ok}">
        <div class="logo_like"></div>
        <h3 class="intrested">Intrested</h3>
        <div id="${element._id}" style="display:none;"></div>
      </div>
    `;
      document.getElementById("User_data_sec").appendChild(sale_grain_box);
    });




  }else if(element.value == "liked_item"){
    // console.log( mydata.IM_intrusted)
    let product_arr = mydata.IM_intrusted;
    console.log(product_arr);
    product_arr.forEach((element) => {
      let data1 = element.people_mobile
      let data2 = element.prds_date
      socket.emit("give_tis_please" , data1 , data2)
      document.getElementById("User_data_sec").innerHTML=``
    })




  }else if (element.value == "Employment") {

document.getElementById("User_data_sec").innerHTML=``
    let product_arr = mydata.user_Job_Post;
    console.log(product_arr);
    product_arr.forEach((element) => {
      let ok =""
      let style =""
      let code =""
      if (element.intrusted.length > 0 ) {
        ok = "showIntested3(this)"
        style= `background:#006db1`
        code =`<p style="display:none ;">ok</p>`
      }
      let sale_grain_box = document.createElement("sale_grain_box");
      sale_grain_box.className = "sale_grain_box";
      sale_grain_box.innerHTML = `   
      <div class="seller_info">
        <div class="seller_img">
          <img src="uploads/${mydata.profile_img}" alt="" />
        </div>
        <div class="seller_name">
          <h4 class="name_head">${mydata.user_name}</h4>
        </div>
      </div>
      <div class="grain_info">
        <div class="grain_name">
          <h3 class="grain_name_head">${element.job_name}</h3>
          <p class="stock">${element.job_discription}kg in stock</p>
        </div>
        <div class="grain_quantity">
          <h3 class="quantity_head">${element.job_salary}rs/kg</h3>
        </div>
      </div>
      <div class="seller_contact">
        <div class="logo_contact"></div>
        <h3 class="molbile_no">${mydata.user_mobile}</h3>
      </div>
      <div class="intrusted_btn " style="${style}" onclick="${ok}">
      ${code}
        <div class="logo_like"></div>
        <h3 class="intrested">Intrested</h3>
        <div id="${element._id}" style="display:none;"></div>
      </div>
    `;
      document.getElementById("User_data_sec").appendChild(sale_grain_box);
    });







    
  }
};

socket.on("take_data" , element=>{
  console.log(element)
if (element.grain_name) {
  // new
  let element_img = element.people_img ;
  if (element.people_img == undefined) {
    console.log(element.people_img)
    element_img ="undefined.svg"
  }
  // new
      let sale_grain_box = document.createElement("sale_grain_box");
      sale_grain_box.className = "sale_grain_box";
      //  new img add ki hai 
      sale_grain_box.innerHTML = `   
      <div class="seller_info">
        <div class="seller_img">
          <img src="uploads/${element_img}" alt="" />
        </div>
        <div class="seller_name">
          <h4 class="name_head">${mydata.user_name}</h4>
        </div>
      </div>
      <div class="grain_info">
        <div class="grain_name">
          <h3 class="grain_name_head">${element.grain_name}</h3>
          <p class="stock">${element.grain_quantity}kg in stock</p>
        </div>
        <div class="grain_quantity">
          <h3 class="quantity_head">${element.selling_price}rs/kg</h3>
        </div>
      </div>
      <div class="seller_contact">
        <div class="logo_contact"></div>
        <h3 class="molbile_no">${mydata.user_mobile}</h3>
      </div>
    `;
      document.getElementById("User_data_sec").appendChild(sale_grain_box)
}else if (element.job_name) {
    let sale_grain_box = document.createElement("sale_grain_box");
    sale_grain_box.className = "sale_grain_box";
    sale_grain_box.innerHTML = `   
    <div class="seller_info">
      <div class="seller_img">
        <img src="uploads/1654361665706.jpg" alt="" />
      </div>
      <div class="seller_name">
        <h4 class="name_head">Om Pawar</h4>
      </div>
    </div>
    <div class="grain_info">
      <div class="grain_name">
        <h3 class="grain_name_head">${element.job_name}</h3>
        <p class="stock">${element.job_discription}kg in stock</p>
      </div>
      <div class="grain_quantity">
        <h3 class="quantity_head">${element.job_salary}rs/kg</h3>
      </div>
    </div>
    <div class="seller_contact">
      <div class="logo_contact"></div>
      <h3 class="molbile_no">${mydata.user_mobile}</h3>
    </div>
  `;
    document.getElementById("User_data_sec").appendChild(sale_grain_box)
}
})


const showIntested3 = (element)=>{
  let ele = document.getElementsByClassName("itrusted_section")
  let ok = Array.from(ele)
  ok.forEach((ele)=>{
    ele.remove()
  })


  console.log(element)
  let sales_grain_box = element.parentElement
  let _id = element.children[2].id
  // console.log(_id)

  let itrusted_section = `<div class="itrusted_section">        </div>`

    sales_grain_box.insertAdjacentHTML("afterend" , itrusted_section )

    let itrusted_section2 = document.getElementsByClassName("itrusted_section")[0]
    let datas
    if (element.children[0].textContent == "ok") {
      console.log("okok_emp")
      _id = element.children[3].id
      mydata.user_Job_Post.forEach(element => {
        if(element._id == _id){
          datas = element
        }
        console.log(element._id , _id)
      });
      console.log(datas)
      datas.intrusted.forEach(element => {
        let itrusted_main = document.createElement("div")
        itrusted_main.className = "itrusted_main"
        itrusted_main.innerHTML=`<div class="img_box_int">
                <img src="uploads/1677240207403.jpg" alt="" class="itn_img">
            </div>
            <div class="people_name">
                ${element.intrusted_name}
            </div>
            <div class="seller_contact2">
                <div class="logo_contact"></div>
                <h3 class="molbile_no2">${element.intrusted_mobile}</h3>
              </div>`
              itrusted_section2.appendChild(itrusted_main)
      });
    }else{
      mydata.user_Sale_Prd.forEach(element => {
        if(element._id == _id){
          datas = element
          console.log(element)
        }
      });
      // console.log(datas)
      datas.intrusted.forEach(element => {
        let itrusted_main = document.createElement("div")
        itrusted_main.className = "itrusted_main"
        itrusted_main.innerHTML=`<div class="img_box_int">
                <img src="uploads/1677240207403.jpg" alt="" class="itn_img">
            </div>
            <div class="people_name">
                ${element.intrusted_name}
            </div>
            <div class="seller_contact2">
                <div class="logo_contact"></div>
                <h3 class="molbile_no2">${element.intrusted_mobile}</h3>
              </div>`
              itrusted_section2.appendChild(itrusted_main)
      });
    }
}


const showIntested = (element)=>{
  let ele = document.getElementsByClassName("itrusted_section")
  let ok = Array.from(ele)
  ok.forEach((ele)=>{
    ele.remove()
  })

  console.log(element + 206)
  let sales_grain_box = element.parentElement
  let _id = element.children[2].id
  // console.log(_id)

  let itrusted_section = `<div class="itrusted_section">        </div>`

    sales_grain_box.insertAdjacentHTML("afterend" , itrusted_section )

    let itrusted_section2 = document.getElementsByClassName("itrusted_section")[0]
    let datas
    mydata.user_Sale_Prd.forEach(element => {
      if(element._id == _id){
        datas = element
        console.log(element)
      }
    });
    console.log(datas)
    datas.intrusted.forEach(element => {
      let itrusted_main = document.createElement("div")
      itrusted_main.className = "itrusted_main"
      itrusted_main.innerHTML=`<div class="img_box_int">
              <img src="uploads/1677240207403.jpg" alt="" class="itn_img">
          </div>
          <div class="people_name">
              ${element.intrusted_name}
          </div>
          <div class="seller_contact2">
              <div class="logo_contact"></div>
              <h3 class="molbile_no2">${element.intrusted_mobile}</h3>
            </div>`
            itrusted_section2.appendChild(itrusted_main)
    });
}
