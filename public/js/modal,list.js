// const trigger = document.querySelector("#trigger");
function modal_js() {
  const trigger = document.querySelector(".trigger");
  const modalWrapper = document.querySelector(".modal_wrapper");
  const closeBtn = document.querySelector(".close");
  document.body.style.overflow = "hidden";
  if (trigger) {
    trigger.addEventListener("click", function () {
      modalWrapper.classList.add("active");
    });
  } else {
    modalWrapper.classList.add("active");
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      modalWrapper.classList.remove("active");
      document.body.style.overflow = "scroll";
    });
  }
  modalWrapper.addEventListener("click", function (e) {
    if (e.target.classList.contains("no")) return;
    if (e.target !== this) return;
    modalWrapper.classList.remove("active");
    document.body.style.overflow = "scroll";
  });
}

let Cost_foot = document.getElementById("Cost_foot");

// let btn_func = async (element) => {
//     if (element.id === "logIn") {
//       window.open(`/${element.id}` , "_self")
//   }else if(element.id === "signIn"){
//       window.open(`/${element.id}` , "_self")
//     } else {
//       console.log(element.id);
//       // call server for require options
//       const response = await fetch(`http://localhost:8000/${element.id}`);

//       //   getting data of response
//       let data = await response.json();
//       const modal_html = data.body.modal_html;
//       if (data.user_name === "modal6") {
//         const modal_main = document.getElementById("modal_main");
//         modal_main.innerHTML = modal_html;
//         modal_js();
//         function_menu();
//       }
//     }
//   };

let noticebtn = document.getElementById("noticebtn");
noticebtn.addEventListener("click", function clear(){
  let board = document.getElementById("board");
  board.classList.toggle("hide");
  setTimeout(() => {
      board.classList.add("hide");
  }, 15000);
});