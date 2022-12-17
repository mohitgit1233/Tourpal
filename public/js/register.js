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

signup.addEventListener ('click', (e) => {
  e.preventDefault();
  console.log("haha")
  temp1.checkValidity();
  temp1.reportValidity();
  if ( temp1.checkValidity() != true)
  {
      return;
  }

    console.log("clicked singup");  
    // console.log(email.value, password.value)

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const password2 = document.getElementById('confirmpassword').value
    const fullname = document.getElementById('fullname').value
    const phone = document.getElementById('phone').value
    const picture = document.getElementById('picture').files[0]
    var reader = new FileReader();
    try{
      reader.readAsDataURL(picture); 

      reader.onloadend = function() {
        let base64data = reader.result;                
        console.log(base64data);
        if (password !== password2){
          alert("passwords not same - error")
          return
        }
    
        auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res.user)
            // console.log(picture)
              addToDbCustomer(email, password, fullname, phone, base64data, res);        
        })
        .catch((err) => {
            alert(err.message)
            console.log(err.code)
            console.log(err.message)
        })
      }
    }
    catch (err)
    {
      auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
          console.log(res.user)
          // console.log(picture)
            addToDbCustomer(email, password, fullname, phone, "", res);
      })
      .catch((err) => {
          alert(err.message)
          console.log(err.code)
          console.log(err.message)
      })
    }
    // IMP: MAx 1MB upload supported
    //FirebaseError: The value of property "picture" is longer than 1048487 bytes.

  });

  window.onload = function() {
    // console.log("seting=================")
    // const urlParams = new URLSearchParams(window.location.search);
    // const user_type = urlParams.get('user_type');
    // sessionStorage.setItem('user_type', user_type);


    is_logged_in = sessionStorage.getItem('is_logged_in');
    
  if (is_logged_in === "true") {
    //redirect
    console.log("user already logged in")
    window.location.href = `/public/templates/customer/index.html`
  }
}

function addToDbCustomer(email, password, fullname, phone, picture, res) {
  // var userSnap = firebaseApp.database().ref('users/'+ auth.currentUser)
// console.log(userSnap)
db.collection('customer').doc(res.user.uid).set({
  email: email,
  password: password,
  name: fullname,
  phone_number: phone,
  picture: picture
})
  // db.collection('customer')
  // .add({
  //     email: email,
  //     password: password,
  //     name: fullname,
  //     phone_number: phone,
  //     picture: picture
  // })
  .then((docRef) => {
      // console.log("Document written with ID: ", docRef.id);
      console.log("Document written with ID: ")
      onSuccessRegister(email, password, res);

  })
  .catch((error) => {
      console.error("Error adding document: ", error);
      alert("error")
  });
}

function addToDbDriver(email, password, fullname, phone, picture, res) {
db.collection('driver').doc(res.user.uid).set({
  email: email,
  password: password,
  name: fullname,
  phone_number: phone,
  picture: picture
})
  .then((docRef) => {
      console.log("Document written with ID: ")
      onSuccessRegister(email, password, res);

  })
  .catch((error) => {
      console.error("Error adding document: ", error);
      alert("error")
  });
}

function onSuccessRegister(email, password, res) {
  console.log("on success")

  // alert(`Welcome ${email}`)
  alert("User successfully created")

  window.location.href = `/public/templates/login.html`


}