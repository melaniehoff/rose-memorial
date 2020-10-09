import React, { Component } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import cookie from "react-cookies";
import slugify from 'react-slugify';

class Garden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rosesHere: true,
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
    const roses = records.map((x, i)=>{
      var url = slugify(x.fields.Dedication)
      var flowerArray = [];
      console.log(i)
      for (var j = 0; j <= i; j++) {
        if(slugify(records[j].fields.Dedication) == slugify(x.fields.Dedication) && records[j].id != x.id){
          flowerArray.push(records[j])
        }
      }
      if(flowerArray.length > 0){
        url = slugify(x.fields.Dedication) + "_" + flowerArray.length;
      }
      if(!x.fields.Private){
      return(

        <a href={'/flower/'+url} key={x.id} id={x.id} className="station" >

        <div className="trim">
          {!x.fields.RoseSVG ? '' :
            <img alt={x.fields.Dedication + " Flower"} src={x.fields.RoseSVG[0].url}/>
          }
          </div>
          <p className='dedication-name'>{x.fields.Dedication}</p>
          <div className='rose-preview'><p className='small-text'>{x.fields.OptionalNote}</p></div>
         </a>
       )
    }
      })

    return(

      <div>
      <div id='rose-container' className="rose-container on">
        <div id='rose-content' className="rose-content">
        {roses}
      {this.state.rosesHere ? '' :


''

      }


      </div>
      </div>
        <div id='welcome-garden' className="medium-text on">
          {/* <span>Welcome to the garden.</span> */}
            <div className='small-text'>
              <span>desktop: use + - keys to zoom & arrow keys to pan</span> <br/>
              <span>mobile: pinch to zoom</span>
            </div>
        </div>
        <div id='about-garden' className="medium-text-link on">
           <a className="medium-text-link" href="/about">about this garden</a>
          </div>
          <nav className='medium-text-link on' id='share'>
          <Link className='medium-text-link' to="/share">share your dedication</Link>
          </nav>




      </div>

      );
  }
}
export default Garden