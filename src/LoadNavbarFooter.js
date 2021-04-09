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
    default:
        actualPage = "what-page-is-this?"
        console.log("document.title switch got on default branch")
        break;
}

$.getJSON(`${actualPage==="index" ? "":"."}./text/RO/navbar-footer.json`,function(json){

    json.stNavbar.reverse().forEach((elem)=>{
        $("#stNavbar").prepend(`<a href="${actualPage === "index" ? "pages/"+elem[0] : elem[0]}" class="stNavbarBtn"  
            ${document.title.toLowerCase() === elem[1].toLowerCase() ? "id='activePage'":""}>
    ${elem[1]} </a>`)
    })


    json.ndNavbar[actualPage].reverse().forEach((elem)=>{
        $("#ndNavbar").prepend(`<a onClick='loadSubpage("${elem[0].substring(1)}")'>${elem[1]}</a>`)
    })

    $("#ndNavbar").append(`<div id="slider"></div>`)

//    footer...
})

