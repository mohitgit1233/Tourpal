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

  logged_in_uid = sessionStorage.getItem('logged_in_uid');



db.collection('customer').get().then((querySnapshot) => {

    // doc(logged_in_uid).

    querySnapshot.forEach((doc) => {
        if (doc.id === logged_in_uid)
        {

            console.log(doc.id, " => ", doc.data());
            console.log(doc.data().picture)
            fullname.value = doc.data().name
            email.value = doc.data().email
            phone.value = doc.data().phone_number
            outboximgpre.innerHTML = `<img src="${doc.data().picture}" >`
        }
    });

});