/*
- only functions
- imported on all pages
- Diana & Raluca & Mihai
 */

/*exemple de functii
* sayHi = arrow function
* sayHello = normal function
* square = arrow function (with parameter)
* divideBy2 = normal function (with parameter)*/
/*variabile*/

var currentPath = ""
var currentSubpages = []



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
/*
* pentru testing, apeleaza functiile in consola din browser!
* pentru testing, foloseste doar pagine principala index.html (doar acolo e importat Utils.js momentan)
* */

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
            HTML = HTML + `<div class="infoHeader" id="${object[4]===undefined ? null : object[4]}">${object[2]}</div>`
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
        default:
            console.log("HTMLify error - unknown object [main branch]",object[0]);
            break;
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

        //Se activeaza doar pagina care ne intereseaza
        try{
            var HTML = `<div id="${newPage}" class="subpage">`

            json[newPage].forEach((elem)=>{
                HTML = HTML + HTMLify(elem)
            })

            HTML = HTML + "</div>"

            $("#footer").before(HTML)

            setTimeout(()=>{
                document.getElementById(newPage).style.opacity = "1";
            },json_path===null ? 50:500)

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
