import React, { Component } from 'react';



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roses: [],
    };
    this.renderFlowers = this.renderFlowers.bind(this);
   }

   renderFlowers(){
   	const records = [];
   	console.log(this.props)
   	for (var i = this.props.records.length - 1; i >= 0; i--) {
   		records.push(
   		<div key={this.props.records[i].id} className="station">
           <img src={this.props.records[i].fields.RoseSVG[0].url}/>

        </div>
        )
   	}
   	console.log(records)
   	return <div>{records}</div>

   		
   }

   render() {
   	const { roses } = this.state;


    return (
      <div>{this.renderFlowers()}</div>
    );
  }
}

export default Home