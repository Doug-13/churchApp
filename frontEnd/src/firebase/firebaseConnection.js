import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {    
    apiKey: "AIzaSyBwcUVMJada6LJZpKdn6cHMTiXs_D2bkCQ",
    authDomain: "churchapp-eda88.firebaseapp.com",
    projectId: "churchapp-eda88",
    storageBucket: "churchapp-eda88.appspot.com",
    messagingSenderId: "741432882842",
    appId: "1:741432882842:web:6154491824cd856d20d123",
    measurementId: "G-44B52VPS2Z"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

  export default firebase;