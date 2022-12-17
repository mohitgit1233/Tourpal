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
const departTime = new Date(sessionStorage.getItem(('departDateTime')));
const arriveTime = new Date(sessionStorage.getItem(('finishDateTime')));


function pick_fn(e) {
    // if ( temp1.checkValidity() != true)
  // {
  //     return;
  // }

  console.log("clicked add");
  // src.style.visibility = "visible"
  // sessionStorage.setItem("driverSelected", "Jordan Marlin");
  sessionStorage.setItem('driverSelected', e.target.parentElement.id);

  window.location.href = `/public/templates/customer/select-pickup.html`
}


window.addEventListener("load", yourfunction, false);

  function goBack(){
    history.back();
  }
  


function yourfunction() {
  const urlParams = new URLSearchParams(window.location.search);
  const exp_id = urlParams.get('exp_id');
  console.log("============")
  console.log(exp_id)



  const selected_info = document.querySelector("#selected_info")
  const driver_list = document.querySelector("#driver_list")
  const selection = document.querySelector("#selection")


  const snapshot = db
    .collection('experience')
    .doc(exp_id).get().then((querySnapshot)=>{
      const data = querySnapshot.data();
      console.log("========================")
      console.log(data.name)

      selected_info.innerHTML = `
      <ul>
    <li><a href="#" onclick="goBack()" ><i class="fas fa-arrow-left"></i></a></li>
      <li  class="location-experiences" >${sessionStorage.getItem('city')}</li>
      <li>${departTime.toDateString(sessionStorage.getItem(('departDateTime')))}</li>
      <li>${arriveTime.toDateString(sessionStorage.getItem('finishDateTime'))}</li>
      <li>${sessionStorage.getItem('noOfPeople')}</li>
      <li>${data.name}</li>
    
      
      </ul>
      `
    });




  const categoryDocRef = db
    .collection('experience')
    .doc(exp_id);
  console.log(categoryDocRef)

  db.collection("driver").where('experiences_covered', 'array-contains', categoryDocRef).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {







      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const pdiv = document.createElement("div")
      pdiv.setAttribute("id", doc.id )
      // const input = document.createElement("input")
      const button = document.createElement("button")

      const image = document.createElement("img")
      image.setAttribute("src", doc.data().picture)

      const div_no = document.createElement("div")
      div_no.innerHTML = `Number of trips done: ${doc.data().number_of_trips}`

      const divr = document.createElement("div")
      if (doc.data().rating === 5)
      {
        divr.innerHTML = `&starf; &starf; &starf; &starf; &starf;`

      }
      else if  (doc.data().rating === 4)
      {
        divr.innerHTML = `&starf; &starf; &starf; &starf; &star;`

      }
      else if  (doc.data().rating === 3)
      {
        divr.innerHTML = `&starf; &starf; &starf; &star; &star;`

      }
      else if  (doc.data().rating === 2)
      {
        divr.innerHTML = `&starf; &starf; &star; &star; &star;`

      }
      else {

        divr.innerHTML = `&starf; &star; &star; &star; &star;`
      }



      button.setAttribute("type", "button")
      button.setAttribute("name", "ce")
      button.setAttribute("class", "add2")
      button.onclick=pick_fn
      button.innerText=`Pick`

      // input.setAttribute("type", "radio")
      // input.setAttribute("name", "ce")
      const label = document.createElement("label")
      // const img = document.createElement("img")
      // img.setAttribute("src", `data:image/jpeg;base64,${doc.data().picture}`)

      label.innerHTML = `${doc.data().name}`

      console.log(pdiv)
      // pdiv.appendChild(input)
      pdiv.appendChild(image)
      pdiv.appendChild(label)
      pdiv.appendChild(div_no)
      pdiv.appendChild(divr)
      
      pdiv.appendChild(button)

      // pdiv.appendChild(img)


      driver_list.insertBefore(pdiv, selection)


    });
  });
}