const actualURL = window.location.href.split('?')
const tail = actualURL[1]
const objects = tail.split('&')
const query = objects.join("/")

var PASS = null;

PASS = actualURL[2] ? verifyIdentity(actualURL[2]) : verifyIdentity(getLocalPower())

if(window.location.href.includes("?admin")){
    setLocalPower("admin")
    setTimeout(()=>{
        window.location = actualURL[0] + "?" + actualURL[1]
    },200)
}


if(PASS === "admin"){
    var ref = firebase.database().ref(query);
    ref.on("value", function(snapshot) {

        const dbObj = snapshot.val();

        var autoriHTML = ""
        try{
            dbObj.autori.forEach((autor)=>{
                autoriHTML +=`
            <br>
            &emsp;&emsp;
            ${autor[0]}
            &emsp;
            <a href="mailto:${autor[1]}">${autor[1]}</a>
            &emsp;
            (${autor[2]})
            `
            })
        }
        catch{
            autoriHTML = "N/A"
        }

        const evalURL = window.location.href.replace("dbobj","evaluareDF") + "?eval"

        var HTML = `
    <p> Propunere contribuție</p>
    
    <div class="dbobj-pair">
        <span>Autorul articolului</span>
        <span>${dbObj.autor}</span>
    </div>
    
    <div class="dbobj-pair">
        <span>Toti autorii (nume, email, rol)</span>
        <span>${autoriHTML}</span>
    </div>
    
    <div class="dbobj-pair">
        <span>Limba în care este scris articolul</span>
        <span>${dbObj.limba_articol}</span>
    </div>

    
    <div class="dbobj-pair">
        <span>Rubrica</span>
        <span>${dbObj.rubrica}</span>
    </div>
    
    <div class="dbobj-pair">
        <span>Calitatea celui care face propunerea</span>
        <span>${dbObj.calitate}</span>
    </div>
    
    <div class="dbobj-pair" id="articol-link">
        <span>Articolul propus</span>
    </div>
    
    <div class="dbobj-pair" id="nota-bio">
        <span>Nota biobibliografica</span>
    </div>
    
  
   <p>Metadate</p>
    
   <div class="dbobj-pair">
        <span>Articol inițial</span>
        <span>${dbObj.articol_initial}</span>
    </div>
    
     <div class="dbobj-pair">
        <span>Titlu</span>
        <span>${dbObj.titlu}</span>
    </div>
    
     <div class="dbobj-pair">
        <span>Sub-titlu</span>
        <span>${dbObj.subtitlu}</span>
    </div>
    
     <div class="dbobj-pair">
        <span>Rezumat</span>
        <span>${dbObj.rezumat}</span>
    </div>
    
    <div class="dbobj-pair">
        <span>Limba</span>
        <span>${dbObj.limba}</span>
    </div>
    
    <div class="dbobj-pair">
        <span>Cuvinte cheie</span>
        <span>${dbObj.cuvinte_cheie}</span>
    </div>
    
    <div class="dbobj-pair">
        <span>Referințe bibliografice</span>
        <span>${dbObj.referinte}</span>
    </div>
    
    <p>Date evaluare</p>
    
     <div class="dbobj-pair">
        <span>Link evaluare</span>
        <p style="font-size: .8rem;">${evalURL}</p>
    </div>
    <p>Evaluarea 1</p>`
/**********************************************************BREAK EVAL 1**/
    var eval1 = "<div class='dbobj-pair'>In asteptare...</div>";

    try{
        console.log(dbObj)
        if(dbObj.evaluari !== "none")
            eval1 = `
    <div class="dbobj-pair XS">
        <span>Articolul supus evaluării corespunde ariei dumneavoastră de competență?</span>
        <span>${dbObj.evaluari[0][0]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Este titlul articolului clar, informativ și conform propunerii pe care o anunță?</span>
        <span>${dbObj.evaluari[0][1]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Rezumatul poate fi considerat complet?</span>
        <span>${dbObj.evaluari[0][2]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Cuvintele cheie sunt adecvate propunerii de articol?</span>
        <span>${dbObj.evaluari[0][3]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Originalitatea conținutului?</span>
        <span>${dbObj.evaluari[0][4]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Actualitatea și relevanța cercetării relatate în acest articol?</span>
        <span>${dbObj.evaluari[0][5]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Coerența și argumentația</span>
        <span>${dbObj.evaluari[0][6]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Limba și calitatea redactării</span>
        <span>${dbObj.evaluari[0][7]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Structura, planul și organizarea textului</span>
        <span>${dbObj.evaluari[0][8]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Claritatea obiectivelor expuse</span>
        <span>${dbObj.evaluari[0][9]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Fundamentele teoretice</span>
        <span>${dbObj.evaluari[0][10]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Metoda de cercetare utilizată</span>
        <span>${dbObj.evaluari[0][11]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Rezultatele cercetării sunt corelate cu obiectivele acesteia</span>
        <span>${dbObj.evaluari[0][12]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Concluziile reflectă demersul cercetării</span>
        <span>${dbObj.evaluari[0][13]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Referințele bibliografice sunt structurate în conformitate cu importanța lor în cercetare: surse primare, surse secundare (exegeze), corpus etc.</span>
        <span>${dbObj.evaluari[0][14]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Comentarii </span>
        <span>${dbObj.evaluari[0][15]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Recomandări </span>
        <span>${dbObj.evaluari[0][16]}</span>
    </div>

    <div class="dbobj-pair XS">
        <span>Link fișier (cu adnotări) </span>
        <span id="adnot-file-autocomplete-1"></span>
    </div>`
        /**********************************************************BREAK EVAL 2**/

        var eval2 = "<p>Evaluarea 2</p><div class='dbobj-pair'>In asteptare...</div>";

        if(dbObj.evaluari !== "none")
            if(dbObj.evaluari.length === 2)
                eval2 = `
<p>Evaluarea 2</p>
    <div class="dbobj-pair XS">
        <span>Articolul supus evaluării corespunde ariei dumneavoastră de competență?</span>
        <span>${dbObj.evaluari[1][0]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Este titlul articolului clar, informativ și conform propunerii pe care o anunță?</span>
        <span>${dbObj.evaluari[1][1]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Rezumatul poate fi considerat complet?</span>
        <span>${dbObj.evaluari[1][2]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Cuvintele cheie sunt adecvate propunerii de articol?</span>
        <span>${dbObj.evaluari[1][3]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Originalitatea conținutului?</span>
        <span>${dbObj.evaluari[1][4]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Actualitatea și relevanța cercetării relatate în acest articol?</span>
        <span>${dbObj.evaluari[1][5]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Coerența și argumentația</span>
        <span>${dbObj.evaluari[1][6]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Limba și calitatea redactării</span>
        <span>${dbObj.evaluari[1][7]}</span>
    </div>
    
    <div class="dbobj-pair XS">
        <span>Structura, planul și organizarea textului</span>
        <span>${dbObj.evaluari[1][8]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Claritatea obiectivelor expuse</span>
        <span>${dbObj.evaluari[1][9]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Fundamentele teoretice</span>
        <span>${dbObj.evaluari[1][10]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Metoda de cercetare utilizată</span>
        <span>${dbObj.evaluari[1][11]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Rezultatele cercetării sunt corelate cu obiectivele acesteia</span>
        <span>${dbObj.evaluari[1][12]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Concluziile reflectă demersul cercetării</span>
        <span>${dbObj.evaluari[1][13]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Referințele bibliografice sunt structurate în conformitate cu importanța lor în cercetare: surse primare, surse secundare (exegeze), corpus etc.</span>
        <span>${dbObj.evaluari[1][14]}</span>
    </div>
    
      <div class="dbobj-pair XS">
        <span>Comentarii</span>
        <span>${dbObj.evaluari[1][15]}</span>
    </div>
    
     <div class="dbobj-pair XS">
        <span>Recomandări </span>
        <span>${dbObj.evaluari[1][16]}</span>
    </div>
    
<div class="dbobj-pair XS">
        <span>Link fișier (cu adnotări) </span>
        <span id="adnot-file-autocomplete-2"></span>
    </div>
    `

        HTML = HTML + eval1 + eval2;
    }
    catch{
        HTML = HTML  + "<p>Error</p>"
    }


        // Create a reference to the file we want to download
        var starsRef = firebase.storage().ref("reviste/"+ dbObj.cale_fisier);

        // Get the download URL
        starsRef.getDownloadURL()
            .then((url) => {
                document.getElementById("articol-link").insertAdjacentHTML('beforeend',`<span><a href="${url}" target="__blank">click</a></span>`)
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        alert("File not found. Something is wrong, please contact the developers. If possible, don't close this page.")
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        alert("Permission error. Something is wrong, please contact the developers. If possible, don't close this page.")
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        alert("Unknown error ocurred. Something is wrong, please contact the developers. If possible, don't close this page.")
                        break;
                }
            });

        // Acelasi lucru, pentru nota biobibliografica
        var notaRef = firebase.storage().ref("reviste/"+ dbObj.cale_nota);
        notaRef.getDownloadURL()
            .then((url) => {
                document.getElementById("nota-bio").insertAdjacentHTML('beforeend',`<span><a href="${url}" target="__blank">click</a></span>`)
            })
            .catch((error) => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        alert("File not found. Something is wrong, please contact the developers. If possible, don't close this page.")
                        break;
                    case 'storage/unauthorized':
                        alert("Permission error. Something is wrong, please contact the developers. If possible, don't close this page.")
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        alert("Unknown error ocurred. Something is wrong, please contact the developers. If possible, don't close this page.")
                        break;
                }
            });
        //Acelasi lucru, pentru fisierul cu adnotari aferente evaluarilor
        if(dbObj.evaluari[0]){
            var adnotFileEval1Ref = firebase.storage().ref("reviste/"+ dbObj.evaluari[0][17])
            adnotFileEval1Ref.getDownloadURL()
                .then((url)=>{
                    if(document.getElementById("adnot-file-autocomplete-1"))
                        document.getElementById("adnot-file-autocomplete-1").insertAdjacentHTML('beforeend',`<a href="${url}" target="__blank">${url}</a>`)
                })
        }

        if(dbObj.evaluari[1]) {
            var adnotFileEval2Ref = firebase.storage().ref("reviste/" + dbObj.evaluari[1][17])
            adnotFileEval2Ref.getDownloadURL()
                .then((url) => {
                    if (document.getElementById("adnot-file-autocomplete-2"))
                        document.getElementById("adnot-file-autocomplete-2").insertAdjacentHTML('beforeend', `<a href="${url}" target="__blank">${url}</a>`)
                })
        }

        $("#dbobj-container").append(HTML);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}
else{
    $("#dbobj-container>h1").text("You are not allowed to see this document.")
}

