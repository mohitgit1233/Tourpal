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
// const auth = firebaseApp.auth();
//const Datee = sessionStorage.getItem(('departDateTime'()));
const departTime = new Date(sessionStorage.getItem(('departDateTime')));
const arriveTime = new Date(sessionStorage.getItem(('finishDateTime')));
// var abc=123

window.addEventListener("load", yourfunction, false); 

function goBack(){
  history.back();
}

function yourfunction() {
  const selected_info = document.querySelector("#selected_info")
  const city_filler = document.querySelector("#city_filler")
  
  selected_info.innerHTML = `
  <ul>
  <li><a href="#" onclick="goBack()" ><i class="fas fa-arrow-left"></i></a></li>
  <li class="location-experiences">${sessionStorage.getItem('city')}</li>
  <li>${departTime.toDateString(sessionStorage.getItem(('departDateTime')))}</li>
  <li>${arriveTime.toDateString(sessionStorage.getItem('finishDateTime'))}</li>
  <li>${sessionStorage.getItem('noOfPeople')}</li>
  
  </ul>
  `


  city_filler.innerHTML = `${sessionStorage.getItem('city')}`
  console.log("hw")

const exps = document.querySelector("#exps")

db.collection("experience").where("city" , "==" , sessionStorage.getItem('city').toLowerCase() ).get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // console.log(doc)
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const pdiv = document.createElement("article")
      pdiv.setAttribute("id", doc.id )
      const h2 = document.createElement("h2")
      const p = document.createElement("p")
      const button = document.createElement("button")
      
      button.setAttribute("type", "button")
      button.setAttribute("name", "ce")
      button.setAttribute("class", "add2")
      button.onclick=pick_fn

      button.innerText=`Pick`
      // const label = document.createElement("label")
      const img = document.createElement("img")
      img.setAttribute("src", `data:image/jpeg;base64,${doc.data().picture}`)
      
      h2.innerHTML = `${doc.data().name}`
      p.innerHTML = `${doc.data().description}`
      // label.innerHTML = `pick`

      console.log(pdiv)
      pdiv.appendChild(img)
      pdiv.appendChild(h2)
      pdiv.appendChild(p)
      pdiv.appendChild(button)
      // pdiv.appendChild(label)
      exps.appendChild(pdiv)

  });
});
}

function pick_fn(e) {

// const nextBtn = document.querySelectorAll("button")
// nextBtn[0].addEventListener ('click', () => {
  // if ( temp1.checkValidity() != true)
  // {
  //     return;
  // }

  console.log("clicked add");
  console.log(e.target.parentElement.id);  

  // driver_list.style.visibility = "visible"
  sessionStorage.setItem('experienceSelected', e.target.parentElement.id);

  window.location.href = `/public/templates/customer/select-driver.html?exp_id=${e.target.parentElement.id}`

// });

}
