import React, { Component } from 'react';
import Airtable from 'airtable'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import request from 'superagent';
import { photosUploaded, updateUploadedPhoto } from '../../actions';
import P5Wrapper from 'react-p5-wrapper';
import sketch from '../../utils/p5/sketch';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appZuPErukOoOExF9');

class GetShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dedication: '',
      optional_note:'',
      optional_photo:'',
      rose_svg:'',
      onUpdateUploadedPhoto: updateUploadedPhoto,
      onPhotosUploaded: photosUploaded
    };
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
   // svgbase64 would be dynamically created through the p5 sketch. 
      // const svgString = event.target.value;
      // const url = `https://api.cloudinary.com/v1_1/${
      //       process.env.REACT_APP_CLOUD_NAME
      //       }/upload`;
    
      //       request.post(url)
      //           .field('upload_preset', process.env.REACT_APP_PRESET_NAME)
      //           .field('file', svgbase64)
      //           .field('multiple','false')
      //           .end((error, response) => {
      //               console.log(response)
      //               this.setState({rose_svg: response.body["url"]});
      //           });
  }

  onPhotoSelected(files) {
        const url = `https://api.cloudinary.com/v1_1/${
            process.env.REACT_APP_CLOUD_NAME
            }/upload`;
    

        for (let file of files) {
            const photoId = this.photoId++;
            const fileName = file.name;

            request.post(url)
                .field('upload_preset', process.env.REACT_APP_PRESET_NAME)
                .field('file', file)
                .field('multiple','false')
                .on('progress', (progress) => this.onPhotoUploadProgress(photoId, file.name, progress))
                .end((error, response) => {
                    this.onPhotoUploaded(photoId, fileName, response);
                });
        }
    }
   onPhotoUploadProgress(id, fileName, progress) {
        this.state.onUpdateUploadedPhoto({
            id: id,
            fileName: fileName,
            progress: progress,
        });
    }

    onPhotoUploaded(id, fileName, response) {
        this.state.onUpdateUploadedPhoto({
            id: id,
            fileName: fileName,
            response: response,
        });

        this.state.onPhotosUploaded([response.body]);
        this.setState({optional_photo: response.body['url']});

    }
  handleSubmit(event) {
  	//send info to airtable
  const {dedication, optional_note, optional_photo, rose_svg} = this.state
	base('RoseGarden').create([
	  {
	    "fields": {
	      "Timestamp": Date.now(),
	      "Dedication": dedication,
	      "OptionalNote": optional_note,
        "OptionalPhoto": [{"url": optional_photo}],
	      "RoseSVG": [{"url": rose_svg}],
	      "Public": "Yes"
	    }
	  }
	], function(err, records) {
	  if (err) {
	    console.error(err);
	    return;
	  }
	  records.forEach(function (record) {
	    console.log(record.getId());
	  });
	});

    event.preventDefault();
 
  }


  render() {
  	const {dedication, optional_note, optional_photo, rose_svg} = this.state; 
    return (
      <React.Fragment>
        <P5Wrapper sketch />
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
          
            <input
                type="file"
                id="fileupload"
                accept="image/*"
                multiple={false}
                ref={fileInputEl =>
                    (this.fileInputEl = fileInputEl)
                }
                onChange={() =>
                    this.onPhotoSelected(
                        this.fileInputEl.files
                    )
                }
            />
          </label>

          <label>
            Rose:
            <input type="text" value={rose_svg} onChange={this.handleRose} />

           
          </label>


          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    );
  }

 }

export default GetShare;