function ripple (p) {
  var outerDiam = 0;
  var x = 200;
  var y = 200;
  let particles = [];
  let stars = []
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    for(let i = 0;i<1;i++){
	    particles.push(new Particle());
	  }
    for(let i = 0;i<50;i++){
      stars.push(new Star());
    }
  }

  p.draw = function (){
   p.background(0,0,0,40);
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    
  }
  for(let i = 0;i<stars.length;i++) {
    stars[i].createParticle();
    stars[i].moveParticle();
    
  }
 
  if(p.frameCount % 300 == 0){
 
  	particles.slice(0,3);

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
class Star {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = p.random(0,p.width);
    this.y = p.random(0,p.height);
    this.r = p.random(1,3);
    this.outerDiam = 0;
    this.xSpeed = 0;
    this.ySpeed = p.random(0,0.2);
    this.rSpeed = 1;
    this.colorSpeed = 0.2;
    this.color = 100
  }

// creation of a particle.
  createParticle() {
    p.fill(255)
    p.circle(this.x,this.y,this.r);
    
  }

// setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > p.width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > p.height)
      this.y=0;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;

    this.color-=this.colorSpeed

    // this.outerDiam = this.outerDiam + 2;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
 
}
  // this class describes the properties of a single particle.
class Particle {
// setting the co-ordinates, radius and the
// speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = p.random(100,p.width - 100);
    this.y = p.random(300,p.height * 2);
    this.r = p.random(1,8);
    this.outerDiam = 0;
    this.xSpeed = p.random(-0.2,0.2);
    this.ySpeed = p.random(-0.2,0.2);
    this.rSpeed = 1;
    this.colorSpeed = 0.2;
    this.color = 100
  }

// creation of a particle.
  createParticle() {
    p.noFill();
    p.stroke(this.color,this.color,this.color, 40);
    p.push();
    p.scale(1,0.3);
    p.circle(this.x,this.y,this.r);
    p.circle(this.x,this.y,this.r + 40);
    p.pop();
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
    this.r+=this.rSpeed;
    this.color-=this.colorSpeed

    // this.outerDiam = this.outerDiam + 2;
  }

// this function creates the connections(lines)
// between particles which are less than a certain distance apart
 
}

};


export default ripple