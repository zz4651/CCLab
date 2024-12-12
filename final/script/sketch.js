let images = []; 
let positions = [];

let padding = 15;
let picSizeX = 100;
let picSizeY = 87.87;
let firstXPadding = 70;
let firstYPadding = 45;

let picNum = 24;
let numEachRow = 12;

let assembleDescriptions = ["⬆️","//","🌕","⛰️","/tzi/","☀️","✋","👦","🏺","🌲","/zaŋ/", "👁️","🧎","🍜","🧎","🧠", "🫀","🌧️","🧎","🦶","🚢","/hliʔ/","🔥","🧍😮"]; 
let levelDescriptions = ["/zaŋ/+🌲", "🦶+🚢", "✋+👁️","🌕","🧎+🔥","🧍😮+/hliʔ/"];
let chaDescriptions = ["🛏️","⬅️","👀","🌛","🔥","🤨","◯ ➡️ ◯","🌍","⬆️","❄️","👐","👦","👀","⛰️","🌛","⬇️","👦","🤔","🤮","👫"]
let currentLevel = 0;
let showCha = false;

let sounds = [];
let validSounds = [3,6,17,22];

let dragging = -1;
let saveButton; 
let savedMessage = false;

let BGI; 
let descriptionAlpha = 0; // 透明度

let hoverTimeout; // 定时器
let whichMouseIsOnIt = -1; // 悬停图片索引
let timeToShowWhenTheMouseOnIt = 500;
let soundIndex = -1;
// let aa = -1;

let scale = 1.1;


function preload() {

  BGI = loadImage('assets/20240330-1122233432.jpg'); 
  
  images[0] = loadImage("assets/cha/mayan_chinese0.svg");
  images[1] = loadImage("assets/cha/mayan_chinese1.svg");
  images[2] = loadImage("assets/cha/mayan_chinese2.svg");
  images[3] = loadImage("assets/cha/mayan_chinese3.svg");
  images[4] = loadImage("assets/cha/mayan_chinese4.svg");
  images[5] = loadImage("assets/cha/mayan_chinese5.svg");
  images[6] = loadImage("assets/cha/mayan_chinese6.svg");
  images[7] = loadImage("assets/cha/mayan_chinese7.svg");
  images[8] = loadImage("assets/cha/mayan_chinese8.svg");
  images[9] = loadImage("assets/cha/mayan_chinese9.svg");
  images[10] = loadImage("assets/cha/mayan_chinese10.svg");
  images[11] = loadImage("assets/cha/mayan_chinese11.svg");
  images[12] = loadImage("assets/cha/mayan_chinese12.svg");
  images[13] = loadImage("assets/cha/mayan_chinese13.svg");
  images[14] = loadImage("assets/cha/mayan_chinese14.svg");
  images[15] = loadImage("assets/cha/mayan_chinese15.svg");
  images[16] = loadImage("assets/cha/mayan_chinese16.svg");
  images[17] = loadImage("assets/cha/mayan_chinese17.svg");
  images[18] = loadImage("assets/cha/mayan_chinese18.svg");
  images[19] = loadImage("assets/cha/mayan_chinese19.svg");
  images[20] = loadImage("assets/cha/mayan_chinese20.svg");
  images[21] = loadImage("assets/cha/mayan_chinese21.svg");
  images[22] = loadImage("assets/cha/mayan_chinese22.svg");
  //images[23] = loadImage("assets/cha/mayan_chinese23.svg");
  
  for (let i = 0; i < 19; i++) {
    //test
  }
  
  function preload() {
    //test
  }
  
  sounds[3] = loadSound('assets/sounds/⛰️.mp3');
  sounds[6] = loadSound('assets/sounds/✋.mp3');
  sounds[22] = loadSound("assets/sounds/🔥.mp3");
  sounds[17] = loadSound("assets/sounds/🌧️.mp3");
  
}

function setup() {
  createCanvas(1800*scale, 1000*scale); // 创建画布
  
  // 计算图片的矩阵位置（10列2行）
  for (let i = 0; i < picNum; i++) {
    let row = Math.floor(i / numEachRow); // 计算当前图片所在的行
    let col = i % numEachRow; // 计算当前图片所在的列
    
    // 计算每张图片的 x 和 y 坐标
    let x = col * (picSizeX + padding) + firstXPadding; //i % 10 * (picSizeX + padding)
    let y = row * (picSizeY + padding + 20) + firstYPadding; 
    
    positions.push({ x, y });
  }

  // 创建保存按钮
  saveButton = createButton('📸');
  saveButton.size(380, 160); // 设置按钮大小
  saveButton.style('font-size', '50px'); // 设置字体大小
  saveButton.style('background-color', '#ddd'); // 设置按钮背景色
  saveButton.style('border', 'none'); // 去掉边框
  saveButton.style('border-radius', '10px'); // 圆角按钮
  saveButton.style('cursor', 'pointer'); // 设置鼠标样式为指针
  saveButton.position( 120, height + 520);  // 设置按钮位置，避免覆盖图片
  saveButton.mousePressed(saveImage); // 点击按钮时调用保存函数

  
  
  // 
  b1 = createButton('⭕️');
  b1.size(160, 160); // 设置按钮大小
  b1.style('font-size', '50px'); // 设置字体大小
  b1.style('background-color', '#ddd'); // 设置按钮背景色
  b1.style('border', 'none'); // 去掉边框
  b1.style('border-radius', '10px'); // 圆角按钮
  b1.style('cursor', 'pointer'); // 设置鼠标样式为指针
  b1.position( 120, height + 340);  // 设置按钮位置，避免覆盖图片
  b1.mousePressed(challenge); // 点击按钮时调用保存函数
  
  
  //
  confirmButton = createButton('');
  confirmButton.size(160, 160);
  confirmButton.style('font-size', '50px');
  confirmButton.style('background-color', '#ddd');
  confirmButton.style('border', 'none');
  confirmButton.style('border-radius', '10px');
  confirmButton.style('cursor', 'pointer');
  confirmButton.position(340, height + 340);
  
  
  //
  confirmButton = createButton('👌');
  confirmButton.size(160, 160);
  confirmButton.style('font-size', '50px');
  confirmButton.style('background-color', '#ddd');
  confirmButton.style('border', 'none');
  confirmButton.style('border-radius', '10px');
  confirmButton.style('cursor', 'pointer');
  confirmButton.position(340, height + 340);
  confirmButton.mousePressed(check);
  confirmButton.hide(); 
  
}

function draw() {
  // 显示背景图
  image(BGI, 0, 0, width, height); // 将背景图缩放到画布大小

  // 显示所有图片
  for (let i = 0; i < picNum; i++) {
    if (dragging === i) {
      // 改变正在拖动的图片的透明度，增加视觉效果
      tint(255, 150); // 增加透明度
    } else {
      noTint(); // 恢复正常显示
    }
    image(images[i], positions[i].x, positions[i].y, picSizeX, picSizeY); // 显示每张图片，在這裡改第一列、排位置
    
    
    if (showCha){
      textSize(100);
      text(chaDescriptions[currentLevel], width - 300, height - 100);
    }
    
  }

  // 如果保存成功，显示提示消息
  if (savedMessage) {
    textSize(100);
    // fill(240);
    text('📦', width / 2 - 100, height / 2);
  }

  
  
  // 显示文字註釋
  if (whichMouseIsOnIt !== -1){
    descriptionAlpha = lerp(descriptionAlpha, 255, 0.1); // 平滑增加透明度
  } else {
    descriptionAlpha = lerp(descriptionAlpha, 0, 0.1); // 平滑减少透明度
  }

  if (descriptionAlpha > 5){
    //框
    fill(230, descriptionAlpha);
    stroke(120, descriptionAlpha);
    rect(mouseX, mouseY - 50, 200, 90, 20);
    
    //字
    fill(60, descriptionAlpha);
    textSize(30);
    text(assembleDescriptions[whichMouseIsOnIt], mouseX + 40, mouseY + 5);
  }
  
}


// 鼠标按下时，判断是否点击到了图片
function mousePressed(){
  for (let i = 0; i < picNum; i++){
    let d = dist(mouseX, mouseY, positions[i].x + picSizeX/2, positions[i].y + picSizeY/2); // 计算鼠标和图片中心的距离
    if (d < 80) { // 如果鼠标点击到了某张图片的范围内，开始拖动该图片
      dragging = i; // 记录正在拖动的图片索引
      break; // 找到第一张被点击的图片后，退出循环
      //dragging = -1; // 停止拖动，重置拖动状态
    }
  }
}

// 鼠标拖动时更新图片的位置
function mouseDragged() {
  
  if (dragging !== -1) { // 如果有图片正在拖动
    positions[dragging].x = mouseX - picSizeX/2; // 更新被拖动图片的 x 位置
    positions[dragging].y = mouseY - picSizeY/2; // 更新被拖动图片的 y 位置
  }
}

// 鼠标松开时停止拖动
function mouseReleased() {
  dragging = -1; // 停止拖动，重置拖动状态
}


// 鼠标是否悬停(若是，则启动定时器)
function mouseMoved() {
  let found = false;
  
  for (let i = 0; i < picNum; i++) {
    let d = dist(mouseX, mouseY, positions[i].x + picSizeX/2, positions[i].y + picSizeY/2); // 计算鼠标和图片中心的距离
    
    if (d < 80) { // 如果鼠标悬停在图片范围内
      
      //播放声音
      if(soundIndex !== -1){//如果有在播放的话，暂停前面的声音
        validSounds.forEach(i => sounds[i].stop());
      }
      if (validSounds.includes(i)) {//如果i包含在vs，则
        soundIndex = i;
        sounds[soundIndex].play();
      }
      
      //显示注释
      if (whichMouseIsOnIt !== i) { //三元运算符？？？
        clearTimeout(hoverTimeout); // 清除上一次的定时器
        const delay = (whichMouseIsOnIt === -1) ? timeToShowWhenTheMouseOnIt : 0; // 根据条件设置延迟时间
        hoverTimeout = setTimeout(() => {
          whichMouseIsOnIt = i; // 设置悬停的图片索引
        }, delay);
      }

//     if (whichMouseIsOnIt !== i) {
//       clearTimeout(hoverTimeout); 
        
//       if (whichMouseIsOnIt == -1){
//           hoverTimeout = setTimeout(() => {
//           whichMouseIsOnIt = i; // 在定时器中设置悬停的图片索引
//           }, 1000); // 延迟x秒
//         }
        
//       if (whichMouseIsOnIt !== -1){
//           hoverTimeout = setTimeout(() => {
//           whichMouseIsOnIt = i; // 在定时器中设置悬停的图片索引
//           }, 0); // 延迟x秒
//         }
//      }
      
      found = true;
      break;
    }
  }
  if (!found) { // 如果鼠标没有悬停在任何图片上
    whichMouseIsOnIt = -1; // 隐藏文字描述
    clearTimeout(hoverTimeout); // 清除定时器
    
    //暂停所有声音
    validSounds.forEach(i => sounds[i].stop());
    //sounds[0].stop();
    //sounds[3].stop();
  }
}


// 保存当前画布为图片
function saveImage() {
  saveCanvas('晚安，地球人...', 'png'); // 保存为 PNG 文件
  delay(300);
  savedMessage = true; // 显示保存成功的提示
  setTimeout(() => savedMessage = false, 2000); // 2秒后隐藏提示
}

function challenge(){

  alert(levelDescriptions[currentLevel]);

  showCha = true;
  
  confirmButton.show(); // 显示确认按钮
  //console.log("challengeworked")
  
}

function check(){
  console.log(currentLevel);
  
  if (currentLevel==0){ //第一关床
    let cha1 = 10;
    let cha2 = 9;
    if(positions[cha1].x < positions[cha2].x && areTheyMoved(cha1, cha2) && areTheyConnected(cha1, cha2)){ //通关判断：if (cha1 在 cha2 左边；cha1不在innitial position； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("10",currentLevel+1)
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("00",currentLevel+1)
    }
  }
  
  
  if (currentLevel==1){ //第二关
    let cha1 = 19;
    let cha2 = 20;
    if(positions[cha1].y < positions[cha2].y && areTheyMoved(cha1, cha2) && areTheyConnected(cha1, cha2)){ //通关判断：if (cha1 在 cha2 上边；cha1不在innitial position,x轴有移动过； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("10",currentLevel+1)
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("00",currentLevel+1)
    }
  }
  
  
  if (currentLevel==2){ //第三关
    let cha1 = 6;
    let cha2 = 11;
    if(positions[cha1].y < positions[cha2].y && areTheyMoved(cha1, cha2) && areTheyConnected(cha1, cha2)){ //通关判断：if (cha1 在 cha2 上边；cha1不在innitial position,x轴有移动过； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("103")
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("003")
    }
  }
  
  
  if (currentLevel==3){ //第4关月
    let cha1 = 2;
    //let cha2 = 2;
    if(positions[cha1].x !== cha1 % 10 * (picSizeX + padding) ){ //通关判断：if (cha1 在 cha2 上边；cha1不在innitial position,x轴有移动过； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("104")
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("004")
    }
  }
  
  
  
  if (currentLevel==4){ //第5关光
    let cha1 = 22;
    let cha2 = 18;
    if(positions[cha1].y < positions[cha2].y && positions[cha1].x > positions[cha2].x && areTheyMoved(cha1, cha2) && areTheyConnected(cha1, cha2)){ //通关判断：if (cha1 在 cha2 上边；cha1 在 2 的右边；cha1不在innitial position,x轴有移动过； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("105")
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("005")
    }
  }
  
  if (currentLevel==5){ //第6关 疑
    let cha1 = 23;
    let cha2 = 21;
    if(positions[cha1].x < positions[cha2].x && areTheyMoved(cha1, cha2) && areTheyConnected(cha1, cha2)){ //通关判断：if (cha1 在 cha2 左边；cha1不在innitial position； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("106")
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("006")
    }
  }
  
  
  //第七关 是
  
  
   if (currentLevel==7){ //第8关 still working 地
    let cha1 = 1;
    let cha2 = 8;
    if(positions[cha1].x < positions[cha2].x && areTheyMoved(cha1, cha2) && areTheyConnected(cha1, cha2)){ //通关判断：if (cha1 在 cha2 左边；cha1不在innitial position； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("10",currentLevel+1)
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("00",currentLevel+1)
    }
  }
  
  
    if (currentLevel==8){ //第9关上
    let cha1 = 0;
    let cha2 = 0;
    if(areTheyMoved(cha1)){ //通关判断：if (cha1 在 cha2 上边；cha1不在innitial position,x轴有移动过； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("10",currentLevel+1)
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("00",currentLevel+1)
    }
  }
  
  
  
    if (currentLevel==9){ //第10关霜
    let cha1 = 17;
    let cha2 = 0;
    if(areTheyMoved(cha1)){ //通关判断：if (cha1 在 cha2 上边；cha1不在innitial position,x轴有移动过； cha2 也不在； x轴差值小于100； y也是)
      alert("✅");
      console.log("10",currentLevel+1)
      currentLevel += 1;
      return;
    } else {
      alert("❌");
      console.log("00",currentLevel+1)
    }
  }
  
  
  if(currentLevel>5){
    alert('~~~~~~~!!! 🎉');
  }
  
}

function areTheyMoved(cha1, cha2) { // 通关条件判断
  return positions[cha1].x !== cha1 % 10 * (picSizeX + padding) && positions[cha2].x !== cha2 % 10 * (picSizeX + padding);
}

function areTheyConnected(cha1, cha2) {
  //return abs(positions[cha1].x - positions[cha2].x) < 100 && abs(positions[cha1].y - positions[cha2].y) < 100;
  return dist(positions[cha1].x, positions[cha1].y, positions[cha2].x, positions[cha2].y) < 141;
}
