import React, { Component } from 'react';
import './style.css';
// import zoom from "../../utils/zoom";
let zoomInstance;
class RoseWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rosesHere: false,
      zoomInstance: ''
    };
    this.clickHandler =this.clickHandler.bind(this)
    this.zoomToRose =this.zoomToRose.bind(this)
   }

  clickHandler() {
    var elmnt = document.getElementById("rose-content");
    // window.scroll(400, 400)
      document.getElementById("rose-container").classList.add('on');
      zoomInstance = window.panzoom(document.getElementById("rose-content"),{  
          smoothScroll: false, 
          zoomSpeed: 0.65,   
          maxZoom: 1,
          minZoom: 0.4,
          beforeWheel: function(e) {
            // allow wheel-zoom only if altKey is down. Otherwise - ignore
            var shouldIgnore = !e.altKey;
            return shouldIgnore;
          },
          // beforeMouseDown: function(e) {
          //   // allow mouse-down panning only if altKey is down. Otherwise - ignore
          //   var shouldIgnore = !e.altKey;
          //   return shouldIgnore;
          // }
      })
      this.setState({rosesHere: true})
      document.getElementById("modal-button").style.display = "none";
      
  }
  zoomToRose(el){
    console.log(el)
    var x = document.querySelector("#" + el).offsetLeft;
    var y = document.querySelector("#" + el).offsetTop;

    // window.zoom.to({
    //   element: document.querySelector("#" + el)
    // });
  }

  render() {
    window.scroll(400, 400)
    console.log(this.props)
    const {records} = this.props
    const roses = records.map((x)=>{
      return(

        <div key={x.id} id={x.id} className="station" onClick={() => this.zoomToRose(x.id)}>

        <div className="trim">
          <img src={x.fields.RoseSVG[0].url}/>
          </div>
          <p>{x.fields.Dedication}</p>
          <div className='rose-preview'><p className='small-text'>{x.fields.OptionalNote}</p></div>
         </div>
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

            <button className="medium-text" id="modal-button" onClick={this.clickHandler}> Enter Garden</button>
            </p>
        </div>
      </div>

      }


      </div>
      </div>
      <div id='welcome-garden' className="medium-text"><span>Welcome to the garden.</span><div className='inner'><span>Desktop: Use + - keys to zoom & arrow keys to Pan</span> <br/><span>Mobile: Pinch to Zoom</span></div></div>

      </div>
      );
  }
}
export default RoseWall
