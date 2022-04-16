var axiom = 'X';
var sentence = axiom;
var rules = [];
// Change this to experiment with the drawing
var angle = 90;
var len = 300;


rules[0] = {
  a: 'X',
  b: '^\\XF^\\XFX-F^//XFX&F+//XFX-F/X-/'
};
/*
rules[0] = {
  a: 'P',
  b: 'I+[P+R]--//[--L]I[++L]-[PR]++PR'
};

rules[1] = {
  a: 'I',
  b: 'FS[//&&L][//^^L]FS'
};

rules[2] = {
  a: 'S',
  b: 'SFS'
};
rules[3] = {
  a: 'L',
  b: '[`{+f-ff-f+|+f-ff-f}]'
};
rules[4] = {
  a: 'R',
  b: '[&&&E`/W////W////W////W////W]'
};
rules[5] = {
  a: 'E',
  b: 'FF'
};
rules[6] = {
  a: 'W',
  b: '[`^F][{&&&&-f+f|-f+f}]'
};



/*
rules[0] = {
  a: 'A',
  b: '[&FL!A]/////`[&F!A]///////`[&FL!A]'
};

rules[1] = {
  a: 'F',
  b: 'S/////F'
};

rules[2] = {
  a: 'S',
  b: 'FL'
};
rules[3] = {
  a: 'L',
  b: '[```^^^{f}]'
};
// Hilbert curve 3d
/*
rules[0] = {
  a: 'A',
  b: 'B-F+CFC+F-D&F^D-F+&&CFC+F+B//'
};

rules[1] = {
  a: 'B',
  b: 'A&F^CFB^F^D^^-F-D^|F^B|FC^F^A//'
};

rules[2] = {
  a: 'C',
  b: '|D^|F^B-F+C^F^A&&FA&F^C+F+B^F^D//'
};
rules[3] = {
  a: 'D',
  b: '|CFB-F+B|FA&F^A&&FB-F+B|FC//'
};
*/
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
  print(sentence);
 
  push();
  turtle();
  pop();
  len *= 1/2;
  //box(30,30,5);
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