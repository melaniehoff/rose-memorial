function daffodil(p){
	var num = 20;
	var num2 = 70;
	var currentTimeStamp = Date.now().toString().split('');
	var timeArray = [];

	for(var x = 0; x < 6; x++){
	  var a = parseInt(currentTimeStamp[x]) + parseInt(currentTimeStamp[5-x]);
	  timeArray.push(a);
	}


	p.setup = function() {
	  p.createCanvas(400, 400);
	  p.angleMode(p.DEGREES);
	  p.noLoop();
	}

	p.draw = function() {
	  p.background(0);
	  p.translate(200, 400);
	  p.strokeWeight(5);
	  p.stroke(90,95,90,255);
	  p.branch(0);
	  p.noLoop();
	  const canvas = document.getElementsByTagName("canvas")[0];
      const dataURL = canvas.toDataURL({pixelRatio: 2}).toString(); //there should be a better way to transfer this over to the getshare
      canvas.setAttribute("data-uri", dataURL.toString());
	}



	p.branch = function(depth){
	  var b = p.map(timeArray[depth], 0, 18, 2, 4)
	  if(depth < b){  
	     p.line(0,0,0, -1 * num);
	     if(depth % 2 == 0){
	       p.push()
	       p.rotate(15)
	       p.line(0,0,0, -1 * num);
	       p.scale(0.8);
	       p.branchlette(0);
	       p.pop()
	     } else {
	       p.push()
	       p.rotate(-15)
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
	    var radius = 30
	    p.fill(255, 255, 235,200);      
	    p.ellipse(19,0, radius,radius/2.2); 
	 }     
	}


	p.branchlette = function(depth2){
	  if(depth2 < p.random(1)){
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
	        p.translate(0, -2 * num2);
	        if(p.random([true,false])){
	          p.push()
	          p.scale(0.6);
	       	  p.drawFlorette(30,0);
	       	  p.fill(255,190,0)
	       	  p.pop()
	       	  p.push()
	       	  p.fill(90,95,90,255)
	       	  p.noStroke()
	       	  p.pop()
	        }else{
	          p.push()
	          p.scale(0.5);
	       	  p.drawFlorette(30,0);
	       	  p.fill(255,190,0)
	       	  p.pop()
	       	  p.push()
	       	  p.fill(90,95,90,255)
	       	  p.noStroke()
	          p.pop()
	        }
	      }else{
	        p.push()
	        p.scale(0.5);
	        if(p.random([true,false])){
	          p.scale(-1,1);
	          p.rotate(p.random(180,195));
	        } else{
	          p.rotate(-1 * p.random(180,195));
	        }
	        p.drawLeaf(300);
	        p.pop()
	      }
	       
	  }
	  
	}

	p.drawFlorette = function(){
	  p.push()
	  p.stroke(255,255,255);
	  p.fill(255,255,255);
	  p.rotate(-145);
	  for(var d = 0;d < 5; d ++){
	    if(d == 2){
	      p.drawPetal(-80);
	     }else if(d == 1 || d == 3){
	      p.drawPetal(-70);
	    }else{
	      p.drawPetal(-60);
	    }
	      p.rotate(72); 
	  }
	  p.pop()
	  p.push()
	  p.rotate(-30)
	  p.createFlower(0,0)
	  p.pop()
	  p.push()
	  p.stroke(0)
	  p.strokeWeight(0.5)
	  p.line(0,0,0,-40);
	  p.fill(0)
	  p.ellipse(0,-40,2,10);
	  p.rotate(15)
	  p.line(0,0,0,-35);
	  p.fill(0)
	  p.ellipse(0,-35,2,10);
	  p.rotate(-30)
	  p.line(0,0,0,-35);
	  p.fill(0)
	  p.ellipse(0,-35,2,10);
	  p.pop()
	}

	p.drawInnerFlorette = function(){
	  p.push()
	  p.scale(0.5);
	  p.stroke(255,255,205);
	  p.fill(255,245,205);
	  p.rotate(-145);
	  for(var d = 0;d < 5; d ++){
	    p.line(0,0,0,-10);
	    if(d == 2){
	      p.drawPetal(-80);
	     }else if(d == 1 || d == 3){
	      p.drawPetal(-70);
	    }else{
	      p.drawPetal(-60);
	    }
	    p.rotate(72); 
	  }
	  p.pop()
	}

	p.drawPetal = function(l){
	  p.noStroke()
	  p.beginShape();
	  p.curveVertex(0, 0);
	  p.curveVertex(l/5, l/10 - 10);
	  p.vertex(0, l);
	  p.curveVertex(l * -1 / 5, l/5 - 10);
	  p.vertex(0, 0);
	  p.endShape(p.CLOSE);
	}

	p.drawLeaf = function(l){
	  p.stroke(90,95,90,255);
	  p.fill(100,125,100,255);
	  p.beginShape();
	  p.curveVertex(0, 0);
	  p.curveVertex(-5, l/40);
	  p.curveVertex(-10, l/4);
	  p.curveVertex(0, l);
	  p.vertex(10, l/5);
	  p.vertex(0, 0);
	  p.endShape(p.CLOSE);
	}

	p.createFlower = function(x,y){
	  var tempAngle = 60;
	  p.translate(x,y-10);
	  for(var j =0;j < 6;j++){      
        p.stroke(0);
        p.strokeWeight(0.2);
        p.rotate(tempAngle)
        var radius = 50
        p.fill(255, 255, 235,240);
        p.ellipse(25,0, radius,radius/1.5); 
	 }     
	}
}
export default daffodil