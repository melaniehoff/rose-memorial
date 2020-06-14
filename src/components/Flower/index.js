import React, { Component } from 'react';
import './style.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Flower extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	id : 'hello',
    };
    // this.renderFlower = this.renderFlower.bind(this);
   }
	renderFlower(){
	   	const records = [];
	   	console.log(this.props)
	   	for (var i = this.props.records.length - 1; i >= 0; i--) {
	   		console.log(this.props.records[i].id)
	   		if(this.props.records[i].id == this.props.match.params.id){
	   			records.push(
		   		 <div key={this.props.records[i].id} id={this.props.records[i].id} className="single-flower" onClick={() => this.zoomToRose(this.props.records[i].id)}>
		           <div className='flower'>
				        <div className="trim">
				          {!this.props.records[i].fields.RoseSVG ? '' :
				            <img src={this.props.records[i].fields.RoseSVG[0].url}/>
				          }
				        </div>
			        </div>
			        <div className='flower-info'>
			         <p className='flower-dedication large-text'>{this.props.records[i].fields.Dedication}</p>
			         {!this.props.records[i].fields.OptionalPhoto ? '' :
				            <img src={this.props.records[i].fields.OptionalPhoto[0].url}/>
				          }
			         <div className='rose-note'><p className='medium-text'>{this.props.records[i].fields.OptionalNote}</p></div>
			         {!this.props.records[i].fields.OptionalLink ? '' :
				            <a className='medium-text' href={this.props.records[i].fields.OptionalLink }>{this.props.records[i].fields.OptionalLink}</a>
				          }
			         </div>
		         </div>
		        )
	   		}
	   		
	   	}
	   	console.log(records)
	   	return <div>{records}</div>
   }

   render() {
   	// this.renderFlower()
   	// console.log(this.props.match.params.id)


    return (
    	<div>{this.renderFlower()}</div>

    );
  }
}

export default withRouter(Flower)