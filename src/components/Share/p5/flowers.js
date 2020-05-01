/*------------------*/
/*------------------*/
/* FLOWER CODE */
console.log('please')
    const num = 20;
    const num2 = 70;
    const meow1 = Date.now().toString().split('');
    const meow = [];

    for(var x = 0; x < 6; x++){
      var a = parseInt(meow1[x]) + parseInt(meow1[5-x]);
      meow.push(a);
    }

    setup = function () {
      c = createCanvas(400, 400, SVG);
      c.parent('myCanvas')
      angleMode(DEGREES);
      noLoop();
    };

    draw = function () {
      background(240);
      translate(200, 400);
      strokeWeight(3);
      stroke(90,95,90,255);
      branch(0);
      noLoop();
    };

    branch = function(depth){
      var b = map(meow[depth], 0, 18, 2, 4)
      if(depth < b){
         line(0,0,0, -1 * num);
         if(depth % 2 == 0){
           push()
           rotate(15)
           line(0,0,0, -1 * num);
           scale(0.8);
           branchlette(0);
           pop()
         } else {
           push()
           rotate(-15)
           line(0,0,0, -1 * num);
           scale(0.8);
           branchlette(0);
           pop()
         }
         translate(0, -1 * num);
         rotate(random(-5,5));
         branch(depth + 1);      
       } else{
          scale(0.8);
          branchlette(0);
       }
    }
    branchlette = function(depth2){
      
      if(depth2 < random(1)){
        line(0,0,0,-1 * num2);
        fill(0);
        translate(0, -1 * num2);
        scale(0.8);
        push()
        rotate(-15)
        branchlette(depth2 + 1)
        pop()
        push()
        rotate(15)
        branchlette(depth2 + 1)
        pop()
      }else{
          if(random([true,false])){
            line(0,0,0,-1 * num2);
            push()
            scale(0.5);
            if(random([true,false])){
              scale(-1,1);
              rotate(random(180,195));
            } else{
              rotate(-1*random(180,195));
            }
            drawLeaf(300);
            pop()
            translate(0, -1 * num2);
            if(random([true,false])){
              push()
              scale(0.9);
              drawInnerFlorette(30,0);
              fill(255,190,0)
              pop()
              push()
              fill(90,95,90,255)
              noStroke()
              pop()
            }else{
              push()
              scale(1);
              drawInnerFlorette(30,0);
              fill(255,190,0)
              pop()
              push()
              fill(90,95,90,255)
              noStroke()
              pop()
            }
          
          }else{
            push()
            scale(0.5);
            if(random([true,false])){
              scale(-1,1);
              rotate(random(180,195));
            } else{
              rotate(-1*random(180,195));
            }
            drawLeaf(300);
            pop()
          }
           
      }
      
    }

    createBunna = function(x,y){
      var bunna = 60;
      translate(x,y-10);
        for(var j =0;j < 6;j++){      
          stroke(0);
          strokeWeight(0.5);
          rotate(bunna)
          var radius = 30
          fill(255, 235, 245,255);     
          ellipse(19,0, radius,radius/1.5); 
      }
    }


    drawLeaf = function(l){
      stroke(90,95,90,255);
      fill(100,125,100,255);
      beginShape();
      curveVertex(0, 0);
      curveVertex(-5, l/40);
      curveVertex(-10, l/4);
      curveVertex(0, l);
      vertex(10, l/5);
      vertex(0, 0);
      endShape(CLOSE);
    }

    drawInnerFlorette = function(l,depth){
       fill(255)
       rotate(depth/4);
       if(depth < 10){
         var r = l/2
         var d = l/1.5
         line(0,0,0,-1*(d)); 
         push()
         scale(0.3);
         createBunna(-1 * r*2,-1*r*2)
         pop()
         push()
         scale(0.3);
         createBunna(r*2,-1*(d)+r/1.5)
         pop()
         translate(0,-1*(d));
         scale(0.9);
         drawInnerFlorette(l, depth + 1);
        }
    }


  
/* END FLOWER CODE */
/*------------------*/
/*------------------*/