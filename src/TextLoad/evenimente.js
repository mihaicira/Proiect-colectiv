const local_path = "../text/RO/evenimente.json"
$.getJSON(local_path,(json)=>{
    const subpages = Object.keys(json)
    loadSubpage(subpages[0],local_path,subpages)
})
