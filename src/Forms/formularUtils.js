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

function sendSelfEmail(template){
    emailjs.send('service_lnibc4o', 'template_ivq0iu7', template)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

function sendEvalEmail(template){
    emailjs.send('service_lnibc4o', 'template_nid0vpf', template)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

function uploadFile(file,path){
    console.log("path: ",path)
    var storageRef = firebase.storage().ref('reviste/'+ path);
    storageRef.put(file)
        .then((snapshot)=>{
            //pass
            //success
        })
}

function blink(elem){
    elem.css("background","red")
    setTimeout(()=>{
        elem.css("background","white")
        setTimeout(()=>{
            elem.css("background","red")
            setTimeout(()=>{
                elem.css("background","white")
            },700)
        },700)
    },700)
}

function blinkBox(elem){
    elem.css("box-shadow","0 0 .2vw .2vw red")
    setTimeout(()=>{
        elem.css("box-shadow","0 0 .2vw .2vw transparent")
        setTimeout(()=>{
            elem.css("box-shadow","0 0 .2vw .2vw red")
            setTimeout(()=>{
                elem.css("box-shadow","0 0 .2vw .2vw transparent")
            },700)
        },700)
    },700)
}

function isTextCompleted(elem){
    const value = elem.val()
    if(value.trim() === ""){

        $('html, body').animate({
            scrollTop: (elem.offset().top-200)
        }, 100);

        blink(elem)
        return false
    }
    return value
}

function isRadioCompleted(name){
    const radio = $(`input[name="${name}"]:checked`).val();
    if(!radio){
        const jQueryElem = $(`input[name="${name}"]`)

        $('html, body').animate({
            scrollTop: (jQueryElem.offset().top-200)
        }, 100);

        blinkBox(jQueryElem)
        return false
    }

    return radio
}

function isCheckCompleted(name){
    const options = []

    $(`input:checkbox[name="${name}"]:checked`).each(function(){
        options.push($(this).val());
    });
    if(options.length === 0){
        const jQueryElem = $(`input:checkbox[name="${name}"]`)
        $('html, body').animate({
            scrollTop: (jQueryElem.offset().top-200)
        }, 100);

        blinkBox(jQueryElem)

        return false
    }

    return options
}

function getDropdownValue(id){
    return $(`#${id}`).find(":selected").text()
}

function isFileCompleted(id){
    const fileName = $(`input[id=${id}]`).val()
    if(fileName === "")
    {
        const jQueryElem = $(`input[id=${id}]`)

        $('html, body').animate({
            scrollTop: (jQueryElem.offset().top-200)
        }, 100);

        blink(jQueryElem)
        return false
    }
    return true
}









