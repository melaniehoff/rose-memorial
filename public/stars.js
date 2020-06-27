
setInterval(function makeDiv(){
    var divsize = ((Math.random()*2) + 1).toFixed();
    var color = ((Math.random()*255) + 100).toFixed();
    $newdiv = $('<div/>').css({
        'width':divsize+'px',
        'height':divsize+'px',
        'background-color': "rgba(" + color +"," +color +","+color+",1)"
    });
    $newdiv.addClass('star');
    var posx = (Math.random() * ($(window).width() - divsize)).toFixed();
    var posy = (Math.random() * ($(window).height() - divsize)).toFixed();
    
    $newdiv.css({
        'position':'fixed',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
    }).appendTo( 'body' ).fadeIn(1000).delay(1000).fadeOut(1000, function(){
       $(this).remove();
       
    }); 
}, 100);










