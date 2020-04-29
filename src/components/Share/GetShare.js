import React, { Component } from 'react';
// import '../Components.css';
// import './p5/p5.min.js'

class GetShare extends Component {
  constructor(props) {
    super(props);
    this.state = {dedication: '',
                  optional_note:'',
              	  optional_photo:'',
              	  rose_svg:''};
    this.handleDedication = this.handleDedication.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleRose = this.handleRose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDedication(event) {
    this.setState({dedication: event.target.value});
  }

  handleNote(event) {
    this.setState({optional_note: event.target.value});
  }

  handlePhoto(event) {
    this.setState({optional_photo: event.target.value});
  }

  handleRose(event) {
    this.setState({rose_svg: event.target.value});
  }

  handleSubmit(event) {
  	//send info to airtable
  	const {dedication, optional_note, optional_photo, rose_svg} = this.state
  	
  	
    // alert('A name was submitted: ' + this.state.dedication);
    event.preventDefault();
    //submit public to Yes
  }


  render() {
  	const {dedication, optional_note, optional_photo, rose_svg} = this.state; 
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={dedication} onChange={this.handleDedication} />
        </label>

        <label>
          Optional Note:
          <input type="text" value={optional_note} onChange={this.handleNote} />
        </label>

        <label>
          Optional Photo:
          <input type="file" value={optional_photo} onChange={this.handlePhoto} />
        </label>

        <label>
          Rose:
          <input type="text" value={rose_svg} onChange={this.handleRose} />
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }

 }

export default GetShare;