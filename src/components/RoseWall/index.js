import React, { Component } from 'react';
import './style.css';
import cookie from "react-cookies";
import slugify from 'react-slugify';

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
    if(cookie.load('rosesHere') == ''){
        this.clickHandler()
    }
   }
  clickHandler() {
    var elmnt = document.getElementById("rose-content");
      document.getElementById("rose-container").classList.add('on');
      const makeVisible0 = document.getElementsByClassName("hidden")[0]
      const makeVisible1 = document.getElementsByClassName("hidden")[1]
      const makeVisible2 = document.getElementsByClassName("hidden")[2]
      makeVisible0.classList.remove('hidden')
      makeVisible1.classList.remove('hidden')
      makeVisible2.classList.remove('hidden')
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
          if(document.getElementById("rose-container").classList.contains('eight')){
            document.getElementById("rose-container").classList.remove('eight');
            document.getElementById("rose-container").classList.add('seven');
           }else if(document.getElementById("rose-container").classList.contains('seven')){
            document.getElementById("rose-container").classList.remove('seven');
            document.getElementById("rose-container").classList.add('six');
           }else if(document.getElementById("rose-container").classList.contains('six')){
            document.getElementById("rose-container").classList.remove('six');
            document.getElementById("rose-container").classList.add('five');
           }else if(document.getElementById("rose-container").classList.contains('five')){
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
            document.getElementById("rose-container").classList.remove('five');
            document.getElementById("rose-container").classList.add('six');
           }else if(document.getElementById("rose-container").classList.contains('six')){
            document.getElementById("rose-container").classList.remove('six');
            document.getElementById("rose-container").classList.add('seven');
           }else if(document.getElementById("rose-container").classList.contains('seven')){
            document.getElementById("rose-container").classList.remove('seven');
            document.getElementById("rose-container").classList.add('eight');
           }else if(document.getElementById("rose-container").classList.contains('eight')){

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
    const roses = records.map((x, i)=>{
       var url = ""
      if(x.fields.Dedication){
        url = slugify(x.fields.Dedication)
      }else if(x.fields.DedicationPlace){
        url = slugify(x.fields.DedicationPlace)
      } else if(x.fields.DedicationThing){
        url = slugify(x.fields.DedicationThing)
      }

      var flowerArray = [];
      var type = "dedication-person";
      if(x.fields.DedicationPlace){
        type = "dedication-place";
      }else if(x.fields.DedicationThing){
        type ="dedication-thing";
      }
      var dedication = ""
      if(type == "dedication-thing"){
        dedication = x.fields.DedicationThing;
      }else if(type == "dedication-place"){
        dedication = x.fields.DedicationPlace
      }else if(type == "dedication-person"){
        dedication = x.fields.Dedication
      }
      console.log(i)
      for (var j = 0; j <= i; j++) {
        if (type == "dedication-person"){
          if(slugify(records[j].fields.Dedication) == slugify(x.fields.Dedication) && records[j].id != x.id){
            flowerArray.push(records[j])
          }
        }else if (type == "dedication-thing"){
          if(slugify(records[j].fields.DedicationThing) == slugify(x.fields.DedicationThing) && records[j].id != x.id){
            flowerArray.push(records[j])
          }
        }else if (type == "dedication-place"){
          if(slugify(records[j].fields.DedicationPlace) == slugify(x.fields.DedicationPlace) && records[j].id != x.id){
            flowerArray.push(records[j])
          }
        }

      }
      if(flowerArray.length > 0){
        url = slugify(x.fields.Dedication || x.fields.DedicationThing || x.fields.DedicationPlace) + "_" + flowerArray.length;
      }
      if(!x.fields.Private){


      return(


        <a href={'/flower/'+url} key={x.id} id={x.id} className="station" >

        <div className="trim">
          {!x.fields.RoseSVG ? '' :
            <img alt={x.fields.Dedication + " Flower"} src={x.fields.RoseSVG[0].url}/>
          }
          </div>
          <p className={type + ' dedication-name'}>{dedication}</p>
          <div className='rose-preview'><p className='small-text'>{x.fields.OptionalLocation}</p></div>
         </a>
       )}
      })

    return(
      <div>
      <div id='rose-container' className="rose-container three parent">
        <div id='rose-content' className="rose-content child">
        {roses}



      </div>
      {this.state.rosesHere ? '' :


        <div className="info">

          <div className="info-text">
            <p className="medium-text">
              <span>
              Welcome to the CLOUD9 Memorial Garden, a space for collective remembrance with care, gentleness and respect. Pandemic times limit how we can gather to mourn and remember. During periods of mass loss and isolation, creating intentional spaces to enact and celebrate collective memory is vital. Our community continues to plant new seeds for all of ours that we have lost in this time, due to state violence, due to Covid and due to the continued systems centered on harming Black people, Indigenous people, brown people, low income people, trans people, undocumented people, and marginalized people. We invite you to transform personal grief into collective healing, growth and liberation.
              </span>
              {/* <span className="subtitle">
              This garden is a continuation and extension of <a href="https://cloud9.support/">CLOUD9 (Collective Love On Ur Desktop)</a>
              </span> */}

            <button className="medium-text" id="modal-button" onClick={this.clickHandler}><span className='medium-text-link'> enter garden</span></button>
            </p>
        </div>
      </div>

      }
      </div>
        <div id='welcome-garden' className="medium-text hidden">
          {/* <span>Welcome to the garden.</span> */}
          <div className='tiny-text'>
            <span>
              {/* desktop:  */}
              use + - keys to zoom & arrow keys to pan</span> <br/>
            {/* <span>mobile: pinch to zoom</span> */}
          </div>
        </div>
        <div id='about-garden' className="medium-text-link hidden">
           <a className="medium-text-link" href="/about">about this garden</a>
          </div>
      </div>
      );
  }
}
export default RoseWall
