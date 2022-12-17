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


//crud
const saveData = () => {
    const email = document.getElementById('email1').value
    const password = document.getElementById('password1').value

    db.collection('user')
    .add({
        email: email,
        password: password
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

const readData = () => {
    db.collection('users')
    .get()
    .then((data) => {
        console.log(data.docs.map((item) => {
            return {...item.data(), id: item.id}
        }))
    })
}

const updateData = () => {
    db.collection('users').doc('6caYOiNxwviOJFIQ4Uag')
    .update({
        email: 'ashishisagoodboy1234@gmail.com',
        password: '123456'
    })
    .then(() => {
        alert('Data Updated')
    })
}

const deleteData = () => {
    db.collection('users').doc('6caYOiNxwviOJFIQ4Uag').delete()
    .then(() => {
        alert('Data Deleted')
    })
    .catch((err) =>{
        console.log(err)
    })
}
