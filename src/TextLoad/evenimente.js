$.getJSON("../text/RO/evenimente.json",function(json){
    var HTML = ""
    json.forEach((elem)=>{
        HTML = HTML + HTMLify(elem)
    })
    console.log(HTML)

    $("#footer").before(HTML)
})