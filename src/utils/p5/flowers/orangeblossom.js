
function orangeBlossom(p){
	var num = 10;
	var num2 = 10;
	var currentTimeStamp = Date.now().toString().split('');
	var timeArray = [];
	var green = [p.random(100,145),p.random(140,150),p.random(70,95),255];
	for(var x = 0; x < 6; x++){
	  var a = parseInt(currentTimeStamp[x]) + parseInt(currentTimeStamp[5-x]);
	  timeArray.push(a);
	}



	p.branch = function(depth){
	  var b = p.map(timeArray[depth], 0, 18, 2, 5)
	  if(depth < b){
	     p.line(0,0,0, -1 * num);
	     if(depth % 2 === 0){
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

	p.createBud = function(x,y){
	  var tempAngle = 20;
	  p.translate(x,y-10);
	  p.rotate(230)
	  for(var j =0;j < 3;j++){      
        p.noStroke()
        p.rotate(tempAngle)
        var radius = 20
        p.fill(255, 234, 233,200);
        p.ellipse(10,0, radius,radius/1.5); 
	  }     
	}


	p.createFlower = function(x,y){
	  var tempAngle = 60;
	  p.translate(x,y-10);
	  for(var j =0;j < 6;j++){      
        p.stroke(0);
        p.strokeWeight(0.1);
        p.rotate(tempAngle)
        var radius = 20;
        p.fill(255, 234, 233,200);
        p.ellipse(10,0, radius,radius/1.5);  
	  }
	}




	p.branchlette = function(depth2){
	  if(depth2 < p.random(5)){
	    p.line(0,0,0,-2 * num2);
	    p.fill(0);
	    p.translate(0, -2 * num2);
	    p.scale(0.9);
	    p.push()
	    p.rotate(-1 * p.random(10,45))
	    p.branchlette(depth2 + 1)
	    p.pop()
	    p.push()
	    p.rotate(p.random(10,45))
	    p.branchlette(depth2 + 1)
	    p.pop()
	  }else{
	    p.line(0,0,0,-1 * num2);
	    if(p.random([true,false])){
	      if(p.random([true,false])){
	        p.push()
	        p.createBud(0,-1 * num2);
	        p.fill(255,190,0)
	        p.pop()
	        p.push()
	        p.fill(145,137,71,255)
	        p.noStroke()
	        p.ellipse(0, -1 * num2 -5, 5, 5);
	        p.pop()
	       }else{
	         p.push()
		     p.createFlower(0,-1 * num2);
		     p.fill(255,190,0)
		     p.pop()
		     p.push()
		     p.fill("#F2B512")
		     p.noStroke()
		     p.ellipse(0, -1 * num2 -10, 8, 8);
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
	  p.rotate(-130);
	  for(var d = 0;d < 5; d ++){
	    p.line(0,0,0,-10);
	    if(d === 2){
	      p.drawLeaf(-80);
	    }else if(d === 1 || d === 3){
	      p.drawLeaf(-70);
	    }else{
	      p.drawLeaf(-50);
	    }
	      p.rotate(65); 
	   

	  }
	  p.pop()

	}


	p.drawLeaf = function(l){
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
	  p.line(0,0,0, -5 * num);
	  p.translate(0,-5 * num); 
	  p.branch(0);
      p.pop();
}


export default orangeBlossom