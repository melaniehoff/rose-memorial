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

        <div className="trim">
          <img src={x.fields.RoseSVG[0].url}/>
          </div>
          <p>{x.fields.Dedication}</p>

         </div>
       )
      })
    return(
      <div>
      <div className="rose-container">
        <div className="rose-content">
      {this.state.rosesHere ? roses :


        <div className="info">
          <div className="info-text">
            <p>
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

            <button id="modal-button" onClick={this.clickHandler}> Enter Garden</button>
            </p>
        </div>
      </div>


      }


      </div>
      </div>
      </div>
      );
  }
}
export default RoseWall
