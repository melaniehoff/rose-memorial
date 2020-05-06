import React, { Component } from 'react';
import Airtable from 'airtable'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import request from 'superagent';
import { photosUploaded, updateUploadedPhoto } from '../../actions';
import P5Wrapper from 'react-p5-wrapper';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appZuPErukOoOExF9');

class GetShare extends Component {
  constructor(props) {
    super(props);
    this.state = {dedication: '',
                  optional_note:'',
              	  optional_photo:'',
              	  rose_svg:'',
                  onUpdateUploadedPhoto: updateUploadedPhoto,
                  onPhotosUploaded: photosUploaded};
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

/*------------------*/
/*------------------*/
/* FLOWER CODE */
  sketch (p) {
    const num = 20;
    const num2 = 70;
    const meow1 = Date.now().toString().split('');
    const meow = [];

    for(var x = 0; x < 6; x++){
      var a = parseInt(meow1[x]) + parseInt(meow1[5-x]);
      meow.push(a);
    }

    p.setup = function () {
      p.createCanvas(400, 400);
      p.angleMode(p.DEGREES);
      p.noLoop();
    };

    p.draw = function () {
      p.background(240);
      p.translate(200, 400);
      p.strokeWeight(3);
      p.stroke(90,95,90,255);
      p.branch(0);
      p.noLoop();
    };

    p.branch = function(depth){
      var b = p.map(meow[depth], 0, 18, 2, 4)
      if(depth < b){
         p.line(0,0,0, -1 * num);
         if(depth % 2 == 0){
           p.push()
           p.rotate(15)
           p.line(0,0,0, -1 * num);
           p.scale(0.8);
           p.branchlette(0);
           p.pop()
         } else {
           p.push()
           p.rotate(-15)
           p.line(0,0,0, -1 * num);
           p.scale(0.8);
           p.branchlette(0);
           p.pop()
         }
         p.translate(0, -1 * num);
         p.rotate(p.random(-5,5));
         p.branch(depth + 1);      
       } else{
          p.scale(0.8);
          p.branchlette(0);
       }
    }
    p.branchlette = function(depth2){
      
      if(depth2 < p.random(1)){
        p.line(0,0,0,-1 * num2);
        p.fill(0);
        p.translate(0, -1 * num2);
        p.scale(0.8);
        p.push()
        p.rotate(-15)
        p.branchlette(depth2 + 1)
        p.pop()
        p.push()
        p.rotate(15)
        p.branchlette(depth2 + 1)
        p.pop()
      }else{
          if(p.random([true,false])){
            p.line(0,0,0,-1 * num2);
            p.push()
            p.scale(0.5);
            if(p.random([true,false])){
              p.scale(-1,1);
              p.rotate(p.random(180,195));
            } else{
              p.rotate(-1*p.random(180,195));
            }
            p.drawLeaf(300);
            p.pop()
            p.translate(0, -1 * num2);
            if(p.random([true,false])){
              p.push()
              p.scale(0.9);
              p.drawInnerFlorette(30,0);
              p.fill(255,190,0)
              p.pop()
              p.push()
              p.fill(90,95,90,255)
              p.noStroke()
              p.pop()
            }else{
              p.push()
              p.scale(1);
              p.drawInnerFlorette(30,0);
              p.fill(255,190,0)
              p.pop()
              p.push()
              p.fill(90,95,90,255)
              p.noStroke()
              p.pop()
            }
          
          }else{
            p.push()
            p.scale(0.5);
            if(p.random([true,false])){
              p.scale(-1,1);
              p.rotate(p.random(180,195));
            } else{
              p.rotate(-1*p.random(180,195));
            }
            p.drawLeaf(300);
            p.pop()
          }
           
      }
      
    }

    p.createBunna = function(x,y){
      var bunna = 60;
      p.translate(x,y-10);
        for(var j =0;j < 6;j++){      
          p.stroke(0);
          p.strokeWeight(0.5);
          p.rotate(bunna)
          var radius = 30
          p.fill(255, 235, 245,255);     
          p.ellipse(19,0, radius,radius/1.5); 
      }
    }


    p.drawLeaf = function(l){
      p.stroke(90,95,90,255);
      p.fill(100,125,100,255);
      p.beginShape();
      p.curveVertex(0, 0);
      p.curveVertex(-5, l/40);
      p.curveVertex(-10, l/4);
      p.curveVertex(0, l);
      p.vertex(10, l/5);
      p.vertex(0, 0);
      p.endShape(p.CLOSE);
    }

    p.drawInnerFlorette = function(l,depth){
       p.fill(255)
       p.rotate(depth/4);
       if(depth < 10){
         var r = l/2
         var d = l/1.5
         p.line(0,0,0,-1*(d)); 
         p.push()
         p.scale(0.3);
         p.createBunna(-1 * r*2,-1*r*2)
         p.pop()
         p.push()
         p.scale(0.3);
         p.createBunna(r*2,-1*(d)+r/1.5)
         p.pop()
         p.translate(0,-1*(d));
         p.scale(0.9);
         p.drawInnerFlorette(l, depth + 1);
        }
    }


  };
/* END FLOWER CODE */
/*------------------*/
/*------------------*/

  render() {
  	const {dedication, optional_note, optional_photo, rose_svg} = this.state; 
    return (
      <React.Fragment>
        <P5Wrapper sketch={this.sketch} />
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