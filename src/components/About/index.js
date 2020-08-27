import React, { Component } from 'react';
import './style.css';
import {VideoEmbed} from '../';

import { BrowserRouter as Router, withRouter } from "react-router-dom";

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
    	<div>
    	The CLOUD9 Memorial Garden is a space for collective remembrance with care, gentleness and respect. Pandemic times limit how we can gather to mourn and remember. During periods of mass loss and isolation, creating intentional spaces to enact and celebrate collective memory is vital.  Our community continues to plant new seeds for all of ours that we have lost in this time, due to state violence, due to Covid and due to the continued systems centered on harming Black people, Indigenous people, brown people, low income people, trans people, undocumented people, and marginalized people. In this garden, eEach flower is unique to its dedication. We invite you to transform personal grief into collective healing, growth and liberation. The  CLOUD9 Memorial Garden is a continuation and extension of CLOUD9 (Collective Love On Ur Desktop) The CLOUD9 Memorial Garden was built by Aarati Akkapeddi, Zainab Aliyu, Melanie Hoff and Chiara Marcial Martínez in collaboration with BUFU (By Us For Us).Flowers made with p5.js
		</div>
    	<nav id='flower-nav' className='medium-text-link'>
         <a href="/" className='medium-text-link'>↩ back to the garden</a>
         </nav>
         </div>
    )
  }
}

export default About
