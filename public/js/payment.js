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
  

    var payment;
  
    window.onload = function() {
    const confirmed_trip = document.querySelector("#confirmed_trip")
  
    // db.collection("trip").doc(`${sessionStorage.getItem("city")}`)


    const snapshot = db
    .collection('trip')
    .doc(`${sessionStorage.getItem("trip_id")}`).get().then((doc)=>{
      // const data = doc.data();

        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const pdiv = document.createElement("div")
        
        //TODO: destination undefined
        // const label = document.createElement("label")
        // label.innerHTML = `${doc.data().destination}`
        // <li>Destination: ${doc.data().destination}</li>

        const snapshot = db
        .collection('driver')
        .doc(sessionStorage.getItem("driverSelected")).get().then((querySnapshot)=>{
          const data = querySnapshot.data();
          console.log("========================")

          const snapshot2 = db
          .collection('experience')
          .doc(sessionStorage.getItem("experienceSelected")).get().then((querySnapshot)=>{
            const data2 = querySnapshot.data();
            console.log("========================")
            console.log(data2.name)
            payment = data2.cost
            pdiv.innerHTML = `
            <ul>
            <li><span>Total:</span> $${data2.cost}</li>
            <li><span>Pickup from:</span> ${sessionStorage.getItem("customerLocation")}</li>
            <li><span>Destination City:</span> ${sessionStorage.getItem("city")}</li>
            <li><span>Experience:</span> ${data2.name}</li>
            <li><span>Depart Time:</span> ${sessionStorage.getItem("departDateTime")}</li>
            <li><span>Driver:</span> ${data.name}</li>
            <li><span>Trip id:</span> ${doc.id}</li>

            </ul>
            `
          });



        });



        console.log(pdiv)
        // ===========conflict from mohit===============
// =======================================
  
confirmed_trip.appendChild(pdiv)



    });



    }
    const snapshot2 = db
    .collection('experience')
    .doc(sessionStorage.getItem("experienceSelected")).get().then((querySnapshot)=>{
      const data2 = querySnapshot.data();
      console.log("========================")
      console.log(data2.name)
      payment = data2.cost
    });

    async function userAction(){
      console.log(payment, 'after payment')
      paymentRequest()
      .then(res => { 
        handleResponse(res) 
      })
      .catch(error=>{
        console.error(error);
      });
    }
    
    function paymentRequest(){

      const CHARGE_URL= new URL('https://api.stripe.com/v1/charges');
    const AMOUNT=payment;
    const CURRENCY='cad';
    const SOURCE='tok_amex';
    const DESCRIPTION='Testing Charge';
    
    CHARGE_URL.search = new URLSearchParams({
        amount: AMOUNT*100,
        currency: CURRENCY,
        source: SOURCE,
        description: DESCRIPTION
    });

      return fetch( CHARGE_URL, {
        method: 'POST',
        headers: {
          'Authorization':'Bearer sk_test_51LKswSLCIaFrG67pVpw4FsV39q9CS7Ji8CG0A9FFyVy58Nra3iyR2Ue6A4TAFQwAEuQoxexEayGHTTknSCXvdekk007IfXzs4Q',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }
    
    async function handleResponse(response){
      if (response.ok) {
        console.log('Response true => ',response);
        document.querySelector('.outputPayment').innerHTML = 'Payment made Successfully';
        window.location.href = `/public/templates/booking-detail.html`
        return;
      }else{
        document.querySelector('.outputPayment').innerHTML = 'Payment unsuccessfull';
      }

      console.log('Response false => ',response);
    }