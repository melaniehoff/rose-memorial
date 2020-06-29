import React, { Component } from 'react';
import './style.css';

import { BrowserRouter as Router, withRouter } from "react-router-dom";

// TODO convert this class to a pure function, w/o local state, its not necessary to be a class
class Flower extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	id : 'hello',
    }
   }
	renderFlower(){
			const linkCheck = (fieldsOnRecord) => {
				const { OptionalLink } = fieldsOnRecord
				if (!OptionalLink) return ('')
				else {
					const prefix = OptionalLink.slice(3)
					if (prefix !== 'http') return (<a className='medium-text' href={`https://${OptionalLink}`}>{OptionalLink}</a>) 
					else return (<a className='medium-text' href={OptionalLink}>{OptionalLink}</a>)
				}
			}
	   	const records = [];
	   	for (var i = this.props.records.length - 1; i >= 0; i--) {
	   		if(this.props.records[i].id == this.props.match.params.id){
	   			records.push(
		   		 <div key={this.props.records[i].id} id={this.props.records[i].id} className="single-flower" >
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
			         {linkCheck(this.props.records[i].fields)}
			         </div>
		         </div>
		        )
	   		}
	   		
	   	}
	   	return <div>{records}</div>
   }

   render() {
    return (
    	<div>
    	<div>{this.renderFlower()}</div>
    	<nav id='flower-nav' className='medium-text'>
         <a href="/">↩ back to the garden</a>
         </nav>
         </div>
    )
  }
}

export default withRouter(Flower)