// ============== menu function code ==============//
const socket = io()
let menucount = 0;
const function_menu = (element) => {
  menucount++;
  if (menucount === 1) {
    socket.emit("menu-please", info);
    console.log(info)
  }

  let menu_section = document.getElementById("manu_Section");

  menu_section.classList.toggle("function_menu");

  if (!menu_section.classList.contains("function_menu")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
};

let modalWrapper = document.getElementById("manu_Section");

modalWrapper.addEventListener("click", function (e) {
  if (e.target !== this) return;
  modalWrapper.classList.add("function_menu");
  document.body.style.overflow = "scroll";
});

// getting the menu from here
socket.on("take-menu", (menu) => {
  console.log(menu)
  let menuBtnC = document.createElement("div");
  menuBtnC.className = "menuBtnC";
  menuBtnC.id = "menuBtnC";
  menuBtnC.innerHTML = `          
      <div class="opt_menu" id="opt_menuID">
        <div class="manuBtn" onclick="function_menu(this)" id="manubtn2">
        </div>
      </div>`;
  document.getElementById("manuBox").appendChild(menuBtnC);
  let arr_menu = menu;

  // ,creating menu options using for each loop
  arr_menu.forEach((element) => {
    let box = document.getElementById("menuBtnC");

    let A_tag = document.createElement("div");
    A_tag.className = "opt_menu";
    A_tag.setAttribute("id", `${element.herf}`);
    A_tag.setAttribute("onclick", `btn_func(this)`);
    A_tag.innerHTML = `<p>${element.name}</p>`;
    // appending menu option in memu box
    box.appendChild(A_tag);
  });
});

// function for all menu option onclick
let btn_func = async (element) => {
  if (element.id === "logIn") {
    window.open(`/${element.id}` , "_self")
}else if(element.id === "signIn"){
    window.open(`http://localhost:8000/${element.id}` , "_self")
  }else if(element.id === "AddSchemes"){
    window.open(`/${element.id}` , "_self")
  }else if(element.id === "userPage"){
    window.open(`/${element.id}` , "_self")
  } else {
    console.log(element.id);
    // call server for require options
    const response = await fetch(`http://localhost:8000/${element.id}`);

    //   getting data of response
    let data = await response.json();
    const modal_html = data.body.modal_html;
    if (data.user_name === "modal6") {
      const modal_main = document.getElementById("modal_main");
      modal_main.innerHTML = modal_html;
      modal_js();
      function_menu();
    }
  }
};


