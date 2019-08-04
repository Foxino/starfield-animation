var w;
var h;
var can;
var c;

var backgroundColor = "#001a1a";
var starColor = "#e6ffff";
var trailColor = "#E0FFFF";
var starCount = 200;
var stars = [];
var starSpeed = .22;
var maxSize = 5;
var starTrail = 6;

class Star {

  constructor() {
    this.x = Math.random() * (w - 0) + 0;//gridToCanvas_x(0);
    this.y = Math.random() * (h - 0) + 0;//gridToCanvas_y(0);
    this.z = Math.random() * 100;
    this.draw();
  }

  draw(){
    c.strokeStyle = trailColor;

    c.beginPath();
    c.lineWidth = (maxSize/100) * this.z;
    c.moveTo(this.cent_x + (((this.cent_x-this.x)/100) * this.z), this.cent_y + (((this.cent_y-this.y)/100) * this.z))
    c.lineTo(this.cent_x + (((this.cent_x-this.x)/100) * (this.z-(starSpeed*starTrail))), this.cent_y + (((this.cent_y-this.y)/100) * (this.z-(starSpeed*starTrail))));
    c.stroke();

    c.fillStyle = starColor;
    c.strokeStyle = starColor;

    c.lineWidth = .1;
    c.beginPath();
    this.cent_x = w/2;
    this.cent_y = h/2;
    c.arc(this.cent_x + (((this.cent_x-this.x)/100) * this.z), this.cent_y + (((this.cent_y-this.y)/100) * this.z), (maxSize/100) * this.z, 0, 2 * Math.PI);
    c.stroke();
    c.fill();

  }

  update(){
    //alert();
    this.z += starSpeed;

    if(this.z > 150){
      this.z = Math.random() * 100;
      this.x = Math.random() * (w - 0) + 0;
      this.y = Math.random() * (h - 0) + 0;
    }

    this.draw();
  }

}

//for this i rather work from the middle on a regular geometry style grid
function gridToCanvas_x(x){
  return x + (w/2);
}

function canvasToGrid_x(x){
  return x - (w/2);
}

function gridToCanvas_y(y){
  return y + (h/2);
}

function canvasToGrid_y(y){
  return y - (h/2);
}

function reSize(){
  can = document.getElementById('canvas');
  c = can.getContext('2d');
  w = window.innerWidth;
  h = window.innerHeight;
  can.width = w;
  can.height = h;
  setBackground();
  stars = [];
  for (var i = 0; i < starCount; i++) {
    stars.push(new Star())
  }
  anim();
}

function anim(){
  requestAnimationFrame(anim);
  c.clearRect(0,0,w,h);
  setBackground();
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
  }
  //anim();
}

function setBackground(){
  c.fillStyle = backgroundColor;
  c.fillRect(0,0,w,h);
  c.fill();
}
