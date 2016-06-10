//(C) Duncan Rowland 9/June/2016 drowland@lincoln.ac.uk

var maxticks=160; //How long to keep going for? (160 frames)
var bifurate=20; //How often to split the branch (every 20 frames)
var branches=[]; //Just start with one 'branch' (i.e. the trunk)
branches.push({s:{x:320, y:480}, e:{x:320, y:400}}); //Trunk {s:start,e:end}

function setup() {
  createCanvas(640, 480);
  frameRate(30);
}

function rotateAndScaleVector(v,a,s) {
  var ca = cos(a);
  var sa = sin(a);
  return {x:(ca*v.x-sa*v.y)*s, y:(sa*v.x+ca*v.y)*s};
}

function drawBranches(tick) {
  if(tick%bifurate==0) { //Fork all branches and replace array
  var newbranches=[];
  for (var i=0; i<branches.length; i++) {
      var b=branches[i];
      var s={x:b.e.x, y:b.e.y}; //start point of new branch (i.e. end of old one)
      var d={x:b.e.x-b.s.x, y:b.e.y-b.s.y}; //vector (end-start) of old branch
      var r=rotateAndScaleVector(d,+0.5,0.8); //rotate and scale for first new branch
      newbranches.push({s:s, e:{x:s.x+r.x, y:s.y+r.y}}); //add branch into the array
      var r=rotateAndScaleVector(d,-0.5,0.8); //rotate and scale for second new branch
      newbranches.push({s:s, e:{x:s.x+r.x, y:s.y+r.y}}); // add branch into the array
    }
    branches=newbranches; //Replace the array of old branches with the new ones
  }
  //Draw all branches in the array
  var l=tick/maxticks; //interpolate through animation (0..1) for size and color
  var s=lerp(15,5,l);
  var c=lerpColor(color(200,150,25),color(50,200,50),l);
  fill(c);

  var l=(tick%bifurate)/bifurate; //interpolation along branch (0..1) for position
  for (var i=0; i<branches.length; i++) { //and draw an ellipse at each point
    var b=branches[i];
    var x=lerp(b.s.x, b.e.x, l);
    var y=lerp(b.s.y, b.e.y, l);
    ellipse(x, y, s, s*2);
  }
}

function draw() {
  if(frameCount<maxticks) {
    drawBranches(frameCount);
  }
}