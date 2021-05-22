const URL = window.location.href.split('?')
const tail = URL[1]
const objects = tail.split('&')
const query = objects.join("/")

var PASS = false;

PASS = URL[2] ? verifyIdentity(URL[2]) : verifyIdentity(getLocalPower())

if(PASS === "admin" || PASS == "eval"){
    var ref = firebase.database().ref(query);
    ref.on("value", function(snapshot) {
        const dbObj = snapshot.val()
        try{
            $("#autocomplete-rezumat").append(dbObj.rezumat)
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
