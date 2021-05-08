
var ref = firebase.database().ref('reviste/df/2021');
ref.on("value", function(snapshot) {
    const dbObj = snapshot.val();
    for(var key in dbObj){
        const tail = "?reviste&"+dbObj[key].cale_fisier.replace("/","&");
        const query = tail.split('/')[0]+"&"+key
        console.log(query)
        const date = dbObj[key].data.split(" ")

        document.getElementById("df-panel").insertAdjacentHTML('beforeend',`
        <div class="panel-list-element">
        <p>${dbObj[key].autor}</p>
        <p>${date[2] + " " + date[1] + " " + date[3] + " (" + date[4].substring(0,5) + ")"} </p>
        <a href=${"./dbobj.html" + query} target="_blank" >
            <img src="../media/icons/open.png" alt="open">
        </a>
        </a>
        </div>`)
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
// Get the download URL
// storageRef.getDownloadURL()
//     .then((url) => {
//         document.getElementById("df-panel").insertAdjacentHTML('beforeend',`
//         <div class="panel-list-element">
//         <p>Mihai Cira</p>
//         <p>data de azi</p>
//         <a href=${url} target="_blank" >
//             <img src="../media/icons/open.png" alt="open">
//         </a>
// </a>
//
//
// </div>`)
//     })
//     .catch((error) => {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//             case 'storage/object-not-found':
//                 // File doesn't exist
//                 break;
//             case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                 break;
//             case 'storage/canceled':
//                 // User canceled the upload
//                 break;
//
//             // ...
//
//             case 'storage/unknown':
//                 // Unknown error occurred, inspect the server response
//                 break;
//         }
//     });
