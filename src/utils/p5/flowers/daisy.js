

function daisy(p) {
	var num = 40;
	var num2 = 50;
	const currentTimeStamp = Date.now().toString().split('');
  	const timeArray = [];
  	var green = [p.random(100,145),p.random(140,150),p.random(70,95),255];

	for(var x = 0; x < 6; x++){
	  var a = parseInt(currentTimeStamp[x]) + parseInt(currentTimeStamp[5-x]);
	  timeArray.push(a);
	}




	p.branch = function(depth){
	  var b = p.map(timeArray[depth], 0, 18, 1, 3)
	  if(depth < b){  
	     p.line(0,0,0, -1 * num);
	     if(depth % 2 === 0){
	       p.push()
	       p.rotate(p.random(45))
	       p.line(0,0,0, -1 * num);
	       p.scale(0.8);
	       p.branchlette(0);
	       p.pop()
	     } else {
	       p.push()
	       p.rotate(-1 * p.random(45))
	       p.line(0,0,0, -1 * num);
	       p.scale(0.8);
	       p.branchlette(0);
	       p.pop()
	     }
	     p.translate(0, -1 * num);  
	     p.rotate(p.random(-5,5));
	     p.branch(depth + 1);
	   
	   } else{
   			p.scale(0.7);
     		p.line(0,0,0,-1 * num2);
        	p.push()
         	p.push()
       		p.createFlower(0,-1 * num2);
       		p.fill(255,190,0)
       		p.pop()
       		p.push()
       		p.fill(90,95,90,255)
       		p.stroke(0)
       		p.strokeWeight(1)
       		p.ellipse(0, -1 * num2 -10, 12, 12);
      		p.createRings(0,-1 * num2);
       		p.pop()
          	p.pop()
	   }

	}

	p.createBud = function(x,y){
	  var tempAngle = 20;
	  p.translate(x,y-10);
	  p.rotate(230)
	  for(var j =0;j < 3;j++){      
	    p.noStroke()
	    p.rotate(tempAngle)
	    var radius = 30
	    p.fill(255, 255, 235,200);      
	    p.ellipse(19,0, radius,radius/2.2); 	 
	  } 
	}
	
	p.createFlower = function(x,y){
	  var tempAngle = 18;
	  p.translate(x,y-10);
	    for(var j =0;j < 20;j++){      
	      p.noStroke()
	      p.rotate(tempAngle)
	      var radius = 30
	      p.fill(255, 255, 235,200);  
	      p.ellipse(19,0, radius,radius/2.8); 
	      p.stroke(0);
	      p.strokeWeight(0.2);
	      p.ellipse(10,0, 2,2);        
	 	}
	      
	}

	p.createRings = function(x,y){
	  var tempAngle = 36;
	  p.translate(x,y-10);
	  for(var j =0;j < 10;j++){      
        p.rotate(tempAngle)
        p.stroke(0);
        p.fill(0)
        p.strokeWeight(0.5);
        p.ellipse(10,0, 2,2);        
	 }
	}


	p.branchlette = function(depth2){	  
	  if(depth2 < p.random(1)){
	    if(p.random(1) < 0.5){
	     p.push()
	     p.scale(0.7);
	     if(p.random([true,false])){
	        p.scale(-1,1);
	        p.rotate(p.random(25,45));
	     } else{
	        p.rotate(-1*p.random(25,45));
	     }
	        p.drawLeaf(150);
	        p.pop()
	    }
	    p.line(0,0,0,-1 * num2);
	    p.fill(0);
	    p.translate(0, -1 * num2);
	    p.scale(0.8);
	    p.push()
	    p.rotate(-15)
	    p.branchlette(depth2 + 1)
	    p.pop()
	    p.push()
	    p.rotate(15)
	    p.branchlette(depth2 + 1)
	    p.pop()

	  }else{
	      if(p.random([true,false])){
	        p.line(0,0,0,-2 * num2);
	        p.push()
	        p.push() 
	       	p.createFlower(0,-2 * num2);
	       	p.fill(255,190,0)
	        p.pop()
	        p.push()
	        p.fill(90,95,90,255)
	        p.stroke(0)
	        p.strokeWeight(1)
	        p.ellipse(0, -2 * num2 -10, 12, 12);
	        p.createRings(0,-2 * num2);
	        p.pop()
	        p.pop()
	      } else{ 
	        p.push()
	        p.scale(1);
	        if(p.random([true,false])){
	          p.scale(-1,1);
	          p.rotate(p.random(45));
	        } else{
	          p.rotate(-1*p.random(45));
	        }
	        p.drawLeaf(150);
	        p.pop()
	      }
	       
	  }
	  
	}


	p.drawLeaf = function(l){
	  
	  p.stroke(green[0]-10,green[1]-10,green[2]-10,green[3]);
	  p.strokeWeight(2);
	  p.fill(green[0],green[1],green[2],green[3]);
	  p.beginShape();
	  p.vertex(0, 0);
	  p.vertex(-15, -l/6);
	  p.vertex(-8, -l/6);
	  p.vertex(-15, -l/4);
	  p.vertex(-7, -l/4);
	  p.vertex(-15, -l/3);
	  p.vertex(-5, -l/3);
	  p.vertex(-10, -l/2.3);
	  p.vertex(-3, -l/2.3);
	  p.vertex(-5, -l/1.9);
	  p.vertex(-2, -l/1.9);
	  p.vertex(0, -l/1.5);
	  p.vertex(2, -l/1.9);
	  p.vertex(5, -l/1.9);
	  p.vertex(3, -l/2.3);
	  p.vertex(10, -l/2.3);
	  p.vertex(5, -l/3);
	  p.vertex(15, -l/3);
	  p.vertex(7, -l/4);
	  p.vertex(15, -l/4);
	  p.vertex(8, -l/6);
	  p.vertex(15, -l/6);
	  p.vertex(0, 0);
	  p.endShape(p.CLOSE);

	}
 	  
 	  p.push()
	  p.translate(p.width/2, p.height);
	  p.strokeWeight(5);
	  p.stroke(green[0],green[1],green[2],green[3]);
	  p.branch(0);
	  p.pop()

}

export default daisy