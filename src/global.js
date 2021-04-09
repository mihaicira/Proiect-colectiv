
$(window).scroll(()=>{
    var scroll = $(window).scrollTop();
    if ( scroll > 20) {
        minimizeNavbar()
    }
    else{
        maximizeNavbar()
    }
})



$(window).resize(()=>{
    setTimeout(()=>{
        moveSlider(lastVisitedBySlider);
    },250)
})

