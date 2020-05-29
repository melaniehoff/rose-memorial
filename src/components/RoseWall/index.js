import React, { Component } from 'react';
import './style.css';


class RoseWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rosesHere: false
    };
    this.clickHandler =this.clickHandler.bind(this)
   }

  clickHandler() {
    this.setState({rosesHere: true})
    document.getElementById("modal-button").style.display = "none";
  }


  render() {
    console.log(this.props)
    const {records} = this.props
    const roses = records.map((x)=>{
      return(

        <div key={x.id} className="station">
          <p>{x.fields.Dedication}</p>
        <div className="trim">
          <img src={x.fields.RoseSVG[0].url}/>
          </div>

         </div>
       )
      })
    return(
      <div>
      <div className="rose-container">
        <div className="rose-content">
      {this.state.rosesHere ? roses :
        <p>Welcome</p>

      }
      <button id="modal-button" onClick={this.clickHandler}/>
      </div>
      </div>
      </div>
      );
  }
}
export default RoseWall
