$.getJSON("./text/RO/index.json",function(json){
    var HTML = ""
    json.forEach((elem)=>{
        HTML = HTML + HTMLify(elem)
    })


    $("#footer").before(HTML)
})