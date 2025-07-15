const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const saveBtn = document.getElementById("saveBtn");
const prizeInput = document.getElementById("prizeInput");
const result = document.getElementById("result");

// 讓指針對應到 270 度（上方）
const pointerAngle = Math.PI * 1.5;  // 即 270 度

const RADIUS = 150;
let prizes = [];
let angleOffset = 0;
let spinning = false;

// 畫轉盤
function drawWheel() {
  ctx.clearRect(0, 0, 300, 300);

  if (prizes.length === 0) return;

  const arc = (2 * Math.PI) / prizes.length;

  for (let i = 0; i < prizes.length; i++) {
    const angle = i * arc + angleOffset;

    // 畫扇形區塊（無背景）
    ctx.beginPath();
    ctx.moveTo(RADIUS, RADIUS);
    ctx.arc(RADIUS, RADIUS, RADIUS, angle, angle + arc);
    ctx.closePath();
    ctx.stroke();

    // 畫文字
    ctx.save();
    ctx.translate(RADIUS, RADIUS);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "14px sans-serif";
    ctx.fillText(prizes[i], RADIUS - 10, 5);
    ctx.restore();
  }
}

// 轉動畫面
function spinWheel() {
  if (spinning || prizes.length === 0) return;
  spinning = true;
  result.textContent = "";

  const arc = (2 * Math.PI) / prizes.length;
  const randIndex = Math.floor(Math.random() * prizes.length);

  // 上方指針的角度（270 度）
  const pointerAngle = Math.PI * 1.5;

  // 調整轉盤轉動的最終角度，讓中獎扇區對齊指針
  const targetAngle = randIndex * arc + arc / 2;
  const finalAngle = Math.PI * 2 * 5 + pointerAngle - targetAngle;

  const duration = 4000;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutCubic(progress);

    angleOffset = finalAngle * ease;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      result.textContent = `🎉 恭喜你抽中：${prizes[randIndex]}！`;
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// 儲存獎項
saveBtn.addEventListener("click", () => {
  prizes = prizeInput.value.split(",").map(p => p.trim()).filter(p => p);
  localStorage.setItem("prizeList", prizes.join(","));
  angleOffset = 0;
  drawWheel();
  alert("✅ 獎項已儲存！");
});

// 載入獎項
function loadPrizes() {
  const saved = localStorage.getItem("prizeList");
  if (saved) {
    prizes = saved.split(",").map(p => p.trim()).filter(p => p);
    prizeInput.value = prizes.join(", ");
    drawWheel();
  }
}

spinBtn.addEventListener("click", spinWheel);

loadPrizes();
