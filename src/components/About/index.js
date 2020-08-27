import React, { Component } from 'react';
import './style.css';

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	id : 'hello',
    }
   }


   render() {
    return (
    	<div>
        <div className="info-text">
          <p className="medium-text"> 
            <span>
              The CLOUD9 Memorial Garden is a space for collective remembrance with care, gentleness and respect. Pandemic times limit how we can gather to mourn and remember. During periods of mass loss and isolation, creating intentional spaces to enact and celebrate collective memory is vital. Our community continues to plant new seeds for all of ours that we have lost in this time, due to state violence, due to Covid and due to the continued systems centered on harming Black people, Indigenous people, brown people, low income people, trans people, undocumented people, and marginalized people. In this garden, each flower is unique to its dedication. 
            </span>
            <span>
              We invite you to transform personal grief into collective healing, growth and liberation. The CLOUD9 Memorial Garden is a continuation and extension of <a href="https://cloud9.support/">CLOUD9 (Collective Love on Ur Desktop)</a>. The CLOUD9 Memorial Garden was built by <a href="http://aarati.me/">Aarati Akkapeddi</a>, <a href="https://zai.zone/">Zainab Aliyu</a>, <a href="https://www.melaniehoff.com/">Melanie Hoff</a> and <a href="https://cofuente.io">Chiara Marcial Martínez</a> in collaboration with <a href="http://www.bufubyusforus.com/">BUFU (By Us For Us)</a>. Flowers made with <a href="https://p5js.org/">p5.js</a>
            </span>
          </p>
        </div>
        <nav id='flower-nav' className='medium-text-link'>
         <a href="/" className='medium-text-link'>↩ back to the garden</a>
        </nav>
      </div>
    )
  }
}

export default About
