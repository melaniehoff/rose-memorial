

function daisy(p) {
	var num = 40;
	var num2 = 50;
	var meow1 = Date.now().toString().split('');
	var meow = [];

	for(var x = 0; x < 6; x++){
	  var a = parseInt(meow1[x]) + parseInt(meow1[5-x]);
	  meow.push(a);
	}


	p.setup = function() {
	  p.createCanvas(400, 400);
	  p.angleMode(p.DEGREES);
	  p.noLoop();
	}

	p.draw = function() {
	  p.translate(p.width/2, p.height);
	  p.strokeWeight(5);
	  p.stroke(90,95,90,255);
	  p.branch(0);
	  p.noLoop();
	  const canvas = document.getElementsByTagName("canvas")[0];
	  const dataURL = canvas.toDataURL({pixelRatio: 2}).toString(); //there should be a better way to transfer this over to the getshare
	  canvas.setAttribute("data-uri", dataURL.toString());
	}



	p.branch = function(depth){
	  var b = p.map(meow[depth], 0, 18, 1, 3)
	  
	   if(depth < b){
	     
	     p.line(0,0,0, -1 * num);
	     if(depth % 2 == 0){
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
	    p.fill(255, 255, 235,200);      
	    p.ellipse(19,0, radius,radius/2.2); 	 
	  }
	      
	}
	p.createBunna = function(x,y){
	  var bunna = 18;
	  p.translate(x,y-10);
	    for(var j =0;j < 20;j++){      
	      p.noStroke()
	      p.rotate(bunna)
	      var radius = 30
	      p.fill(255, 255, 235,200);  
	      p.ellipse(19,0, radius,radius/2.8); 
	      p.stroke(0);
	      p.strokeWeight(0.2);
	      p.ellipse(10,0, 2,2);        
	 	}
	      
	}

	p.createRings = function(x,y){
	  var bunna = 36;
	  p.translate(x,y-10);
	  for(var j =0;j < 10;j++){      
        p.rotate(bunna)
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
	       	p.createBunna(0,-2 * num2);
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
	  
	  p.stroke(90,95,90,200);
	  p.strokeWeight(2);
	  p.fill(100,115,100,230);
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


}

export default daisy