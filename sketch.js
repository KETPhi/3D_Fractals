var angle = 0;
var alpha;


function setup() {
  createCanvas(500, 500, WEBGL);
  alpha = radians(angle);
  noFill();
}

function draw() {
  background(200);
  rotateY(45);
  stroke(153);
  box(100);
  line(0,0,0,-100);
  // Matrix for rotation around the Y axis
  //var mat = [ct,st,0,0,
  //  -st,ct,0,0,
  //  0,0,1,0,
  //  0,0,0,1];
  //turn(radians(45));
  applyMatrix(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
  //turn(radians(45));
  stroke(255);
  line(10,0,10,-100);
  box(150);
}
function turn(alpha) {
  applyMatrix(cos(alpha), 0.0,  sin(alpha),  0.0,
                  0.0, 1.0, 0.0,  0.0,
                  -sin(alpha), 0.0,  cos(alpha),  0.0,
                  0.0, 0.0, 0.0,  1.0);
}