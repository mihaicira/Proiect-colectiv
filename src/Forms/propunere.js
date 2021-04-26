
var FILE_UPLOAD;
var limba_articol,rubrica,verificare_documente_trimise,calitate,originalitate,colectare_date,articol_initial,titlu,subtitlu,rezumat;

var limba,cuvinte_cheie,referinte;



function uploadFile(file,nume,prenume){
    const filename = `propunere-${nume.toLowerCase()}-${prenume.toLowerCase()}`;
    var storageRef = firebase.storage().ref('word_file_test/'+ filename);
    storageRef.put(file);
    console.log("Done")
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



$("#formular-container>form").submit(function(e) {
    //prevent page from refreshing
    e.preventDefault();

    /**************VERIFIES*****************/

    limba_articol = getDropdownValue("limba-articol")

    rubrica = getDropdownValue("rubrica")

    verificare_documente_trimise = isCheckCompleted("verificare");
    if(!verificare_documente_trimise) return;

    calitate = isRadioCompleted("calitate")
    if(!calitate) return;

    originalitate = isCheckCompleted("originalitate")
    if(!originalitate) return;

    colectare_date = isCheckCompleted("colectare-date")
    if(!colectare_date) return;

    if(!isFileCompleted("articol-fisier")) return;

    articol_initial = getDropdownValue("Articol initial")

    titlu = isTextCompleted($("#titlu"))
    if(!titlu) return;

    subtitlu = isTextCompleted($("#sub-titlu"))
    if(!subtitlu) return;

    rezumat = isTextCompleted($("#rezumat"))
    if(!rezumat) return;

    limba = isTextCompleted($("#limba-dwn"))
    if(!limba) return;

    cuvinte_cheie = isTextCompleted($("#cuvinte-cheie"))
    if(!cuvinte_cheie) return;

    referinte = isTextCompleted($("#referinte"))
    if(!referinte) return;


    /**************DATABASE PREPARE*****************/

    const realtimeDatabaseForm = {
        limba_articol: limba_articol,
        rubrica: rubrica,
        verificare_documente_trimise: "yes",
        calitate:calitate,
        originalitate: "yes",
        colectare_date: "yes",
        cale_fisier: "test/test",
        titlu:titlu,
        subtitlu:subtitlu,
        rezumat:rezumat,
        limba:limba,
        cuvinte_cheie:cuvinte_cheie,
        referinte:referinte,
        data:new Date().toString()
    }

    /**************DATABASE UPLOAD*****************/

    // uploadFile(FILE_UPLOAD,nume,prenume)

    // var form = {
    //     nume: nume,
    //     prenume: prenume,
    //     varsta: varsta,
    //     gen: gen,
    //     filename: FILE_UPLOAD,
    //     radio: radio,
    //     check: check,
    //     dropdown: dropdown
    // }

    // console.log(form)

    // $("#formular-container").css("animation","1s rotate-form forwards linear")
    // window.scrollTo(0,0);
    // setTimeout(()=>{
    //     $("#formular-container>h2").remove();
    //     $("#formular-container>form").remove();
    // },500)

});



function deleteId(id){
    $("#"+id).remove()

    if(document.querySelector("#persons-table>tr") === null)
        $("#persons-table").css("opacity","0")

}


$("#addPerson").click(()=>{

    const id = generateId();
    const name = $("#fill-person-name").val();
    const contact = $("#fill-person-contact").val();
    const role = $("#fill-person-role").val();

    if(name.trim() === "") return;
    if(contact.trim() === "") return;
    if(role.trim() === "") return;


    $("#persons-table").append(`
      <tr id="${id}">
        <td>${name}</td>
        <td>${contact}</td>
        <td>${role}</td>
        <td><input type="checkbox" name="${id}-check1"></td>
        <td><button onclick="deleteId('${id}')" type="button"></button></td>
      </tr>
    `)

    $("#persons-table").css("opacity","1")

    $("#fill-person-name").val("");
    $("#fill-person-contact").val("");
    $("#fill-person-role").val("");




})

