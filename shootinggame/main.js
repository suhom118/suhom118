let canvas;
let ctx;
let score = 0;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);
// 이미지
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
//게임오버 true되면 게임이 끝남
let gameOver = false;
// 우주선좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;
let bulletList = []; //총알들을 저장하는 리스트
function Bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX + 27;
    this.y = spaceshipY - 20;
    this.alive = true; //true면 살아있는총알
    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 5;
  };
  //총알 판정
  this.checkHit = function () {
    for (let i = 0; i < enemyList.length; i++) {
      if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 40) {
        //총알이 죽게됨 적군의 우주선이없어짐 점수획득
        score++;
        this.alive = false; //죽은총알
        enemyList.splice(i, 1);
        console.log(score);
      }
    }
  };
}

function generateRandomvalue(min, max) {
  let randomNum = Math.floor(Math.random() * (max + 1) + min);
  return randomNum;
}
let enemyList = [];
function Enemy() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomvalue(0, canvas.width - 64);
    enemyList.push(this);
  };
  this.update = function () {
    this.y += 0.5; //적군의속도

    if (this.y >= canvas.height - 48) {
      gameOver = true;
      console.log("gameover");
    }
  };
}
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.png";
  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";
  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";
  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";
  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.png";
}
// 방향키를누르면
let keysDown = {};
function setupKeyboardListner() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    console.log("눌린키", keysDown);
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];
    console.log("눌린키", keysDown);

    if (event.key == " ") {
      createBullet();
    }
  });
}
function createBullet() {
  // 총알생성
  console.log("총알생성");
  let b = new Bullet();
  b.init();
  console.log("새로운총알리스트", bulletList);
}
function createEnemy() {
  const interval = setInterval(function () {
    let e = new Enemy();
    e.init();
  }, 500);
}
function update() {
  if ("ArrowRight" in keysDown) {
    spaceshipX += 1; //우주선의속도
  } //right
  if ("ArrowLeft" in keysDown) {
    spaceshipX -= 1; //우주선의속도
  } //right
  //   우주선의 좌표값이 경기장안에만 있게하려면
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }
  //  총알의 y좌표 업데이트하는함수호출
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }
  //적군y좌표
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText('Score:', 40, 40);
  ctx.fillText(score, 140, 40);
  ctx.fillStyle = "white";
  ctx.font = "30px Gulim";
  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }
  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}
function main() {
  if (!gameOver) {
    update(); //좌표값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 0, 100);
  }
}
loadImage();
setupKeyboardListner();
createEnemy();
main();

// 우주선의 xy좌표가바뀌고
// 다시render

//총알만들기
//1.스페이스바를 누르면 총알발사
//2.총알의 y값이 줄어들고 x값은 스페이스를누른순간의우주선의 x좌표
//3.발사된 총알들은총알 배열에 저장
//4.총알들은 xy값이 있어야한다
//5.총알 배열을 가지고 render

//적군은 위치가랜덤하다
//적군은 밑으로 내려온다,x,y,init,update
//1초마다 하나씩 적군이 나온다
//적군의 우주선이 바닥에 닿으면 게임오버
//적군과 총알이 만나면 우주선이 사라진다 1점획득
//(총알y<=적군y and 총알x>=적군x and 총알x<=적군x+적군넓이
