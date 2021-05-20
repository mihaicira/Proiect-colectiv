const URL = window.location.href.split('?')
const tail = URL[URL.length-1]
const objects = tail.split('&')
const query = objects.join("/")

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