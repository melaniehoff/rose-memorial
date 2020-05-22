import React, { Component } from 'react';


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
  }


  render() {
    console.log(this.props)
    const {records} = this.props
    const roses = records.map((x)=>{
      return(
        <div key={x.id} className="station">
          <img src={x.fields.RoseSVG[0].url}/>
          <p>{x.fields.Dedication}</p>
         </div>
       )
      })
    return(
      <div>
      {this.state.rosesHere ? roses : <p>Welcome</p>}
      <button onClick={this.clickHandler} />
      </div>
      );
  }
}
export default RoseWall
