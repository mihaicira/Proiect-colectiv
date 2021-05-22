
if(window.location.href.includes("?admin")){
    setLocalPower("admin")
    setTimeout(()=>{
        window.location = window.location.href.split("?")[0];
    },200)

}

var ref = firebase.database().ref('reviste/df/2021');
ref.on("value", function(snapshot) {
    const dbObj = snapshot.val();
    for(var key in dbObj){
        const tail = "?reviste&"+dbObj[key].cale_fisier.replace("/","&");
        const query = tail.split('/')[0]+"&"+key
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

$(document).ready(()=>{
    const power = getLocalPower()
    if(["admin","eval"].includes(power))
        $("#myfct").append(power)
    else
        $("#myfct").append("guest")
})
