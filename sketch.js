// Hilbert Curve 3D
// Aly Castro

var axiom = 'X';
var sentence = axiom;
var rules = [];
var angle = 90;
var len = 300;

rules[0] = {
  a: 'X',
  b: '^\\XF^\\XFX-F^//XFX&F+//XFX-F/X-/'
};

function setup() {
  createCanvas(1000, 1000,WEBGL);
  background(210);
  noFill();
  normalMaterial();
  var button = createButton('generate');
  button.mousePressed(generate);
  camera(150,-50,150,0,-50,0);
  rotateX(radians(90));
}

function generate() {
  clear();
  var nextSentence = '';
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
        break;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  push();
  turtle();
  pop();
  len *= 1/2;
}

function turtle() {
  matrixIdentity();
  background(210);
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);
    if (current == 'F') {
      stroke(i*0.05);
      line(0, 0, 0,0,0,len);
      translate(0,0,len);
    }else if(current == '+'){
      turn(radians(angle));
    }else if(current == '-'){
      turn(-radians(angle));
    }else if(current == '&'){
      pitch(radians(angle));
    }else if(current == '^'){
      pitch(-radians(angle));
    }else if(current == '/'){
      roll(-radians(angle));
    }else if(current == '\\'){
      roll(radians(angle));
    }else if(current == '|'){
      turn(radians(180));
    }else if(current == '!'){
      //len-=0.05;
    }else if(current == '['){
      push();
    }else if(current == ']'){
      pop();
    }
  }
}

function matrixIdentity(){
  applyMatrix(0.5,0,0,0,
              0,0.5,0,0,
              0,0,0.5,0,
              0,0,0,2);
}

function pitch(alpha) {
  applyMatrix(1.0,  0.0, 0.0, 0.0,
              0.0,  cos(alpha), sin(alpha), 0.0,
              0.0,  -sin(alpha), cos(alpha), 0.0,
              0.0,  0.0, 0.0,    1.0);
}

function roll(alpha) {
  applyMatrix( cos(alpha), sin(alpha), 0.0, 0.0,
              -sin(alpha), cos(alpha), 0.0, 0.0,
                0.0,   0.0,   1.0,   0.0,
                0.0,   0.0,   0.0,   1.0);
}

function turn(alpha) {
  applyMatrix(cos(alpha), 0.0,  sin(alpha),  0.0,
              0.0,        1.0,      0.0,  0.0,
              -sin(alpha),0.0,  cos(alpha),  0.0,
              0.0,        0.0,      0.0,  1.0);
}
