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

const sayHi = ()=>{
    console.log("Hi");
}

function sayHello(){
    console.log("Hello");
}

const square = (x)=>{
    console.log(x*x);
}

function divideBy2(x){
    console.log(x/2);
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
            HTML = HTML + `<div class="infoHeader">${object[2]}</div>`
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
                        HTML = HTML + `<a class="btn" href="${elem[1]}">${textify(elem[2])}</a>`
                        break;
                    case "sub":
                        HTML = HTML + `<p class="subtitle"><b>${textify(elem[1])}</b></p>`;
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

