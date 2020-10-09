import React, { Component } from "react";
import Airtable from "airtable";
import request from "superagent";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../../utils/p5/sketch";
import './style.css';
import {VideoEmbed} from '../';
import slugify from 'react-slugify';
const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base("appZuPErukOoOExF9");

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dedication: "",
      optional_note: "",
      optional_photo: "",
      optional_link: "",
      optional_location: "",
      optional_video_link: "",
      toggle_video: false,
      rose_id: "",
      formHere: false,
    };
    this.handleDedication = this.handleDedication.bind(this);
    this.handleLink = this.handleLink.bind(this);
    this.handleVideoLink = this.handleVideoLink.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.checkUploadResult = this.checkUploadResult.bind(this);
    this.showWidget = this.showWidget.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandler =this.clickHandler.bind(this)
  }
  clickHandler() {
      document.getElementById('submission').classList.add('show');
      this.setState({formHere: true})
      document.getElementById("modal-button").style.display = "none";
  }
  handleDedication(event) {
    this.setState({ dedication: event.target.value });
  }
  handleLink(event) {
    this.setState({ optional_link: event.target.value });
  }
  handleLink(event) {
    this.setState({ optional_location: event.target.value });
  }
  handleVideoLink(event) {
    this.setState({ optional_video_link: event.target.value });
    this.setState({toggle_video: event.target.value})
  }

  handleNote(event) {
    this.setState({ optional_note: event.target.value });
  }

  checkUploadResult = (resultEvent) => {
    if (resultEvent.event === "success") {
      const nextState = Object.assign(this.state, {
        optional_photo: resultEvent.info.secure_url,
      });
      this.setState(nextState);
      document.getElementById("photo-image-preview").src = resultEvent.info.secure_url;
      document.getElementById("photo-image-preview").classList = "show";
      document.getElementById("inner-photo").textContent = "upload a different photo";
      document.getElementById("photo-button").classList = "submitted";
    }
  }

  showWidget = (myWidget) => {
    myWidget.open();
  }
  showSubmit(){
     document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    document.getElementById('submit-button').classList.add('on');
    document.getElementById('canvas-holder').classList.add('on');
    document.getElementById('submission').classList.add('on');
    document.getElementById('review-button').classList.add('on');
  }
  handleSubmit(event) {
    //save roses in cloudinary
    const dataURI = document.getElementsByTagName("canvas")[0].getAttribute("data-uri");
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;

    request
      .post(url)
      .field("upload_preset", process.env.REACT_APP_PRESET_NAME)
      .field("file", dataURI)
      .field("multiple", "false")
      .end((error, response) => {
        const nextState = Object.assign(this.state, {rose_id: [response.body["public_id"], response.body["delete_token"]]});
        this.setState(nextState);

        //send info to airtable
        const {
          dedication,
          optional_note,
          optional_photo,
          optional_video_link,
          rose_id,
          optional_link,
          optional_location
        } = this.state;

        const submissionCallBack = (err, records) => {
          const {flowers} = this.props
          if (err) {
            console.error(err);
            return;
          }
          document.getElementById("submission").classList.add("submitted");
          var flowerArray = []
          for (var i = flowers.length - 1; i >= 0; i--) {
            if(flowers[i].fields.Dedication == records[0].fields.Dedication && records[0].id != flowers[i].id){
              flowerArray.push(flowers[i])
            }
          }
          if(flowerArray.length > 0){
            document.getElementById("submission-link").href = "/flower/"+ slugify(records[0].fields.Dedication) + "_"+ flowerArray.length;
          }else{
          document.getElementById("submission-link").href = "/flower/"+slugify(records[0].fields.Dedication)
          }
          const timeoutCallBack = () => {
            const url = `https://@api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/delete_by_token`;
            request
              .post(url)
              .field("token", rose_id[1])
              .end((error, response) => {
                if (error) {
                  console.log("done deletting");
                } else {
                  console.log(error);
                }
              });
            document.getElementById("submission").classList.add("submitted");

          };
          setTimeout(timeoutCallBack, 2000);
        };
        const submissionArray = [
          {
            fields: {
              Timestamp: Date.now(),
              Dedication: dedication,
              OptionalNote: optional_note,
              OptionalLink: optional_link,
              OptionalLocation: optional_location,
              OptionalVideoLink: optional_video_link,
              OptionalPhoto: [{ url: optional_photo }],
              RoseSVG: [{ url: response.body["url"] }]
            },
          },
        ];
        base("RoseGarden").create(submissionArray, submissionCallBack);
      });

    event.preventDefault();
  }

  render() {
    const{flowers} = this.props
    const uploadTag = {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_PRESET_NAME,
    };
    let myWidget = window.cloudinary.createUploadWidget(uploadTag, (error, result) => {this.checkUploadResult(result)});
    const { dedication, optional_note, optional_link, optional_location, optional_video_link, toggle_video } = this.state;

    return (
      <React.Fragment>
        <div id="flower"></div>
        <div id="canvas-holder">
          <P5Wrapper sketch={sketch} />
        </div>
        <div id="submission">
          <label>
            <span className='medium-text formlabel'>Dedicated in memory of <sup>*</sup></span><br/>
            <input
              className="medium-text"
              type="text"
              placeholder="a person"
              value={dedication}
              onChange={this.handleDedication}
            /> <br />
            <input
              className="medium-text"
              type="text"
              placeholder="or, a place"
              value={dedication}
              onChange={this.handleDedication}
            /> <br />
            <input
              className="medium-text"
              type="text"
              placeholder="or, a thing"
              value={dedication}
              onChange={this.handleDedication}
            />
          </label>

          <label>
            <div>
              <img id='photo-image-preview' src=''/>
              <button
                id="photo-button"
                onClick={() => this.showWidget(myWidget)}
              >
                <span className='small-text' id='inner-photo'>Add a photograph <i>(optional)</i></span>
              </button>
            </div>
          </label>

          <label>
            <span className='medium-text formlabel'>Add a reflection<sup>*</sup></span>
            <textarea className="medium-text" value={optional_note} onChange={this.handleNote} />
          </label>

          <label>
            <span className='medium-text formlabel'>Add a location</span><br/>
            <input
              className="medium-text"
              type="text"
              placeholder=""
              value={optional_location}
              onChange={this.handleLink}
            />
          </label>


          <label>
            <span className='medium-text formlabel'>Add a resource link</span><br/>
            <input
              className="medium-text"
              type="text"
              placeholder=""
              value={optional_link}
              onChange={this.handleLink}
            />
          </label>

          <label>
            <span className='medium-text formlabel'>Add a video link</span><br/>
            <input
              className="medium-text"
              placeholder="supports youtube & vimeo"
              type="text"

              value={optional_video_link}
              onChange={this.handleVideoLink}
            />
            <div id='video-preview'>
              {this.state.toggle_video ? <VideoEmbed videoUrl={this.state.toggle_video}/> : ""}
            </div>
          </label>
          <button className='medium-text-link' id="review-button" onClick={this.showSubmit}>
            review your dedication
          </button>
          <button className='medium-text-link' id="submit-button" onClick={this.handleSubmit}>
            share your dedication
          </button><br/>
          <a className='medium-text-link' id='submission-link'>visit your flower</a>
        </div>

        <nav id='flower-nav' className='medium-text-link'>
         <a href="/garden">↩ back to the garden</a>
         </nav>

        {this.state.formHere ? '' :


        <div className="info">

          <div className="info-text">
            <p className="medium-text">
              <span>
                We invite you to take a moment to leave a memory.
              </span>

            <button className="medium-text-link" id="modal-button" onClick={this.clickHandler}>share your dedication</button>
            </p>
        </div>


        {/* <div id='about-garden' className="medium-text">
           <a href="/">About this Garden</a>
          </div> */}
      </div>

      }
      </React.Fragment>
    );
  }
}

export default Share;
