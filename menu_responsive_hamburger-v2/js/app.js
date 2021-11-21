$(document).ready(inici);

function inici() {

$(".submenu").click(function(){
    $(this).children("ul").slideToggle();
});


$("ul").click(function(x){
    x.stopPropagation();
});


}

