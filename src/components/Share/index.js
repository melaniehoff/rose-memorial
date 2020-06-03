import React, { Component } from "react";
import Airtable from "airtable";
import request from "superagent";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../../utils/p5/sketch";
import './style.css';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base("appZuPErukOoOExF9");

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dedication: "",
      optional_note: "",
      optional_photo: "",
      rose_id: "",
    };
    this.handleDedication = this.handleDedication.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.checkUploadResult = this.checkUploadResult.bind(this);
    this.showWidget = this.showWidget.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDedication(event) {
    this.setState({ dedication: event.target.value });
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
      document.getElementById("photo-button").classList = "submitted";
    }
  }

  showWidget = (myWidget) => {
    myWidget.open();
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
          rose_id,
        } = this.state;

        const submissionCallBack = (err, records) => {
          if (err) {
            console.error(err);
            return;
          }
          document.getElementById("submission").classList.add("submitted");
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
              OptionalPhoto: [{ url: optional_photo }],
              RoseSVG: [{ url: response.body["url"] }],
              Public: "Yes",
            },
          },
        ];
        base("RoseGarden").create(submissionArray, submissionCallBack);
      });

    event.preventDefault();
  }

  render() {
    const uploadTag = {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_PRESET_NAME,
    };
    let myWidget = window.cloudinary.createUploadWidget(uploadTag, (error, result) => {this.checkUploadResult(result)});
    const { dedication, optional_note } = this.state;

    return (
      <React.Fragment>
        <div id="flower"></div>
        <P5Wrapper sketch={sketch} />
        <div id="submission">
          <label>
            Name:
            <input
              type="text"
              value={dedication}
              onChange={this.handleDedication}
            />
          </label>
          <label>
            Optional Note:
            <textarea value={optional_note} onChange={this.handleNote} />
          </label>
          <label>
            Optional Photo:
            <div>
              <button
                id="photo-button"
                onClick={() => this.showWidget(myWidget)}
              >
                Upload Photo
              </button>
              <div>upload a different photo</div>
            </div>
          </label>
          <button id="submit-button" onClick={this.handleSubmit}>
            Submit Memory
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Share;
