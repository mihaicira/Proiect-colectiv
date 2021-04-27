// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCUeyWLy38mD-8qd1ZXl7MZ-fbzkY5Al78",
    authDomain: "centruldestudiifrancofone.firebaseapp.com",
    projectId: "centruldestudiifrancofone",
    storageBucket: "centruldestudiifrancofone.appspot.com",
    messagingSenderId: "798392079407",
    appId: "1:798392079407:web:a7e48fa7f3bacc089ae2da",
    measurementId: "G-N8FDSBDD53"
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



















