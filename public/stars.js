function makeDiv(){
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
        'top':posy+'px'
    })

// $newdiv.hide()
$newdiv.appendTo( 'body' );
$newdiv.fadeIn(100, function(){
  $(this).addClass('on')
}).delay(3000).queue(function(next) {
          $(this).removeClass('on')
      }).delay(1000).fadeOut(5000, function(){
    $(this).remove();
})

}

setInterval(function (){
    makeDiv();
    makeDiv();
    makeDiv();
    makeDiv();
    makeDiv();
    makeDiv();
    makeDiv();
    makeDiv();


}, 100);










