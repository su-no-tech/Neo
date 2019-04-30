
function move() {
    var elem = document.getElementById("myBar");
    var elem_ball = document.getElementById("myBarBall");
    var width = 0;
    var width_ball = 0;
    var id = setInterval(frame, 20);
    
    
    function frame() {
        if (width >= 45) {
         clearInterval(id);
        } else {
            width++;
            width_ball++;
            elem.style.width = width + '%';

            //elem_ball.style.width = width + '%';
            elem_ball.style.left = elem.style.width + 10 + 'px' ;



        }
    }
   
}
