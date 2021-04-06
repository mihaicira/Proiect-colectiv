// console.log("hello")

$(window).scroll(()=>{
    var scroll = $(window).scrollTop();
    if ( scroll > 20) {
        minimizeNavbar()
    }
    else{
        maximizeNavbar()
    }

})