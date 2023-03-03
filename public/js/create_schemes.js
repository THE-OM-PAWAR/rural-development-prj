//------- getting product info here using API --------//
socket.on("take_schemes", (data) => {
  schemes_section.innerHTML = "";
  let i = 0;
  let product_array = data;
  console.log(product_array);
  product_array.forEach((element) => {
    i++;
    let schemes_section = document.getElementById("schemes_section");

    let scheme = document.createElement("div");
    scheme.className = "scheme_main";
    scheme.innerHTML = `<img class="scheme_img" src="uploads/${element.Scheme_Banner}" alt="">
        <div class="scheme_info">
            <div class="scheme_name" id="scheme_name">
            <h3>${element.Scheme_Name}</h3>
        </div>
          <div class="scheme_disciption dissapare">
              <p>
                 ${element.Scheme_discription}
                </p>
            </div>
            <div class="scheme_link dissapare">
                <a href="${element.Scheme_Link}">
                    <input type="submit" value="Know more" />
                </a>
            </div>
            </div>`;
    schemes_section.appendChild(scheme);
  });
});

//------- getting product info here using API --------//
socket.on("give_Commerce", (data) => {
  let removing = document.querySelectorAll(".scheme_main");
  if (removing.length > 0) {
    removing.forEach((element) => {
      element.remove();
    });
  }
  let removing2 = document.querySelectorAll(".job_box");
  if (removing2.length > 0) {
    removing2.forEach((element) => {
      element.remove();
    });
  }
  let i = 0;
  let product_array = data;
  console.log(product_array);
  product_array.forEach((element) => {
    i++;
    let element_img = element.seller_img 
    if (element_img == undefined) {
      console.log(element_img)
      element_img ="undefined.svg"
    }
    let schemes_section = document.getElementById("schemes_section");
    let = date = element.upload_date;
    console.log(element.seller_img);
    let scheme = document.createElement("div");
    scheme.className = "sale_grain_box";
    scheme.innerHTML = `
        <div class="seller_info">
          <div class="seller_img">
            <img src="uploads/${element_img}" alt="" />
          </div>
          <div class="seller_name">
            <h4 class="name_head">${element.seller_name}</h4>
          </div>
        </div>
        <div class="grain_info">
          <div class="grain_name">
            <h3 class="grain_name_head">${element.grain_name}</h3>
            <p class="stock">${element.grain_quantity}kg in stock</p>
          </div>
          <div class="grain_quantity">
            <h3 class="quantity_head">${element.grain_cost}rs/${element.grain_unit}</h3>
          </div>
        </div>
        <div class="seller_contact">
          <div class="logo_contact"></div>
          <h3 class="molbile_no">${element.seller_mobile}</h3>
          <div style="display:none;">${date}</div>
        </div>
        <div class="intrusted_btn" onclick="IM_intrested(this)">
          <div class="logo_like"></div>
          <h3 class="intrested">like</h3>
        </div>`;
    schemes_section.appendChild(scheme);
  });
});

//------- getting product info here using API --------//
socket.on("take_Employment", (data) => {
  let removing = document.querySelectorAll(".scheme_main");
  if (removing.length > 0) {
    removing.forEach((element) => {
      element.remove();
    });
    // schemes_section.innerHTML = ""
  }
  let removing2 = document.querySelectorAll(".sale_grain_box");
  if (removing2.length > 0) {
    removing2.forEach((element) => {
      element.remove();
    });
    // schemes_section.innerHTML = ""
  }
  let i = 0;
  let product_array = data;
  console.log(product_array);
  product_array.forEach((element) => {
    i++;
    let schemes_section = document.getElementById("schemes_section");
    let = date = element.upload_date;
    let element_img = element.owner_img 
    if (element_img == undefined) {
      console.log(element_img)
      element_img ="undefined.svg"
    }
    let scheme = document.createElement("div");
    scheme.className = "job_box";
    scheme.innerHTML = `
        <div class="owner_info">
          <div class="seller_img">
            <img src="uploads/${element_img}" alt="" />
          </div>
          <div class="seller_name">
            <h4 class="name_head">${element.owner_name}</h4>
          </div>
        </div>
        <div class="grain_info">
          <div class="grain_name">
            <h3 class="grain_name_head">${element.job_name}</h3>
            <p class="stock">${element.job_discription}kg in stock</p>
          </div>
          <div class="grain_quantity">
            <h3 class="quantity_head">${element.job_salary}rs/${element.job_unit}</h3>
          </div>
        </div>
        <div class="seller_contact">
          <div class="logo_contact"></div>
          <h3 class="molbile_no">${element.owner_mobile}</h3>
          <div style="display:none;">${date}</div>
        </div>
        <div class="intrusted_btn" onclick="IM_intrested2(this)">
          <div class="logo_like"></div>
          <h3 class="intrested">like</h3>
      </div>`;
    schemes_section.appendChild(scheme);
  });
});

let selection;
let count = 0;
const action_domain = (element) => {
  // console.log()
  count = 0;
  if (element.textContent == "Employment") {
    selection = "Employment";
    socket.emit("Employment");
  } else if (element.textContent == "E-Commerce") {
    selection = "send_Commerce";
    socket.emit("send_Commerce");
  } else if (element.textContent == "Schemes") {
    selection = "Schemes";
    socket.emit("send_prd");
  }
};

// ------------ IntersectionObserver for following lazy loading------------//
const iso = new IntersectionObserver((entries) => {
  // console.log(selection)
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    if (selection == "Schemes") {
      return;
    }
    count++;
    socket.emit(selection, count);
  });
}, {});
iso.observe(document.getElementById("watch_end_of_document"));
iso.observe(document.getElementById("watch_end_of_document2"));

const IM_intrested = (element) => {
  element.style = "box-shadow: 0 0 0.2rem 0 #00000057;"
  element.children[0].style = `background-image: url("../svg/liked.svg");`
  element.children[1].textContent = "liked"
  let moblile_no = element.previousElementSibling.children[1].textContent;
  let prd_id = element.previousElementSibling.children[2].textContent;
  socket.emit("iM_intrested", moblile_no, prd_id);
};

const IM_intrested2 = (element) => {
  element.style = "box-shadow: 0 0 0.2rem 0 #00000057;"
  element.children[0].style = `background-image: url("../svg/liked.svg");`
  element.children[1].textContent = "liked"
  console.log("intrusted")
  let moblile_no = element.previousElementSibling.children[1].textContent;
  let prd_id = element.previousElementSibling.children[2].textContent;
  socket.emit("iM_intrested2", moblile_no, prd_id);
};
