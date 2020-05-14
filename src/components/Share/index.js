import React, { Component } from "react";
import Airtable from "airtable";
import request from "superagent";
import P5Wrapper from "react-p5-wrapper";
import sketch from "../../utils/p5/sketch";

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
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showWidget = this.showWidget.bind(this);
    this.checkUploadResult = this.checkUploadResult.bind(this);
  }

  handleDedication(event) {
    this.setState({ dedication: event.target.value });
  }

  handleNote(event) {
    this.setState({ optional_note: event.target.value });
  }
  checkUploadResult = (resultEvent)=> {
    if(resultEvent.event === 'success'){
      console.log(this.props.currentUser.id);
      this.props.postPhoto({user_id: this.props.currrentUser.id,
        caption: '',
        url: resultEvent.info.secure_url}).then(this.props.history.push(`/profile`))
    }
   }
   showWidget = (myWidget)=> {
    console.log(myWidget)
    myWidget.open()
   }
  handlePhoto(event) {
    // this.setState({ optional_photo: event.target.value });
    // console.log(event.target.value)
    // const dataURI = document
    //   .getElementsByTagName("canvas")[0]
    //   .getAttribute("data-uri");
    // const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;

    // request
    //   .post(url)
    //   .field("upload_preset", process.env.REACT_APP_PRESET_NAME)
    //   .field("file", event.target.files[0].name)
    //   .field("multiple", "false")
    //   .end((error, response) => {
    //     console.log(response)
    //   });
  }

  handleSubmit(event) {
    //save roses in cloudinary
    const dataURI = document
      .getElementsByTagName("canvas")[0]
      .getAttribute("data-uri");
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;

    request
      .post(url)
      .field("upload_preset", process.env.REACT_APP_PRESET_NAME)
      .field("file", dataURI)
      .field("multiple", "false")
      .end((error, response) => {
        // console.log(response);
        this.setState({
          rose_id: [response.body["public_id"], response.body["delete_token"]],
        });

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
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: "rose-memorial",
      uploadPreset: "rose-memorial"},
      (error, result)=>{ this.checkUploadResult(result) })

    const { dedication, optional_note } = this.state;

    return (

      <React.Fragment>
        <div id="flower"></div>
        <P5Wrapper sketch={sketch} />
        <form id="submission" onSubmit={this.handleSubmit}>
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
            <input
              type="file"
              id="fileupload"
              accept="image/*"
              multiple={false}
              ref={(fileInputEl) => (this.fileInputEl = fileInputEl)}
              onChange={this.handlePhoto}
            />

            <div id='photo-form-container'>
              <button onClick={() => this.showWidget(myWidget)}>Upload Photo</button>
            </div>
          </label>
         
          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    );
  }
}

export default Share;
