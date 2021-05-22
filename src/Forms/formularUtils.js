// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBE64Tt7YztRRdESZVxsnTXpkRWv3D7G-0",
    authDomain: "test-pc-c49e7.firebaseapp.com",
    databaseURL: "https://test-pc-c49e7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-pc-c49e7",
    storageBucket: "test-pc-c49e7.appspot.com",
    messagingSenderId: "306697854246",
    appId: "1:306697854246:web:a4e07e2f2899b7b1b575e7",
    measurementId: "G-4WCWKS0KCS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


idGenerator = 1

function generateId(){
    const id = "generated-id-"+idGenerator;
    idGenerator = idGenerator + 1
    return id
}

function setLocalPower(power){
    localStorage.setItem("power",power.toLowerCase());
}
function getLocalPower(){
    const item = localStorage.getItem("power");
    if(item)
        return item.toLowerCase();
    else
        return null
}

function verifyIdentity(value){
    switch(value){
        case "eval":
            setLocalPower("eval")
            return "eval";
            break;
        case "admin":
            setLocalPower("admin")
            return "admin";
            break;
        default:
            console.log("unknown URL power")
            return false;
            break;
    }
}















