var s;
var scl = 20;
var food;
var scoreElem;


function setup() {
  var headImage = localStorage.getItem("headImage") || "image2.png";
  var bodyImage = localStorage.getItem("bodyImage") || "image1.png";
  
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  createCanvas(650, 650);

  s = new Snake(headImage, bodyImage);
  frameRate(10);
  pickLocation();
}


function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  foodImg = loadImage("image9.png");
}

function draw() {
  background(loadImage("image333.png"));

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();

  image(foodImg, food.x, food.y, scl, scl);
}

function Snake(headImageFile, bodyImageFile) {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.headImg = loadImage(headImageFile);
  this.bodyImg = loadImage(bodyImageFile);

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.death = function () {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      scoreElem.html('Score = '+this.total);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        scoreElem.html('Game ended!');
      }
    }
  }

  this.update = function () {
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function () {
    image(this.headImg, this.x, this.y, scl, scl);
    for (var i = 0; i < this.tail.length; i++) {
      image(this.bodyImg, this.tail[i].x, this.tail[i].y, scl, scl);
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
