const URL = window.location.href.split('?')
const tail = URL[1]
const objects = tail.split('&')
const query = objects.join("/")

var PASS = false;

PASS = URL[2] ? verifyIdentity(URL[2]) : verifyIdentity(getLocalPower())

if(window.location.href.includes("?eval")){
    setLocalPower("eval")
    setTimeout(()=>{
        window.location = URL[0] + "?" + URL[1]
    },200)
}

if(PASS === "admin" || PASS == "eval"){
    var ref = firebase.database().ref(query);
    ref.on("value", function(snapshot) {
        const dbObj = snapshot.val()
        try{
            $("#autocomplete-rezumat").append(dbObj.rezumat);

            var propunereRef = firebase.storage().ref("reviste/"+ dbObj.cale_fisier);
            propunereRef.getDownloadURL()
                .then((url) => {
                    document.getElementById("autocomplete-propunere").insertAdjacentHTML('beforeend',`<span><a href="${url}" target="__blank" style="color: black">click</a></span>`)
                })
                .catch((error) => {
                    document.getElementById("autocomplete-propunere").insertAdjacentHTML('beforeend',`<span>Error: ${error.code}</span>`)
                });

            var notaRef = firebase.storage().ref("reviste/"+ dbObj.cale_nota);
            notaRef.getDownloadURL()
                .then((url) => {
                    document.getElementById("autocomplete-nota").insertAdjacentHTML('beforeend',`<span><a href="${url}" target="__blank" style="color: black">click</a></span>`)
                })
                .catch((error) => {
                    document.getElementById("autocomplete-nota").insertAdjacentHTML('beforeend',`<span>Error: ${error.code}</span>`)
                });
        }
        catch{
            $("#formular-container").html(`<p style="text-align: center; font-size: 3rem;">404 not found. Wrong URL.</p>`)
        }

    },function(errorObject){
        console.log("The read failed: " + errorObject.code);
    });
}
else{
    $("#formular-container").html("<h2>You are not allowed to evaluate.</h2>");
}
