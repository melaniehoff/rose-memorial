function ripple (p) {
  var outerDiam = 0;
  var x = 200;
  var y = 200;
  let particles = [];
  let stars = []
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    for(let i = 0;i<100;i++){
	    particles.push(new Particle());
	  }

  }

  p.draw = function (){
   p.background(0);
   if(stars[0]){
   	stars[0].createParticle();
  	stars[0].moveParticle();
   }
  
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    
  }
  // if(p.frameCount % 200 == 0){
  // 	stars.slice(0,1);
  // 	stars.push(new ShootingStar());

  // }
 
  if(p.frameCount % 20 == 0){
 
  	particles.slice(0,10);

	particles.push(new Particle());
	particles.push(new Particle());
	particles.push(new Particle());
	particles.push(new Particle());
	particles.push(new Particle());
	particles.push(new Particle());
	particles.push(new Particle());
	particles.push(new Particle());
	particles.push(new Particle());
	particles.push(new Particle());


  }
   //  for (var i = 0; i < 5; i++){

	  //   var diam = outerDiam - 30 * i;  
     
	  //   if (diam > 0){
	      
	  //     var fade = p.map(diam, 0, p.width, 148, 0);
		 //  p.stroke(fade);
	  //     p.noFill();

	  //     p.ellipse(x, y, diam);
	  //   }
	  // }
	  // outerDiam = outerDiam + 2;
  }

  // this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = p.random(0,p.width);
    this.y = p.random(0,p.height);
    this.r = p.random(1,5);
    this.outerDiam = 0;
    this.xSpeed = p.random(-0.2,0.2);
    this.ySpeed = p.random(-0.2,0.2);
    this.rSpeed = 1;
    this.colorSpeed = 0.2;
    this.red = p.random(120,255);
    this.blue = p.random(120,255);
    this.green = p.random(200,255);
    this.color = 0
    this.fading = false;
  }

// creation of a particle.
  createParticle() {
    p.noStroke();
    p.fill(255,this.green,255,this.color);
    p.circle(this.x,this.y,this.r);
    // p.circle(this.x,this.y,this.r - 4);
	  
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > p.width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > p.height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    if(this.color>200 && this.fading == false){
    	 this.fading = true;
    	 console.log(this.fading)
    	 this.color-=this.colorSpeed
    	
    }else if(this.fading == false){
		this.color+=this.colorSpeed
	}else{
		this.color-=this.colorSpeed
	}


    // this.outerDiam = this.outerDiam + 2;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
 
}

// class ShootingStar {
// // setting the co-ordinates, radius and the
// // speed of a particle in both the co-ordinates axes.
//   constructor(){
//     this.x = p.random(0,p.width);
//     this.y = p.random(0,p.height);
//     this.r = p.random(1,5);
//     this.outerDiam = 0;
//     this.xSpeed = p.random(-20,20);
//     this.ySpeed = p.random(-20,20);
//     this.rSpeed = 1;
//     this.colorSpeed = 1;
//     this.red = p.random(120,255);
//     this.blue = p.random(120,255);
//     this.green = p.random(200,255);
//     this.color = 255
//     this.fading = false;
//   }

// // creation of a particle.
//   createParticle() {
//     p.noStroke();
//     p.fill(255,this.green,255,this.color);
//     p.circle(this.x,this.y,this.r);
//     // p.circle(this.x,this.y,this.r - 4);
	  
//   }

// // setting the particle in motion.
//   moveParticle() {
    
//     this.x+=this.xSpeed;
//     this.y+=this.ySpeed;
  


//     // this.outerDiam = this.outerDiam + 2;
//   }

// // this function creates the connections(lines)
// // between particles which are less than a certain distance apart
 
// }

};


export default ripple