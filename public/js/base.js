//hamburger
const menuButton = document.querySelector("#menu")
const navbar = document.querySelector("header>nav")

menuButton.onclick = function() {
  console.log("toggle")
  navbar.classList.toggle("hide")
}

async function customFlash(message){
  alert_body.innerHTML = `${message}`
  let alert = document.querySelector("#alert")
  alert.classList.add("alert-show")
  await sleep(3000);
  alert.classList.remove("alert-show")

}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("it worked===============================")
  let is_logged_in = "false"
  try {
    is_logged_in = sessionStorage.getItem('is_logged_in');
    
  } catch (error) {
    is_logged_in = "false"
  }
  if (is_logged_in === "true") {
    console.log("user already logged in. no problem")
    let useremail = sessionStorage.getItem("logged_in_email")
    console.log(useremail)
    const logouta = document.querySelector("#logout")
    logouta.append(useremail)
  }
  else
  {
    //redirect
    let host = window.location.host
    console.log(host)
    window.location.href = `/public/templates/landing-page.html`
  }