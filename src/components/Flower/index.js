import React, { Component } from 'react';
import './style.css';
import {VideoEmbed} from '../';
import slugify from 'react-slugify';
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
        console.log(slugify(this.props.records[i].fields.Dedication))
	   		if(slugify(this.props.records[i].fields.Dedication) == this.props.match.params.id.split('_')[0]){
	   			records.push(
		   		 <div key={this.props.records[i].id} id={this.props.records[i].id} className="single-flower" >

		           <div className='flower'>
				        <div className="trim">
				          {!this.props.records[i].fields.RoseSVG ? '' :
				            <img alt={this.props.records[i].fields.Dedication + " Flower"} src={this.props.records[i].fields.RoseSVG[0].url}/>
				          }
				        </div>

			        </div>

              <div id='download-flower' className="medium-text-link">
              {!this.props.records[i].fields.RoseSVG ? '' :
               <a className='medium-text-link' href={this.props.records[i].fields.RoseSVG[0].url} download>download flower</a>
             }
             </div>


              <div className='flower-info-container'>
    			       <div className='flower-info'>
                      <p className='flower-dedication large-text'>{this.props.records[i].fields.Dedication}</p>
                      {!this.props.records[i].fields.OptionalPhoto ? '' :
                      <img alt={this.props.records[i].fields.Dedication + " Photo"} src={this.props.records[i].fields.OptionalPhoto[0].url}/>
                      }
                      <div className='rose-note'><p className='medium-text'>{this.props.records[i].fields.OptionalNote}</p></div>
                      {linkCheck(this.props.records[i].fields)}
                      <br></br>

                      {!this.props.records[i].fields.OptionalVideoLink ? '' :
                      <VideoEmbed videoUrl={this.props.records[i].fields.OptionalVideoLink}/>
                      }
			         </div>
             </div>

		         </div>
		        )
	   		}

	   	}
      records.reverse()
      var x = 0;
      if(this.props.match.params.id.split('_')[1]){
        x =  parseInt(this.props.match.params.id.split('_')[1])
      }
	   	return <div>{records[x]}</div>
   }

   render() {
    return (
    	<div>
    	<div>{this.renderFlower()}</div>
    	<nav id='flower-nav' className='medium-text-link'>
         <a href="/garden" className='medium-text-link'>↩ back to the garden</a>
         </nav>
         </div>
    )
  }
}

export default withRouter(Flower)
