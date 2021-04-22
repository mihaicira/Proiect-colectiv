// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBE64Tt7YztRRdESZVxsnTXpkRWv3D7G-0",
    authDomain: "test-pc-c49e7.firebaseapp.com",
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



















