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


add4.addEventListener('click', () => {
  // if ( temp1.checkValidity() != true)
  // {
  //     return;
  // }

  console.log("final data: ");
  // console.log(fname2.name, fname2.value)

  // window.location.replace("http://127.0.0.1:5500/public/index.html");
  // sessionStorage.setItem('customerPickupLocation', 'Burnaby' )
  sessionStorage.setItem('customerLat', finalLat)
  sessionStorage.setItem('customerLng', finalLng)
  if(chk === 1) {
    sessionStorage.setItem("customerLocation" , finalpick)
  }else{
    sessionStorage.setItem("customerLocation" , finalpicksearch)
  }
  //SAVE ALL SESSION DATA TO FIREBASE===
  saveData();


  // window.location.pathname = 'public/templates/customer/payment.html'
  // src.style.visibility = "visible"
});

//Start of code by Mohit 

let check = 1;
var APIKEY = "T6OoEaHvVvVk1vZSc76hPAPxsddIx8GS";
var BC = [-123.117535,49.283400]
var finalLng;
var finalLat;
var finalpick;
var chk = 0;
var finalpicksearch;
var map = tt.map({
key: APIKEY,
center: BC,
zoom: 10,
container: "mymap",
style: 'tomtom://vector/1/basic-main'
});

// function goBack(){
//   history.back();
// }

// selected_info.innerHTML = `
// <ul>
// <li><a href="#" onclick="goBack()" ><i class="fas fa-arrow-left"></i></a></li>
// </ul>
// `


function callbackFn(response) {
        console.log(response);
        console.log(response.addresses[0].address.freeformAddress)
        document.getElementById("query").value = response.addresses[0].address.freeformAddress;
        chk = 1;
        finalpick = response.addresses[0].address.freeformAddress;
}
var revgeo = function(lng,ltd){    
    
    tt.services.reverseGeocode({
        key: APIKEY,
        position: [lng,ltd],
        }
        
        ).go().then(callbackFn);
        //alert(position)
    }
var moveMap = function(lnglat){
map.flyTo({
    center:lnglat,
    zoom:17
})

}

// map.touchPitch.enable();
map.addControl(new tt.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
    
}));    
        

var nav = new tt.NavigationControl({});
map.addControl(nav, 'top-left');


map.on('click',function(event){
var touchingLayer = map.queryRenderedFeatures(event.point)
console.log(touchingLayer)


})
function goBack(){
  history.back();
}
var handleResults = function(result){
console.log(result)
    if(result.results){
        moveMap(result.results[0].position)
        // console.log(result.results[0].position.lat)
        // console.log("hooray")

        finalLat = result.results[0].position.lat
        finalLng = result.results[0].position.lng
        finalpicksearch = result.results[0].address.freeformAddress
        //marker.remove(result.results[1].position)
       
        var marker = new tt.Marker().setLngLat(result.results[0].position).addTo(map).setDraggable([shouldBeDraggable=false]);
        
        //var marker2 = new tt.Marker().setLngLat(result.results[1].position).addTo(map);
        // var marker3 = new tt.Marker().setLngLat(result.results[2].position).addTo(map);
        // marker.remove();
    }
}

var search = function(){
tt.services.fuzzySearch({
    key:APIKEY,
    query: document.getElementById("query").value,
    boundingBox: map.getBounds(),
    
}     

).go().then(handleResults)           

}

    function getLocation() {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(showPosition, showError);
} else { 
x.innerHTML = "Geolocation is not supported by this browser.";
}
}

function showPosition(position) {

var poslat = position.coords.latitude
var poslan = position.coords.longitude;
finalLng = poslan;
finalLat = poslat;
arr = [poslan,poslat]
moveMap(arr)
var marker = new tt.Marker().setLngLat(arr).addTo(map);
revgeo(poslan,poslat);
}

//49.2434453 -123.0800022

function showError(error) {
switch(error.code) {
    case error.PERMISSION_DENIED:
    
    break;
    case error.POSITION_UNAVAILABLE:
    // x.innerHTML = "Location information is unavailable."
    break;
    case error.TIMEOUT:
    // x.innerHTML = "The request to get user location timed out."
    break;
    case error.UNKNOWN_ERROR:
    // x.innerHTML = "An unknown error occurred."
    break;
}
}
//end of code by Mohit



const saveData = () => {
  let is_logged_in = sessionStorage.getItem('is_logged_in');
  let logged_in_password = sessionStorage.getItem('logged_in_password');
  let logged_in_uid = sessionStorage.getItem('logged_in_uid');
  let noOfPeople = sessionStorage.getItem('noOfPeople');
  let experienceSelected = sessionStorage.getItem('experienceSelected');
  let finishDateTime = sessionStorage.getItem('finishDateTime');
  // let customerPickupLocation = sessionStorage.getItem('customerPickupLocation');
  let customerLat = sessionStorage.getItem('customerLat');
  let customerLng = sessionStorage.getItem('customerLng');

  let driverSelected = sessionStorage.getItem('driverSelected');
  // let city = sessionStorage.getItem('city');
  let departDateTime = sessionStorage.getItem('departDateTime');
  let user_type = sessionStorage.getItem('user_type');


  const driverRef = db
    .collection('driver')
    .doc(driverSelected);
  console.log("==========================")
  console.log(driverRef)
  
  const customerRef = db
  .collection('customer')
  .doc(logged_in_uid);
console.log(customerRef)

const expRef = db
.collection('experience')
.doc(experienceSelected);
console.log(expRef)



  db.collection('trip')
    .add({
      bookdate: new Date(),
      customer: customerRef,
      // destination: city,
      driver: driverRef,
      enddate: new Date(finishDateTime),
      experience_selected: expRef,
      guest_count: parseInt(noOfPeople),
      is_cancelled: false,
      startdate: new Date(departDateTime),
      pickup_location: new firebase.firestore.GeoPoint(parseFloat(customerLat), parseFloat(customerLng))
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      //trip id save to local
      sessionStorage.setItem("trip_id" , docRef.id)
      

      console.log(db.collection('trip').doc(logged_in_uid))

      db.collection('customer').doc(logged_in_uid)
        .update({
          //or set
          current_location: new firebase.firestore.GeoPoint(parseFloat(customerLat), parseFloat(customerLng))
        })
        .then((docRef) => {
          // console.log("Document written with ID: ", docRef.id);
          window.location.pathname = 'public/templates/customer/payment.html'
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          alert("error")
        });
        
      }).catch((error) => {
        console.error("Error adding document: ", error);
    })

}


// const x = document.querySelector("#error_box")

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition, showError);
//   } else { 
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   document.getElementById('lat').value = position.coords.latitude
//   document.getElementById('lng').value = position.coords.longitude;
// }

// function showError(error) {
//   switch(error.code) {
//     case error.PERMISSION_DENIED:
//       x.innerHTML = "User denied the request for Geolocation."
//       break;
//     case error.POSITION_UNAVAILABLE:
//       x.innerHTML = "Location information is unavailable."
//       break;
//     case error.TIMEOUT:
//       x.innerHTML = "The request to get user location timed out."
//       break;
//     case error.UNKNOWN_ERROR:
//       x.innerHTML = "An unknown error occurred."
//       break;
//   }
// }

// get_loc.onclick=getLocation