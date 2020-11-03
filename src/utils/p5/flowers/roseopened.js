function roseopened(p) {
  var num = 40;
  var num2 = 35;
  const currentTimeStamp = Date.now().toString().split("");
  const timeArray = [];
  var green = [p.random(100, 145), p.random(140, 150), p.random(70, 95), 255];

  for (var x = 0; x < 6; x++) {
    var a = parseInt(currentTimeStamp[x]) + parseInt(currentTimeStamp[5 - x]);
    timeArray.push(a);
  }

  p.branch = function (depth) {
    var b = p.map(timeArray[depth], 0, 18, 2, 4);
    if (depth < b) {
      p.line(0, 0, 0, -1 * num);
      if (depth % 2 == 0) {
        p.push();
        p.rotate(15);
        p.line(0, 0, 0, -1 * num);
        p.scale(0.8);
        p.branchlette(0);
        p.pop();
      } else {
        p.push();
        p.rotate(-15);
        p.line(0, 0, 0, -1 * num);
        p.scale(0.8);
        p.branchlette(0);
        p.pop();
      }
      p.translate(0, -1 * num);
      p.rotate(p.random(-5, 5));
      p.branch(depth + 1);
    } else {
      p.scale(0.8);
      p.line(0, 0, 0, -2 * num2);
      if (p.random([true, false])) {
        p.createThorn(0, -0.5 * num2);
      }
      p.push();
      p.createFlower(0, -2 * num2);
      p.pop();
      p.push();
      p.fill(green[0], green[1], green[2], green[3]);
      p.noStroke();
      p.ellipse(0, -2 * num2 - 5, 15, 15);
      p.pop();
    }
  };

  p.createThorn = function (x, y) {
    p.push();
    p.noStroke();
    p.fill(green[0] - 40, green[1] - 40, green[2] - 40, green[3]);
    p.triangle(x, y, x - 10, y - 10, x, y - 12);
    p.pop();
    p.push();
    p.noStroke();
    p.fill(green[0] - 40, green[1] - 40, green[2] - 40, green[3]);
    p.triangle(x, y - 10, x + 8, y - 16, x, y - 26);
    p.pop();
    p.push();
    p.noStroke();
    p.fill(green[0] - 40, green[1] - 40, green[2] - 40, green[3]);
    p.triangle(x, y - 30, x - 10, y - 40, x, y - 44);
    p.pop();
  };

  p.createBud = function (x, y) {
    p.translate(x, y - 10);
    p.rotate(230);
    if (p.random([true, false])) {
      p.noStroke();
      p.fill(255, 255, 235, 200);
      p.push();
      p.rotate(130);
      p.scale(0.8);
      p.drawPetal(0, 0);
      p.pop();
    } else {
      p.rotate(25);
      for (var j = 0; j < 5; j++) {
        p.noStroke();
        p.rotate(30);
        p.fill(255, 255, 235, 200);
        p.drawPetal(0, 0);
      }
      p.rotate(-70);
      p.drawPetal(5, 0);
    }
  };

  p.createFlower = function (x, y) {
    var myAngle = 25;
    p.translate(x, y - 10);
    p.rotate(200);
    for (var j = 0; j < 3; j++) {
      p.noStroke();
      p.rotate(myAngle);
      var radius = 40;
      if (j == 2) {
        p.fill(255, 245, 215, 200);
        p.push();
        p.rotate(135);
        p.drawPetal(-8, 0);
        p.pop();
      } else if (j == 1) {
        p.fill(255, 245, 225, 200);
        p.push();
        p.rotate(110);
        p.drawPetal(-8, 0);
        p.pop();
      } else {
        p.fill(255, 255, 235, 210);
        p.push();
        p.rotate(110);
        p.drawPetal(-1, 0);
        p.pop();
      }
    }
    p.push();
    p.rotate(0);
    p.fill(255, 245, 225, 200);
    p.ellipse(25, 0, radius, radius / 1.5);
    p.pop();
    p.fill(255, 255, 235, 200);
    p.rotate(110);
    p.drawPetal(-1, 0);
  };

  p.branchlette = function (depth2) {
    if (p.random([true, false])) {
      p.createThorn(0, 0);
    }
    if (depth2 < p.random(1)) {
      p.line(0, 0, 0, -1 * num2);
      p.fill(0);
      p.translate(0, -1 * num2);
      p.scale(0.8);
      p.push();
      p.rotate(-15);
      p.branchlette(depth2 + 1);
      p.pop();
      p.push();
      p.rotate(15);
      p.branchlette(depth2 + 1);
      p.pop();
    } else {
      if (p.random([true, false])) {
        p.line(0, 0, 0, -2 * num2);
        if (p.random([true, false])) {
          p.createThorn(0, -0.5 * num2);
        }
        if (p.random([true, false])) {
          p.push();
          p.scale(0.6);
          if (p.random([true, false])) {
            p.scale(-1, 1);
            p.rotate(p.random(0, 15));
          } else {
            p.rotate(-1 * p.random(0, 15));
          }
          p.drawLeaf(200);
          p.pop();
          p.push();
          p.createBud(0, -2 * num2);
          p.fill(255, 190, 0);
          p.pop();
          p.push();
          p.fill(green[0], green[1], green[2], green[3]);
          p.noStroke();
          p.ellipse(0, -2 * num2 - 10, 5, 5);
          p.pop();
        } else {
          p.push();
          p.createFlower(0, -2 * num2);
          p.pop();
          p.push();
          p.fill(green[0], green[1], green[2], green[3]);
          p.noStroke();
          p.ellipse(0, -2 * num2 - 5, 15, 15);
          p.pop();
        }
      } else {
        p.push();
        p.scale(0.6);
        if (p.random([true, false])) {
          p.scale(-1, 1);
          p.rotate(p.random(0, 15));
        } else {
          p.rotate(-1 * p.random(0, 15));
        }
        p.drawLeaf(200);
        p.pop();
      }
    }
  };

  p.drawLeaf = function (l) {
    p.push();
    p.scale(1.8, 1);
    p.stroke(green[0] - 10, green[1] - 10, green[2] - 10, green[3]);
    p.strokeWeight(2);
    p.fill(green[0], green[1], green[2], green[3]);
    p.beginShape();
    p.vertex(0, 0);
    p.vertex(-15, -l / 6);
    p.vertex(-8, -l / 6);
    p.vertex(-15, -l / 4);
    p.vertex(-7, -l / 4);
    p.vertex(-15, -l / 3);
    p.vertex(-5, -l / 3);
    p.vertex(-10, -l / 2.3);
    p.vertex(-3, -l / 2.3);
    p.vertex(-5, -l / 1.9);
    p.vertex(-2, -l / 1.9);
    p.vertex(0, -l / 1.5);
    p.vertex(2, -l / 1.9);
    p.vertex(5, -l / 1.9);
    p.vertex(3, -l / 2.3);
    p.vertex(10, -l / 2.3);
    p.vertex(5, -l / 3);
    p.vertex(15, -l / 3);
    p.vertex(7, -l / 4);
    p.vertex(15, -l / 4);
    p.vertex(8, -l / 6);
    p.vertex(15, -l / 6);
    p.vertex(0, 0);
    p.endShape(p.CLOSE);
    p.pop();
  };

  p.drawPetal = function (x, y) {
    p.beginShape();
    p.curveVertex(x, y);
    p.curveVertex(x - 8, y - 10);
    p.curveVertex(x - 12, y - 15);
    p.curveVertex(x - 10, y - 30);
    p.curveVertex(x, y - 40);
    p.curveVertex(x + 15, y - 25);
    p.curveVertex(x + 12, y - 10);
    p.curveVertex(x + 8, y - 5);
    p.curveVertex(x, y);
    p.endShape(p.CLOSE);
  };

  p.push();
  p.translate(p.width / 2, p.height);
  p.strokeWeight(5);
  p.stroke(green[0], green[1], green[2], green[3]);
  p.branch(0);
  p.pop();
}

export default roseopened;
