
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


//Cristiana
$(document).ready(()=>{
    setTimeout(()=>{
        $(".infoBox:nth-of-type(1)").prepend(`
        <div class="thirdMenu">
<!--        scrie aici-->
        </div>
        `)
    },100)

})