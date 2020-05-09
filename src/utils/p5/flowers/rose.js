
function rose(p){
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
	  var bunna = 20;
	  p.translate(x,y-10);
	  p.rotate(230)
	  for(var j =0;j < 3;j++){      
        p.noStroke()
        p.rotate(bunna)
        var radius = 30
        let h = 255;
        p.fill(255, 255, 235,200);
        p.ellipse(19,0, radius,radius/2.2); 
	 }   
	}

	p.createFlower = function(x,y){
	  var bunna = 25;
	  p.translate(x,y-10);
	  p.rotate(200)
	  for(var j =0;j < 3;j++){      
        p.noStroke()
        p.rotate(bunna)
        var radius = 30
        let h = 255;
        if(j == 2){
          p.fill(255, 245, 215,200);
          p.ellipse(25,0, radius,radius/1.5); 
        }else if(j==1){
          p.fill(255, 245, 225,200);
          p.ellipse(22,0, radius,radius/2.2);      
        }else{
          p.fill(255, 255, 235,200);
          p.ellipse(19,0, radius,radius/2.2); 
        } 
	   }
	  p.rotate(bunna)
	  p.fill(255, 245, 225,200);
	  p.ellipse(22,0, radius,radius/2.2);
	  p.fill(255, 255, 235,200);
	  p.rotate(bunna)
	  p.ellipse(19,0, radius,radius/2.2); 
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
	        if(p.random([true,false])){
	        	p.push()
	        	p.createBud(0,-2 * num2);
	       		p.fill(255,190,0)
	       		p.pop()
	       		p.push()
	       		p.fill(90,95,90,255)
	       		p.noStroke()
	       		p.ellipse(0, -2 * num2 -10, 5, 5);
	       		p.pop()
	        }else{
	         	p.push()
	       		p.createFlower(0,-2 * num2);
	       		p.fill(255,190,0)
	       		p.pop()
	       		p.push()
	       		p.fill(90,95,90,255)
	       		p.noStroke()
	       		p.ellipse(0, -2 * num2 -10, 5, 5);
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


	p.drawLeaf = function(l){
	  p.stroke(90,95,90,255);
	  p.fill(90,95,90,255);
	  p.beginShape();
	  p.curveVertex(0, 0);
	  p.curveVertex(-5, l/40);
	  p.curveVertex(-10, l/4);
	  p.curveVertex(0, l);
	  p.vertex(10, l/5);
	  p.vertex(0, 0);
	  p.endShape(p.CLOSE);
	}
}

export default rose