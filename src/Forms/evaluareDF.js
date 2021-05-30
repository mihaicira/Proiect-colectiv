const URL = window.location.href.split('?')
const tail = URL[1]
const objects = tail.split('&')
const query = objects.join("/")

var ADNOT_FILE;
var ADNOT_FILE_PATH = null;

var PASS = false;

var EVALS;

var MailDetails = {}

PASS = URL[2] ? verifyIdentity(URL[2]) : verifyIdentity(getLocalPower())

if(window.location.href.includes("?eval")){
    setLocalPower("eval")
    setTimeout(()=>{
        window.location = URL[0] + "?" + URL[1]
    },200)
}
var DATABASE_FORM = null

if(PASS === "admin" || PASS == "eval"){
    var ref = firebase.database().ref(query);
    ref.on("value", function(snapshot) {
        const dbObj = snapshot.val()
        DATABASE_FORM = dbObj

        EVALS = dbObj.evaluari

        MailDetails["nume"] = dbObj.autor;
        MailDetails["data_prop"] = dbObj.data;
        MailDetails["link"] = window.location.href.replace("evaluareDF","dbobj") + "?admin"
        MailDetails["status"] = dbObj.evaluari === "none" ? "1/2" : "2/2"

        const filename_temp = dbObj.cale_fisier.split("propunere");
        ADNOT_FILE_PATH = filename_temp[0] + "evaluare" + (dbObj.evaluari === "none" ? "-1" : "-2") + filename_temp[1]
        try{
            $("#autocomplete-rezumat").append(dbObj.rezumat);

            var propunereRef = firebase.storage().ref("reviste/"+ dbObj.cale_fisier);
            propunereRef.getDownloadURL()
                .then((url) => {
                    $("#autocomplete-propunere").html(`<span><a href="${url}" target="__blank" style="color: black">click</a></span>`)
                })
                .catch((error) => {
                    $("#autocomplete-propunere").html(`<span>Error: ${error.code}</span>`)
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

$("#formular-container>form").submit(function(e) {
    e.preventDefault()

    /*****VERIFIES*****/
    var ANSWERS = []
    if(true){
        ANSWERS.push(isRadioCompleted("arie_comepetenta"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("conformitate_titlu"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("completitudine_rezumat"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("cuv_cheie_adecvate"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("originalitate"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("actualitate"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("coerenta"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("redactare"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("structura"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("obiective"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("fundamente"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("cercetare"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("rezultate"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("concluzii"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        ANSWERS.push(isRadioCompleted("referinte"))
        if(ANSWERS[ANSWERS.length-1] === false) return

        const comentarii = isTextCompleted($("#comentarii"));
        if(!comentarii) return;
        ANSWERS.push(comentarii)

        if(!isFileCompleted("adnot-fisier")) return;

        ANSWERS.push(getDropdownValue("recomandari"))
    }

    ANSWERS.push(ADNOT_FILE_PATH)

    const optionalText = MailDetails.status === "2/2" ? "Ambele evaluări au fost efectuate!":"Mai este necesară o evaluare.";

    const template = {
        nume_autor: MailDetails.nume,
        data_prop: MailDetails.data_prop,
        data_eval: new Date().toString(),
        link_propunere: MailDetails.link,
        status: MailDetails.status,
        optional_text:optionalText
    }

    //Trimitere email de confirmare
    sendEvalEmail(template)

    //Salvare fisier in Firebase
    uploadFile(ADNOT_FILE,ADNOT_FILE_PATH)

    //Salvare evaluare in Firebase
    sendEvalToDb(ANSWERS,EVALS)



    $("#formular-container").css("animation","1s rotate-form forwards linear")
    window.scrollTo(0,0);
    setTimeout(()=>{
        $("#formular-container>h2").remove();
        $("#formular-container>form").remove();
    },500)
})

function sendEvalToDb(answers,eval){

    if(eval === "none")
        DATABASE_FORM.evaluari = [answers];
    else{
        DATABASE_FORM.evaluari.push(answers)
    }

    var updates = {}
    const dbRef = window.location.href.split("?")[1].replaceAll("&","/")
    updates[dbRef] = DATABASE_FORM;
    firebase.database().ref().update(updates);
}

document.getElementById('adnot-fisier').addEventListener('change', function (e){
    const extension = e.target.files[0].name.split(".")[1]
    if(["docx","doc"].includes(extension))
        ADNOT_FILE = e.target.files[0];
    else{
        $("#adnot-fisier").val('')
        alert("Files must have .doc / .docx extension")
    }

});