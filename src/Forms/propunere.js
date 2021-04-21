
var FILE_UPLOAD;
var nume,prenume,varsta,gen,radio,check,dropdown;


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

//Add onChange listener on file picker
var fileButton = document.getElementById('file-input');
fileButton.addEventListener('change', function (e){
    FILE_UPLOAD = e.target.files[0];
});


function uploadFile(file,nume,prenume){
    const filename = `propunere-${nume.toLowerCase()}-${prenume.toLowerCase()}`;
    var storageRef = firebase.storage().ref('word_file_test/'+ filename);
    storageRef.put(file);
    console.log("Done")
}

function incomplete(){
    alert("incomplete!")
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

        blink(jQueryElem)
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

        blink(jQueryElem)
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



$("#formular-container>form").submit(function(e) {
    //prevent page from refreshing
    e.preventDefault();

    /**************VERIFIES*****************/

    // nume = isTextCompleted($("#formular-propunere-nume"))
    // if(!nume) return;
    //
    // prenume = isTextCompleted($("#formular-propunere-prenume"))
    // if(!prenume) return;
    //
    // varsta = isTextCompleted($("#formular-propunere-varsta"))
    // if(!varsta) return;
    //
    // gen = isTextCompleted($("#formular-propunere-gen"))
    // if(!gen) return;
    //
    // if(!isFileCompleted("file-input")) return;
    //
    // radio = isRadioCompleted("radioexample");
    // if(!radio) return;
    //
    // check = isCheckCompleted("vehicle");
    // if(!check) return;
    //
    // dropdown = getDropdownValue("drops");


    /**************DATABASE UPLOAD*****************/

    // uploadFile(FILE_UPLOAD,nume,prenume)

    var form = {
        nume: nume,
        prenume: prenume,
        varsta: varsta,
        gen: gen,
        filename: calea_catre_fisierul_pus_in_formularul_asta,
        radio: radio,
        check: check,
        dropdown: dropdown
    }

    // console.log(form)

    $("#formular-container").css("animation","1s rotate-form forwards linear")
    window.scrollTo(0,0);
    setTimeout(()=>{
        $("#formular-container>h2").remove();
        $("#formular-container>form").remove();
    },500)



});

