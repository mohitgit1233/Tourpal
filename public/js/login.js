const firebaseApp = firebase.initializeApp({
    //Your own Firebase Credentials..
    apiKey: "AIzaSyBT-dRzb2pbR9exsiiIJtoILkf5ck3X0pg",
    authDomain: "tourpal-e680e.firebaseapp.com",
    databaseURL: "https://tourpal-e680e-default-rtdb.firebaseio.com",
    projectId: "tourpal-e680e",
    storageBucket: "tourpal-e680e.appspot.com",
    messagingSenderId: "648603206107",
    appId: "1:648603206107:web:c425541113bc713a2be7fe",
    measurementId: "G-G9LL7MBNG0"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();


signin.addEventListener ('click', (e) => {
  e.preventDefault();
  console.log("haha")
  temp1.checkValidity();
  temp1.reportValidity();
  if ( temp1.checkValidity() != true)
  {
      return;
  }


    console.log("clicked signin");  
    // console.log(email.value, password.value)

    const email = document.getElementById('email1').value
    const password = document.getElementById('password1').value

    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {


        onSuccessLogin(email, password, res);
    })
    .catch((err) => {
        // alert(err.message)
        customFlash("The password is invalid or the user does not have a password")
        console.log(err.code)
        console.log(err.message)
    })
  });


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

function onSuccessLogin(email, password, res) {
    console.log("on success")

    console.log(res.user)
    // alert(`Welcome ${email}`)



    sessionStorage.setItem('is_logged_in', true);
    sessionStorage.setItem('logged_in_email', email);
    sessionStorage.setItem('logged_in_uid', res.user.uid);
    sessionStorage.setItem('logged_in_password', password);
    // sessionStorage.setItem('user_type', "customer");
    if (sessionStorage.getItem('user_type') === "driver"){
      console.log("driverrrrrrrrrrrrrrrrrrrr")
        window.location.href = `/public/templates/driver/driver-dashboard.html`
    }
    else
    {
      window.location.href = `/public/templates/customer/index.html`
    }


}

window.onload = function() {
  // const urlParams = new URLSearchParams(window.location.search);
  // const user_type = urlParams.get('user_type');
  // sessionStorage.setItem('user_type', user_type);
   if ( sessionStorage.getItem('user_type') === "driver" )
   {
    // disable
    // document.querySelector("#abc").href = "#" ; 
    document.querySelector("#abc").style.display = "none";

   }

    is_logged_in = sessionStorage.getItem('is_logged_in');
    
  if (is_logged_in === "true") {
    //redirect
    console.log("user already logged in")

    if (sessionStorage.getItem('user_type') === "driver"){
      console.log("driverrrrrrrrrrrrrrrrrrrr")
        window.location.href = `/public/templates/driver/driver-dashboard.html`
    }
    else
    {
      window.location.href = `/public/templates/customer/index.html`
    }

  }




}