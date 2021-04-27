
// Create a reference to the file we want to download
var storageRef = firebase.storage().ref('reviste/df/2021/propunere-mihaicira');

// Get the download URL
storageRef.getDownloadURL()
    .then((url) => {
        document.getElementById("df-panel").insertAdjacentHTML('beforeend',`
        <div class="panel-list-element">
        <p>Mihai Cira</p>
        <p>data de azi</p>
        <a href=${url} target="_blank" >
            <img src="../media/icons/open.png" alt="open">
        </a>
</a>
        
</div>`)
    })
    .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
                // File doesn't exist
                break;
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
                // User canceled the upload
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
        }
    });
