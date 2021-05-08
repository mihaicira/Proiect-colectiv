const URL = window.location.href.split('?')
const tail = URL[URL.length-1]
const objects = tail.split('&')
const query = objects.join("/")




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


    const HTML = `
    <p> Propunere contribuție</p>
    
    <div class="dbobj-pair">
        <span>Autorul articolului</span>
        <span>${dbObj.autor}</span>
    </div>
    
    <div class="dbobj-pair">
        <span>Adresa de email a autorului</span>
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
        <span>Autori</span>
        <span>404 NOT FOUND</span>
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
        
        
    
    `

    // Create a reference to the file we want to download
    var starsRef = firebase.storage().ref("reviste/"+ dbObj.cale_fisier);

// Get the download URL
    starsRef.getDownloadURL()
        .then((url) => {
            console.log(url)
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

    $("#dbobj-container").append(HTML);

    }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

