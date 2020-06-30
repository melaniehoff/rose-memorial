import React, { Component } from 'react';
import './style.css';

class VideoEmbed extends Component {

	constructor(props) {
    super(props);
    this.state = {
      rosesHere: false,
    };
    this.videoCheck =this.videoCheck.bind(this)
   }
  videoCheck = (myurl) => {
		if (myurl.includes("vimeo")) {
			const id = myurl.split('/')[myurl.split('/').length - 1];
			return (<iframe src={"https://player.vimeo.com/video/"+ id +"?title=0&byline=0&portrait=0"} width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>)
		}
		else if (myurl.includes("youtube")) {
			const id = myurl.split('=')[1];
			return (<iframe width="560" height="315" src={"https://www.youtube.com/embed/"+id+"?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0"} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>)
		}else{
			return (<p id='broken-video' className='medium-text'>This is a broken video link. Please <a href='mailto:aarati.akkapeddi@gmail.com'>contact us</a> to let us know</p>);
		}
	}
      render() {
    return (
    		<div>{this.videoCheck(this.props.videoUrl)}</div>

    	)
	}
}

export default VideoEmbed