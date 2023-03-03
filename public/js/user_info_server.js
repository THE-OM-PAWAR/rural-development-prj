//               PERSONAL DATA FETCHING            // 
//=========== calling API for user data ===========//
let info;

const user_data = async () =>{
  const response = await fetch("http://localhost:8000/m_data")
  let data = await response.json()
  console.log(data.position)
  if (data.user_name === "modal5") {
    const modal_html =  data.body.modal_html
    setTimeout(()=>{
      const modal_main = document.getElementById("modal_main")
      modal_main.innerHTML = modal_html
      modal_js()
    },6000)
    table_body.style.display = "none"
    return data
  }else if (data.position == "user") {
    info = "loged_in"
  }else if (data.position == "secretary") {
    info = "secretary"
  }else if (data.position == "sarpanch") {
    info = "sarpanch"
  }
}
user_data()
