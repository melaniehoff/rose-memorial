function fourpetalflower(p){
	var num = 20;
	var num2 = 20;
	var green = [p.random(100,145),p.random(140,150),p.random(70,95),255];
	const currentTimeStamp = Date.now().toString().split('');
  	const timeArray = [];

	for(var x = 0; x < 6; x++){
	  var a = parseInt(currentTimeStamp[x]) + parseInt(currentTimeStamp[5-x]);
	  timeArray.push(a);
	}



	p.branch = function(depth){
	  var b = p.map(timeArray[depth], 0, 18, 2, 10)
	  
	   if(depth < b){
	     
	     p.line(0,0,0, -1 * num);
	     if(depth % 2 == 0){
	       p.push()
	       p.rotate(65)
	       p.line(0,0,0, -1 * num);
	       p.scale(0.8);
	       p.branchlette(0);
	       p.pop()
	     } else {
	       p.push()
	       p.rotate(-65)
	       p.line(0,0,0, -1 * num);
	       p.scale(0.8);
	       p.branchlette(0);
	 
	       p.pop()
	     }
	     p.translate(0, -1 * num);
	     
	     p.rotate(p.random(-5,5));
	     p.branch(depth + 1);
	   
	   } else{
	      p.scale(0.8);
	      p.branchlette(0);
	   }

	}



	p.createFlower = function(x,y){
	  var myAngle = 95;
	  p.translate(x,y-10);
      for(var j =0;j < 4;j++){      
        p.stroke(0);
        p.strokeWeight(0.1);
        p.rotate(myAngle)
        var radius = 20
        p.fill(255, 234, 233,200);   
        p.ellipse(10,0, radius,radius/1.2); 
	 }      
	}
	




	p.branchlette = function(depth2){  if(depth2 < p.random(6)){
	    p.line(0,0,0,-1 * num2);
	    p.fill(0);
	    p.translate(0, -1 * num2);
	    p.scale(0.8);
	    p.push()
	    p.rotate(-1 * p.random(30,50))
	    p.branchlette(depth2 + 1)
	    p.pop()
	    p.push()
	    p.rotate(p.random(30,50))
	    p.branchlette(depth2 + 1)
	    p.pop()

	  }else{
	      p.line(0,0,0,-1 * num2);
	      if(p.random([true,false])){
	        if(p.random([true,false])){
	         p.push()
	       p.createFlower(0,-1 * num2);
	       p.fill(255,190,0)
	       p.pop()
	       p.push()
	       p.fill(145,137,71,255)
	       p.noStroke()
	       p.ellipse(0, -1 * num2 -10, 5, 5);
	       p.pop()
	        }else{
	         p.push()
	       p.createFlower(0,-1 * num2);
	       p.fill(255,190,0)
	       p.pop()
	       p.push()
	       p.fill(145,137,71,255)
	       p.noStroke()
	       p.ellipse(0, -1 * num2 -10, 5, 5);
	       p.pop()
	        }
	      
	      }else{
	        p.push()
	        p.translate(0, -1 * num2);
	        p.scale(0.5);
	        p.drawFlorette();
	        p.pop()
	      }
	       
	  }
  
	}
p.drawFlorette = function(){
  p.push()
  p.stroke(green[0],green[1],green[2],green[3]);
  p.fill(green[0],green[1],green[2],green[3]);
  p.rotate(0);
  for(var d = 0;d < 1; d ++){  
    p.line(0,0,0,-10);
    if(d == 2){
      p.drawLeaf(-80);
     }else if(d == 1 || d == 3){
      p.drawLeaf(-70);
    }else{
       p.drawLeaf(-50);
    }
      p.rotate(65); 
  }
  p.pop()

}


		
	p.drawLeaf = function(l){
	  p.scale(2,1)
	  p.beginShape();
	  p.curveVertex(0, -10);
	  p.curveVertex(l/15, l/10 - 10);
	  p.vertex(0, l);
	  p.curveVertex(l * -1 / 15, l/5 - 10);
	  p.vertex(0, -10);
	  p.endShape(p.CLOSE);
	}




      p.push();
	  p.translate(200, 400);
	  p.strokeWeight(3);
	  p.stroke(green[0],green[1],green[2],green[3]);
	  p.line(0,0,0, -2 * num);
	  p.translate(0,-2 * num); 
	  p.branch(0);
      p.pop();
}

export default fourpetalflower