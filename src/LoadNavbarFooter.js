var actualPage
switch(document.title){
    case "Despre noi":
        actualPage = "index";
        break;
    case "Asociatia de studii francofone DF":
        actualPage = "asociatia";
        break;
    case "Cercetare":
        actualPage = "cercetare";
        break;
    case "Evenimente":
        actualPage = "evenimente";
        break;
    case "Parteneri":
        actualPage = "parteneri";
        break;
    case "Publicatii":
        actualPage = "publicatii";
        break;
    case "Formular propunere contributii":
        actualPage = "propunere";
        break;
    case "Contact":
        actualPage = "contact";
        break;
    case "csf":
        actualPage = "dbobj";
        break;
    case "Credits":
        actualPage = "credits";
        break;
    default:
        actualPage = "what-page-is-this?"
        console.log("document.title switch got on default branch")
        break;
}

$.getJSON(`${actualPage==="index" ? "":"."}./text/${getLocalStorageLang().toUpperCase()}/navbar-footer.json`,function(json){

    json.stNavbar.reverse().forEach((elem)=>{
        $("#stNavbar").prepend(`<a href="${actualPage === "index" ? "pages/"+elem[0] : elem[0]}" class="stNavbarBtn"  
            ${document.title.toLowerCase() === elem[1].toLowerCase() ? "id='activePage'":""}>
    ${elem[1]} </a>`)
    })
    try{
        if(json.ndNavbar[actualPage][0] === "prev"){
            $("#ndNavbar").prepend(`<a onClick="window.history.go(-1);">${json.ndNavbar[actualPage][1]}</a>`);
        }
        else if(json.ndNavbar[actualPage] === "Panel"){
            $("#ndNavbar").prepend(`<a href="./panel.html">Panel</a>`);
        }
        else{
            json.ndNavbar[actualPage].reverse().forEach((elem)=>{
                $("#ndNavbar").prepend(`<a onClick='loadSubpage("${elem[0].substring(1)}")'>${elem[1]}</a>`)
            })
            $("#ndNavbar").append(`<div id="slider"></div>`)
        }
    }
    catch{
        if(actualPage === "credits"){
            //pass;
        }
    }

    const ndNavbar = json.footer

    $(document).ready(()=>{
        $("#footer").append(`
        <div>
            <a href="${actualPage==="index" ? "./":"../" + ndNavbar[0][0]}">${ndNavbar[0][1]}</a>
            <a href="${actualPage==="index" ? "./pages/":"./"}${ndNavbar[1][0]}">${ndNavbar[1][1]}</a>
            <a href="${actualPage==="index" ? "./pages/":"./"}${ndNavbar[2][0]}">${ndNavbar[2][1]}</a>
            <a href="${actualPage==="index" ? "./pages/":"./"}${ndNavbar[3][0]}">${ndNavbar[3][1]}</a>
        </div>
        <div><img src="${actualPage==="index" ? "./":"../"}media/uvtlogo2.png" alt="logo"></div>
        <div>
            <a href="${actualPage==="index" ? "./pages/":"./"}${ndNavbar[4][0]}">${ndNavbar[4][1]}</a>
            <a href="${actualPage==="index" ? "./pages/":"./"}${ndNavbar[5][0]}">${ndNavbar[5][1]}</a>
            <a href="${actualPage==="index" ? "./pages/":"./"}${ndNavbar[6][0]}">${ndNavbar[6][1]}</a>
            <a href="${actualPage==="index" ? "./pages/":"./"}${ndNavbar[7][0]}">${ndNavbar[7][1]}</a>
        </div>
        <p>Revue francophone de litterature contemporaine</p>
    `)
})

})

