$('.setting').hide();
sel(2);
$('.set-btn').on('click', function() {
  $('.setting').fadeIn();
});



$('#Set').on('click', function() {
  $('.setting').fadeOut();
});



function format() { var args = Array.prototype.slice.call (arguments, 1); return arguments[0].replace (/\{(\d+)\}/g, function (match, index) { return args[index]; }); }

window.onload = () => {
  setTimeout(function() { 
    $('.load_back').fadeOut();
   }, 300);
}

$(document).on("click", "#Clk", function() {
    var context = $('#Context').val();
    console.log('원래 문장' + context);
    var text = $($(this).children(3)[1]).text();
    text = text.substr(Last_Word.length, text.length);
    console.log(text);
    $('#Context').val(context + text);
    sel(2);
});


function sel(i) {
    $('.server').hide();
    $('.rec').hide();
    $('.load').hide();
    $('.fail').hide();
    $('#Sch').hide();
    switch(i) {
        case 1:
            $('.rec').fadeIn();
            break;
        case 2:
            $('.load').fadeIn();
            break;
        case 3:
            $('.fail').fadeIn();
            break;      
        case 4:
            $('.server').fadeIn();
            break;      
    }
    return;
}


