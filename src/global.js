$(window).scroll(()=>{
    var scroll = $(window).scrollTop();
    if ( scroll > 20) {
        minimizeNavbar()
    }
    else{
        maximizeNavbar()
    }

})


$(document).ready(()=>{
    $("#ndNavbar").append(`<div id="slider"></div>`)
})