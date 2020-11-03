import lilac from "./flowers/lilac";
import daisy from "./flowers/daisy";
import jasmine from "./flowers/jasmine";
import lily from "./flowers/lily";
import rose from "./flowers/rose";
import orangeBlossom from "./flowers/orangeblossom";
import daffodil from "./flowers/daffodil";
import tallFlower from "./flowers/tallflower";
import realrose from "./flowers/realrose";
import roseopened from "./flowers/roseopened";
import tuliprose from "./flowers/tuliprose";
import fourpetalflower from "./flowers/fourpetalflower";
import floppypoppy from "./flowers/floppypoppy";
import brightflower from "./flowers/brightflower";

function sketch(p) {
  p.setup = function () {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES);
    p.noLoop();
  };

  p.draw = function () {
    const myRandom = p.random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    if (myRandom === 0) {
      daisy(p);
    } else if (myRandom === 1) {
      lilac(p);
    } else if (myRandom === 2) {
      jasmine(p);
    } else if (myRandom === 3) {
      lily(p);
    } else if (myRandom === 4) {
      rose(p);
    } else if (myRandom === 5) {
      orangeBlossom(p);
    } else if (myRandom === 6) {
      daffodil(p);
    } else if (myRandom === 7) {
      realrose(p);
    } else if (myRandom === 8) {
      roseopened(p);
    } else if (myRandom === 9) {
      tuliprose(p);
    } else if (myRandom === 10) {
      fourpetalflower(p);
    } else if (myRandom === 11) {
      floppypoppy(p);
    } else if (myRandom === 12) {
      brightflower(p);
    } else {
      tallFlower(p);
    }
    p.noLoop();
    const canvas = document.getElementsByTagName("canvas")[0];
    const dataURL = canvas.toDataURL({ pixelRatio: 2 }).toString(); //there should be a better way to transfer this over to the getshare
    canvas.setAttribute("data-uri", dataURL.toString());
  };

  // p.mouseReleased = function(){
  //   if(p.mouseX > 0 && p.mouseX< p.width && p.mouseY > 0 && p.mouseY < p.height){
  //     p.erase();
  //     p.push()
  //     p.rotate(0)
  //     p.translate(0,0)
  //     p.rect(0,0, p.width, p.height);
  //     p.pop()
  //     p.noErase();
  //     p.redraw();
  //   }
  // }
}

export default sketch;
