let gameStarted = false;
let fft;
let fallingCharacters = [];

let rashi, rmons, rmasa, rming, rston;

let roashin = 0, romasa = 0, romonster = 0, roming = 0, rostone = 0;
let rotatespd = 3;

function preload() {
  JL = loadSound('../assets/jl.m4a');
  LKDQBM = loadSound('../assets/LKDQBM.MP3')
  GL = loadSound("../assets/gl.m4a")
  FKSJ = loadSound("../assets/World crazy.m4a")
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
  }
  
  // 检测点击陈信宏区域
  if (mouseX > 300 && mouseX < 400 && mouseY > 300 && mouseY < 500) {
    JL.play();
    roashin=180;
  }
  
  // 检测点击蔡昇晏区域
  if (mouseX > 120 * 2 && mouseX < 40 + 120 * 2  && mouseY > height - 50 - 88 && mouseY < height - 50) {
    FKSJ.play();
  }
  
  // 检测点击温尚翊区域
  if (mouseX > 40 + 120 * 1 && mouseX < 40 + 120 * 1 + 88 && mouseY > height - 50 - 88 && mouseY < height - 50) {
    LKDQBM.play(); 
  }
  
  // 检测点击刘彦明区域
  if (mouseX > 40 + 120 * 4 && mouseX < 40 + 120 * 4 + 88 && mouseY > height - 50 - 88 && mouseY < height - 50) {
    GL.play(); 
  }
  
  // 检测点击石头区域
  if (mouseX > 40 + 120 * 5 && mouseX < 40 + 120 * 5 + 88 && mouseY > height - 50 - 88 && mouseY < height - 50) {
    mySoundStone.play(); 
  }
}


function setup() {
  let canvas=createCanvas(800, 500);
  canvas.parent("p5-container")


  
  rashi = random(1,1.3);
  rmons = random(1,1.3);
  rmasa = random(1,1.3);
  rming = random(1,1.3);
  rston = random(1,1.3);
  
  // 初始化FFT
  fft = new p5.FFT();
  
  // 初始化角色
  fallingCharacters.push({name: 'Ashin', x: 40+120*3, y: height - 50, size: 88});
  fallingCharacters.push({name: 'Masa', x: 40+120*2, y: height - 50, size: 88});
  fallingCharacters.push({name: 'Monster', x: 40+120*1, y: height - 50, size: 88});
  fallingCharacters.push({name: 'Ming', x: 40+120*4, y: height - 50, size: 88});
  fallingCharacters.push({name: 'Stone', x: 40+120*5, y: height - 50, size: 88});
}

function draw() {
  background(255);
  
  if (!gameStarted) {
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(0);
    text(' Welcome to Maydayland!', width / 2, height / 2);
    return;
  }
  
  //旋轉他們
  if (mouseX > 120*3 && mouseX < 120*3+80){
  roashin += rotatespd;  
  }
  if (mouseX > 120*2 && mouseX < 120*2+80){
  romasa += rotatespd;  
  }
  if (mouseX > 120*1 && mouseX < 120*1+80){
  romonster += rotatespd;  
  }
  if (mouseX > 120*4 && mouseX < 120*4+80){
  roming += rotatespd;  
  }
  if (mouseX > 120*5 && mouseX < 120*5+80){
  rostone += rotatespd;  
  }  
  
  if (mouseX>0){
  roashin += rotatespd;  
  romasa += rotatespd;  
  romonster += rotatespd;  
  roming += rotatespd;  
  rostone += rotatespd;  
  }  
  
  
  


  let spectrum = fft.analyze();
  // console.log(spectrum);


  for (let character of fallingCharacters) {
    if (character.name === 'Ashin') {
      Ashin(character.x, height-44-spectrum[400,600]*2*rashi, 88);
    } else if (character.name === 'Masa') {
      Masa(character.x, height-44-spectrum[400,600]*2*rmasa, 88);
    } else if (character.name === 'Monster') {
      Monster(character.x, height-44-spectrum[400,600]*2*rmons, 88);
    } else if (character.name === 'Ming') {
      Ming(character.x, height-44-spectrum[400,600]*2*rming, 88);
    } else if (character.name === 'Stone') {
      Stone(character.x, height-44-spectrum[400,600]*2*rston, 88);
    }
  }
}





  








function drawSpectrum(spectrum) {
  noStroke();
  for (let i = 0; i < 518; i++) {
    let x = map(i, 0, 518, 0, width);
    let h = map(spectrum[i], 0, 255, 0, height / 2);
    fill(255 - i * 255 / 518, 100, i * 255 / spectrum.length);
    rect(x, height - h, width / 518, h);
  }
}








// 绘制陈信宏
function Ashin(x, y) {
  push();
  
  translate(x, y); // Translate to the character's location
  rotate(radians(roashin));
 
  
  noStroke();
  fill('#E878AF');
  ellipse(0, 0, 88, 88);


  fill(255);
  push();
  translate(- 10, - 4);
  rotate(-PI / 2);
  ellipse(0, 0, 20, 15);
  pop();

  push();
  translate(14, - 4);
  rotate(PI / 32);
  ellipse(0, 0, 15, 20); 
  pop();

  fill('#00AEEF');
  push();
  translate(- 10, - 4);
  rotate(-PI / 2);
  ellipse(0, 0, 15, 12); 
  pop();

  push();
  translate(13, - 3);
  rotate(PI / 32);
  ellipse(0, 0, 12, 15); 
  pop();

  // 黑色线条
  stroke(0);
  strokeWeight(3.5);
  noFill();
  beginShape();
  vertex(-6, 12);
  bezierVertex(-5, 14, -2, 14, 0, 13);
  bezierVertex(1, 12, 2, 11, 4, 12);
  bezierVertex(6, 12, 8, 13, 9, 14);
  bezierVertex(11, 15, 14, 14, 15, 13);
  endShape();
  
  pop();
}

// 绘制蔡昇晏
function Masa(x, y) {
  push();
  
  translate(x, y); // Translate to the character's location
  rotate(radians(romasa));
 
  noStroke();
  fill('#EDC755');
  ellipse(0, 0, 88, 88); 

  fill(255);
  arc(- 13, - 9, 20, 20, 0, PI, OPEN); 
  arc(14,- 9, 20, 20, 0, PI, OPEN); 

  fill('#EF4136');
  arc( - 11,  - 9, 12, 13, 0, PI, OPEN); 
  arc(13,  - 9, 12, 13, 0, PI, OPEN);
  
  // 绘制嘴巴
  fill('#ffffff');
  noStroke();
  push();
  translate( 2, 9);
  rotate(radians(-10));
  arc(0, 0, 20, 20, 0, PI, OPEN); 
  pop();
  stroke(0);
  strokeWeight(4.28);
  line( 8, 12, 3, 13); 
  
  pop();
}

// 绘制温尚翊
function Monster(x, y) {
  push();
  
  translate(x, y); // Translate to the character's location
  rotate(radians(romonster));
 
  noStroke();
  fill('#DE4D3D');
  ellipse(0, 0, 88, 88); 

  fill(255);
  push();
  translate(- 12,  - 3);
  rotate(-PI / 5.5);
  ellipse(0, 0, 16, 14); 
  pop();

  push();
  translate( 12, - 2);
  rotate(-PI / 5.5);
  ellipse(0, 0, 16, 14); 
  pop();

  fill('#39B04A');
  push();
  translate(- 12,  - 3);
  rotate(-PI / 5.5);
  ellipse(0, 0, 10, 8);
  pop();

  push();
  translate(12, - 1);
  rotate(-PI / 5.5);
  ellipse(0, 0, 10, 8); 
  pop();

  // 嘴
  stroke(0);
  strokeWeight(4.28);
  line(- 7,  17, - 3, 12);
  line(- 7,  17,  6, 14); 
  
  pop();
}

// 绘制刘彦明
function Ming(x, y) {
  push();
  
  translate(x, y); // Translate to the character's location
  rotate(radians(roming));
 
  strokeWeight(1);
  fill('#41AEDF');
  noStroke();
  ellipse(0, 0, 88, 88);
  
  // 白色椭圆
  fill(255);
  ellipse(- 5,  - 7, 8.536, 9.196);
  ellipse( 11,  - 6, 8.246, 9.116);
  ellipse( 10,  - 6, 5.508, 5.262);
  ellipse( - 4,  - 7, 5.426, 5.248);
  
  //眼珠
  fill(0); // 黑色
  ellipse( - 4,  - 7, 4, 4); 
  ellipse(  10, - 6, 4, 4); 
  
  // 黄色眼镜中间
  fill('#EDC64F');
  rect(x + 0.249, y - 11.25, 5.162, 3.259);
  

  fill('#EDC64F');
  beginShape();
  vertex( - 4,  - 7.287);
  vertex( 0.505,  - 7.355);
  vertex( 2.95,  - 4.689);
  vertex( - 1.833,  - 2.09);
  vertex( - 1.833,  - 2.09);
  endShape(CLOSE);
  

  noFill();
  stroke('#EDC64F');
  strokeWeight(3.5);
  rect( - 17,  - 16, 18, 18, 5); 
  rect( + 5, - 16, 18, 18, 5); 
  
  // 连接线
  stroke('#000000');
  strokeWeight(4.4182);
  line( 0.695,  6.907,  4.476,  10.351);
  line( 4.476, 10.351,  8.301,  6.907);
  
  pop();
}

// 绘制石头
function Stone(x, y) {
  push();
  
  translate(x, y); // Translate to the character's location
  rotate(radians(rostone));
 
  strokeWeight(1);
  fill('#4bb056');
  noStroke();
  ellipse(0, 0, 88, 88);
  
  //眼
  fill(255);
  ellipse( - 6,  - 7.122, 11.2, 11.2);
  ellipse( 4.8,  - 9, 11.2, 11.2);
  fill('#eca64a');
  ellipse( - 8.6,  - 9, 5, 5.7);
  ellipse(  2, - 10.8, 5, 5.7);
  
  //嘴
  stroke('#000000');
  strokeWeight(4.1652);
  noFill();
  beginShape();
  vertex( - 11.468,  + 7.065);
  vertex( - 0.571,  + 4.478); 
  vertex( + 5.202,  + 6.365); 
  vertex( + 8.854,  + 2.193); 
  vertex( + 18.291,  - 0.046); 
  endShape();
  
  pop();
}
