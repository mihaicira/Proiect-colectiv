/*variabile globale & functii*/


var currentPath = ""
var currentSubpages = []

var thirdMenuOptions = []
var is3rdMenuActive = false




/*technical*/
var lastVisitedBySlider

/***********************/
function minimizeNavbar(){
    document.getElementById("stNavbar").style.height = "3.5vw";
    document.getElementById("ndNavbar").style.height= "2.5vw";
    document.getElementById("ndNavbar").style.top= "3.5vw";
}

function maximizeNavbar(){
    document.getElementById("stNavbar").style.height = "7vw";
    document.getElementById("ndNavbar").style.height= "3.5vw";
    document.getElementById("ndNavbar").style.top= "7vw";
}

function textify(text){
    var txt = text.trim();
    txt = txt.replace("\n","<br>");
    txt = txt.replace("<link=","<a href=");
    txt = txt.replace("/link>","/a>");
    return txt;
}

function HTMLify(object){
    /*
    * Ia ca parametru un obiect dintr-un fisier json (o lista) si il converteste intr-unul dintre cele trei formaturi de text
    */
    var HTML = ""
    switch(object[0]){
        case "infoBox":
            HTML = `<div class="${object[1] === "right" ? "infoBox right" : "infoBox left"}">`
            const objId = object[2].trim().replaceAll(' ','').toLowerCase()
            thirdMenuOptions.push(["#"+objId,object[2]])
            HTML = HTML + `<div class="infoHeader" id="${is3rdMenuActive === true ? objId: ''}">${object[2]}</div>`
            HTML = HTML + `<div class="infoText">`
            object[3].forEach((elem)=>{
                switch(elem[0]){
                    case "p":
                        HTML = HTML + `<p>${textify(elem[1])}</p>`
                        break;
                    case "pa":
                        HTML = HTML + `<p class="spaced">${textify(elem[1])}</p>`
                        break;
                    case "btn":
                        if(elem[1][0] !== "#")
                            HTML = HTML + `<a class="btn" href="${elem[1]}">${textify(elem[2])}</a>`
                        else
                            HTML = HTML + `<a class="btn" onClick='goToId("${elem[1]}")'>${textify(elem[2])}</a>`
                        break;
                    case "br":
                        HTML = HTML + "<br>"
                        break;
                    case "sub":
                        HTML = HTML + `<p class="subtitle" id="${elem[2] === undefined ? null :elem[2]}"><b>${textify(elem[1])}</b></p>`;
                        break;
                    case "icon-img":
                        HTML = HTML + `<img src="../media/icons/image-icon.png" class="icon" onclick="window.open('${elem[1]}')">`
                        break
                    case "icon-fb":
                        HTML = HTML + `<img src="../media/icons/fb-icon.png" class="icon" onclick="window.open('${elem[1]}')">`
                        break
                    case "icon-book":
                        HTML = HTML + `<img src="../media/icons/book-icon.png" class="icon" onclick="window.open('${elem[1]}')">`
                        break
                    case "icon-website":
                        HTML = HTML + `<img src="../media/icons/website-icon.png" class="icon" onclick="window.open('${elem[1]}')">`
                        break
                    case "img":
                        HTML = HTML + `<img src="${elem[1]}" class="infoPic">`
                        break;
                    case "bookpair":
                        HTML = HTML + `<div class="bookpair"><img src="${elem[1]}"><p>${elem[2]}</p></div>`
                        break;
                    case "uvtmap":
                        HTML = HTML + `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2784.2008373578183!2d21.22942651556692!3d45.74711947910532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d84610655bf%3A0xfd169ff24d29f192!2sUniversitatea%20de%20Vest%20din%20Timi%C8%99oara!5e0!3m2!1sro!2sro!4v1622379103322!5m2!1sro!2sro"  style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
                        break;
                    default:
                        console.log("HTMLify error - unknown object [secondary branch - infoBox] (object: ",elem[0],")")
                        break;
                }
            })
            HTML = HTML + "</div></div>"
            return HTML
        case "newspaper":
            HTML = `<div class="newspaper-container">`
            object.map((obj,i)=>{
                if(i > 0){
                    HTML = HTML + `<div class="newspaper ${obj[1]==="red" ? "red":"blue"}">`
                    HTML = HTML + `<h2>${obj[0]}</h2><hr>`
                    obj.map((elem,index)=>{
                        if(index >=2){
                            switch(elem[0]){
                                case "p":
                                    HTML = HTML + `<p>${textify(elem[1])}</p>`
                                    break;
                                case "pa":
                                    HTML = HTML + `<p class="spaced">${textify(elem[1])}</p>`
                                    break;
                                default:
                                    console.log("HTMLify error - unknown object [secondary branch - newspaper] (object: ",elem[0],")")
                                    break;
                            }
                        }
                    })
                    HTML = HTML + "</div>"
                }
            })
            HTML = HTML + "</div>"
            return HTML
        case "overpage":
            if(object[1] === "Membri"){
                HTML = `<div class="overpage" style="transform: translateY(-5vw)">`
                HTML = HTML + "<div class=\"members-container\">"
                object[2].forEach((obj)=>{
                    HTML = HTML +  `
                        <div class="person">
                            <img src="${obj[0]}">
                            <div class="person-text">
                                <p><a href="${obj[1]}">${obj[2]}</a></p>
                                <p>${obj[3]}</p>
                                <p>${obj[4]}</p>
                            </div>
                        </div>`
                })
                HTML = HTML + `</div>`
            }
            HTML = HTML + "</div>"
            return HTML
        case "big-pic":
            HTML = HTML + `<img src="${object[1]}" class='big-pic'>`
            return HTML
        case "menu":
            try{
                $(".thirdMenu").remove()
            }
            catch{
                //pass
            }
            is3rdMenuActive = true
            thirdMenuOptions = []
            break;
        case "nomenu":
            try{
                $(".thirdMenu").remove()
            }
            catch{
                //pass
            }
            break;
        case "slideshow":
            HTML = HTML + `<div id="slideshow-container">
                                <img src="${object[1][0]}" id="activeImg">
                                <img src="${object[1][1]}">
                                <img src="${object[1][2]}">
                            </div>`
            return HTML;
            console.log("slideshow added")
            break;
        default:
            console.log("HTMLify error - unknown object [main branch]",object[0]);
            return "HTMLify error - unknown object [main branch] (check Console)"
            break;
    }
}

slideshowActual = 1;
function slideshowNext(){
    try{
        const max = document.getElementById("slideshow-container").childElementCount
        const nextPic = slideshowActual === max ? 1 : slideshowActual+1
        document.querySelector(`#slideshow-container>*:nth-of-type(${slideshowActual})`).style.zIndex = "3";
        document.querySelector(`#slideshow-container>*:nth-of-type(${nextPic})`).style.zIndex = "4";
        document.querySelector(`#slideshow-container>*:nth-of-type(${nextPic})`).style.transform="translateX(0)";

        setTimeout(()=>{
            document.querySelector(`#slideshow-container>*:nth-of-type(${slideshowActual})`).style.transform="translateX(250%)";
            slideshowActual = nextPic
        },2000)
    }
    catch{
        return;
    }


}

function moveSlider(object){

    try{
        const width = object.outerWidth();
        const dist = object.offset().left;
        $("#slider").css({
            "width":width.toString(),
            "left": `${dist}px`
        })

        $("#slider").css("width",width.toString())
    }catch {
        return;
    }


}

function loadSubpage(newPage,json_path=null,subpages=null){
    //incarca paginile secundare
    if(json_path === null){
        //daca se apeleaza prin butoanele de pe pagina, atunci se vor lua valorile din memorie
        json_path = currentPath;
        subpages = currentSubpages;
    }
    else{
        //daca se apeleaza prin javascript (prima oara, cand se incarca pagina), atunci se vor popula valorile din memorie pentru urmatoarele incarcari
        currentPath = json_path;
        currentSubpages = subpages;
    }

    var index = subpages.indexOf(newPage)
    index = index + 1


    const sliderGoTo = $(`#ndNavbar >a:nth-child(${index})`)
    lastVisitedBySlider = sliderGoTo
    moveSlider(sliderGoTo)


    $.getJSON(json_path,function(json){
        //Se dezactiveaza toate paginile active
        subpages.forEach((each)=>{
            if(document.getElementById(each))
            {
                document.getElementById(each).style.opacity = "0";
                setTimeout(()=>{
                    document.getElementById(each).remove();
                },500)

            }
        })

        is3rdMenuActive = false

        //Se activeaza doar pagina care ne intereseaza
        try{
            var HTML = `<div id="${newPage}" class="subpage">`

            json[newPage].forEach((elem)=>{
                const pageContent = HTMLify(elem)
                if(pageContent !== undefined)
                    HTML = HTML + pageContent
            })

            if(is3rdMenuActive){
                var rdMenuStr =  "<div class=\"thirdMenu\">"
                thirdMenuOptions.forEach((pair)=>{
                    rdMenuStr = rdMenuStr + `<a href="${pair[0]}"> ${pair[1]} </a>`
                })
                rdMenuStr = rdMenuStr + "</div>"
                $("#footer").before(rdMenuStr);
            }

            HTML = HTML + "</div>"

            $("#footer").before(HTML)

            setTimeout(()=>{
                document.getElementById(newPage).style.opacity = "1";
            },json_path===null ? 550:500)

        }
        catch(error){
            console.log("ERROR: JSON ids dont match")
            console.log("Error: ",error)
        }
    })
        .fail(()=>{
            console.log(`Json error (loadsubpage .fail()), path: ${json_path}`)
        })
}

function getLocalStorageLang(){
    const item = localStorage.getItem("LANG")
    return item ? item.toUpperCase() : null
}

function setLocalStorageItem(value){
    localStorage.setItem("LANG",value)
}

function giveShadowToLang(lang){
    lang = lang.toLowerCase()
    $("#ro").css("border","none");
    $("#en").css("border","none");
    $("#fr").css("border","none");

    setTimeout(()=>{
        $("#"+lang).css("border",".2vw solid white");
    },200)

}

var LANG = getLocalStorageLang()

if(LANG === null){
    setLocalStorageItem("en");
    giveShadowToLang("en")
}
else{
    $(document).ready(()=>{
        giveShadowToLang(LANG)
    })
}

//languages listeners
$(document).ready(()=>{
    $("#ro").click(()=>{
        setLocalStorageItem("ro")
        location.reload();
    })

    $("#en").click(()=>{
        setLocalStorageItem("en")
        location.reload();
    })

    $("#fr").click(()=>{
        setLocalStorageItem("fr")
        location.reload();
    })
})