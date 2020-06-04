
function jasmine(p){
	var num = 30;
	var num2 = 50;
	var currentTimeStamp = Date.now().toString().split('');
	var timeArray = [];
	var green = [p.random(100,145),p.random(140,150),p.random(70,95),255];
	for(var x = 0; x < 6; x++){
	  var a = parseInt(currentTimeStamp[x]) + parseInt(currentTimeStamp[5-x]);
	  timeArray.push(a);
	}

	p.branch = function(depth){
	  var b = p.map(timeArray[depth], 0, 18, 2, 4)
	  if(depth < b){
	     p.line(0,0,0, -1 * num);
	     if(depth % 2 === 0){
	       p.push()
	       p.rotate(45)
	       p.line(0,0,0, -1 * num);
	       p.scale(0.8);
	       p.branchlette(0);
	       p.pop()
	     } else {
	       p.push()
	       p.rotate(-45)
	       p.line(0,0,0, -1 * num);
	       p.scale(0.8);
	       p.branchlette(0);
	       p.pop()
	     }
	     p.translate(0, -1 * num);
	     p.rotate(p.random(-5,5).toFixed(2));
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
        var radius = 30;
        p.fill(255, 255, 255,200);
        p.ellipse(19,0, radius,radius/2.2); 
	 }    
	}

	p.createFlower = function(x,y){
	  var tempAngle = 60;
	  p.translate(x,y-10);
	  for(var j =0;j < 6;j++){      
	    p.stroke(0);
	    p.strokeWeight(0.5);
	    p.rotate(tempAngle)
	    var radius = 30;
	    p.fill(255, 255, 255,200); 
	    p.ellipse(19,0, radius,radius/2.2); 
	 }
	      
	}

	p.branchlette = function(depth2){
	  if(depth2 < p.random(3).toFixed(2)){
	    p.line(0,0,0,-1 * num2);
	    p.fill(0);
	    p.translate(0, -1 * num2);
	    p.scale(0.8);
	    p.push()
	    p.rotate(-20)
	    p.branchlette(depth2 + 1)
	    p.pop()
	    p.push()
	    p.rotate(20)
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
	       	p.fill(green[0],green[1],green[2],green[3]);
	       	p.noStroke()
	       	p.ellipse(0, -1 * num2 -10, 5, 5);
	       	p.pop()
	      }else{
	        p.push()
	       	p.createFlower(0,-1 * num2);
	       	p.fill(255,190,0)
	       	p.pop()
	       	p.push()
	       	p.fill(green[0],green[1],green[2],green[3]);
	       	p.noStroke()
	       	p.ellipse(0, -1 * num2 -10, 5, 5);
	       	p.pop()
	      }
	      
	    }else{
	      p.push()
	      p.scale(0.5);
	      if(p.random([true,false])){
	          p.scale(-1,1);
	          p.rotate(45);
	        } else{
	          p.rotate(-45);
	        }
	       p.drawFlorette(60,0);
	       p.pop()
	      }
	       
	  }
	  
	}

	p.drawFlorette = function(l, depth3){
	  p.stroke(green[0],green[1],green[2],green[3]);
	  p.fill(green[0],green[1],green[2],green[3]);
	  var b = p.map(parseInt(timeArray[depth3]), 0, 9, 0, 5)
	   p.rotate(depth3 * b)
	   if(depth3 < 10){
	     const r = l/4
	     const d = l/1.5
	     p.line(0,0,0,-1*(d)); 
	     p.line(0,0,-1 * r * 2,-1*(d)+r); 
	     p.push()
	     p.translate(-1 * r * 2,-1*(d)+r)
	     p.rotate(45)
	     p.ellipse(0,0,r*3.5,r);
	     p.pop()
	     p.push()
	     p.scale(0.6)
	     p.line(0,0,r*2,-1*(d)+r); 
	     p.push()
	     p.translate(r*2,-1*(d)+r)
	     p.rotate(-45)
	     p.ellipse(0,0,r*3.5,r);
	     p.pop()
	     p.pop()
	     depth3 = depth3 + 1;
	     p.translate(0,-1*(d));
	     p.scale(0.85)
	     p.drawFlorette(l, depth3);
	   }
	  
	}
	  p.push();
	  p.translate(200, 400);
	  p.strokeWeight(3);
	  p.stroke(green[0],green[1],green[2],green[3]);
	  p.branch(0);
	  p.pop();
}

export default jasmine