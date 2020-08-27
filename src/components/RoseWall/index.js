import React, { Component } from 'react';
import './style.css';
import cookie from "react-cookies";


class RoseWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rosesHere: false,
      zoomLevel:0
    };
    this.clickHandler =this.clickHandler.bind(this)
   }
   componentDidMount(){
    if(cookie.load('rosesHere') == 'true'){
        this.clickHandler()
    }
   }
  clickHandler() {
    var elmnt = document.getElementById("rose-content");
      document.getElementById("rose-container").classList.add('on');
      document.getElementsByTagName("nav")[0].classList.add('on');
      document.getElementById("welcome-garden").classList.add('on');
      document.getElementById("about-garden").classList.add('on');
      this.setState({rosesHere: true})
      cookie.save('rosesHere', true,{sameSite:true, maxAge: 10}); //ten seconds max before welcome screen will pop up again
      document.getElementById("modal-button").style.display = "none";
      const log = document.getElementById('rose-content');
      document.addEventListener('keypress', logKey);
      function logKey(e) {
        if(`${e.code}` == "Equal"){
           //plus
          if(document.getElementById("rose-container").classList.contains('five')){
            document.getElementById("rose-container").classList.remove('five');
            document.getElementById("rose-container").classList.add('four');
           }else if(document.getElementById("rose-container").classList.contains('four')){
            document.getElementById("rose-container").classList.remove('four');
            document.getElementById("rose-container").classList.add('three');
           }else if(document.getElementById("rose-container").classList.contains('three')){
            document.getElementById("rose-container").classList.remove('three');
            document.getElementById("rose-container").classList.add('two');
           }else if(document.getElementById("rose-container").classList.contains('two')){
            document.getElementById("rose-container").classList.remove('two');
            document.getElementById("rose-container").classList.add('one');
           }else if(document.getElementById("rose-container").classList.contains('one')){
            document.getElementById("rose-container").classList.remove('one');
           }else {

          }
           document.getElementById("rose-container").classList.remove('one');
        }else if(`${e.code}` == "Minus"){
           //minus
           if(document.getElementById("rose-container").classList.contains('one')){
            document.getElementById("rose-container").classList.remove('one');
            document.getElementById("rose-container").classList.add('two');
           }else if(document.getElementById("rose-container").classList.contains('two')){
            document.getElementById("rose-container").classList.remove('two');
            document.getElementById("rose-container").classList.add('three');
           }else if(document.getElementById("rose-container").classList.contains('three')){
            document.getElementById("rose-container").classList.remove('three');
            document.getElementById("rose-container").classList.add('four');
           }else if(document.getElementById("rose-container").classList.contains('four')){
            document.getElementById("rose-container").classList.remove('four');
            document.getElementById("rose-container").classList.add('five');
           }else if(document.getElementById("rose-container").classList.contains('five')){

           }else {
           document.getElementById("rose-container").classList.add('one');
          }
        }
      }
  }


  render() {
    window.scroll(400, 400)
    console.log(this.props)
    const {records} = this.props
    const roses = records.map((x)=>{
      return(

        <a href={'/flower/'+x.id} key={x.id} id={x.id} className="station" >

        <div className="trim">
          {!x.fields.RoseSVG ? '' :
            <img alt={x.fields.Dedication + " Flower"} src={x.fields.RoseSVG[0].url}/>
          }
          </div>
          <p className='dedication-name'>{x.fields.Dedication}</p>
          <div className='rose-preview'><p className='small-text'>{x.fields.OptionalNote}</p></div>
         </a>
       )
      })

    return(
      <div>
      <div id='rose-container' className="rose-container">
        <div id='rose-content' className="rose-content">
        {roses}
      {this.state.rosesHere ? '' :


        <div className="info">



          <div className="info-text">
            <p className="medium-text">
              <span>
              Welcome to the CLOUD9 Memorial Garden, a space for collective remembrance with care, gentleness and respect.
              This time is especially challenging because we are limited in how we can gather to mourn and remember.
              We recognize creating intentional space to grieve and celebrate collective memory as vital   during this period of mass loss and isolation.

              </span>
              <span>
              This is a continuation and extension of <a href="https://cloud9.support/">CLOUD9 (Collective Love on Ur Desktop)</a>, as our community continues to plant new seeds and mourn all
              of Ours that we have lost in this time, due to state violence, due to Covid and due to the continued systems centered on harming Black people,
              Indigenous people, brown people, low income people, trans people, undocumented people, and marginalized people.
              </span>
              <span>
              We invite you to plant seeds of liberation to transform our collective grief.
              </span>

            <button className="medium-text" id="modal-button" onClick={this.clickHandler}><span className='medium-text'> Enter Garden</span></button>
            </p>
        </div>
      </div>

      }


      </div>
      </div>
        <div id='welcome-garden' className="medium-text">
          {/* <span>Welcome to the garden.</span> */}
            <div className='small-text'>
              <span>desktop: use + - keys to zoom & arrow keys to pan</span> <br/>
              <span>mobile: pinch to zoom</span>
            </div>
        </div>

        <div id='garden-creds' className="medium-text">
          {/* <span>Welcome to the garden.</span> */}
            <div className='small-text'>

            </div>
        </div>

        <div id='about-garden' className="medium-text-link">
           <a className="medium-text-link" href="/about">about this garden</a>
          </div>


      </div>
      );
  }
}
export default RoseWall
