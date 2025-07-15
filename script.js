const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const spinBtn = document.getElementById("spinBtn");
const prizeInput = document.getElementById("prizeInput");
const saveBtn = document.getElementById("saveBtn");

let prizes = []; // 儲存獎項
let spinning = false;

// 從 localStorage 載入獎項
function loadPrizes() {
  const saved = localStorage.getItem("prizeList");
  if (saved) {
    prizes = saved.split(",").map(p => p.trim()).filter(p => p);
    prizeInput.value = prizes.join(", ");
  }
}

// 儲存獎項到 localStorage
function savePrizes() {
  const input = prizeInput.value;
  prizes = input.split(",").map(p => p.trim()).filter(p => p);
  localStorage.setItem("prizeList", prizes.join(","));
  alert("✅ 獎項已儲存！");
}

saveBtn.addEventListener("click", savePrizes);

spinBtn.addEventListener("click", () => {
  if (spinning || prizes.length === 0) {
    alert("請先設定並儲存至少一個獎項！");
    return;
  }

  spinning = true;
  result.textContent = "";

  const segment = 360 / prizes.length;
  const randIndex = Math.floor(Math.random() * prizes.length);
  const endDeg = 360 * 5 + (360 - randIndex * segment - segment / 2);

  wheel.style.transform = `rotate(${endDeg}deg)`;

  setTimeout(() => {
    result.textContent = `🎉 恭喜你抽中：${prizes[randIndex]}！`;
    spinning = false;
  }, 4000);
});

// 初始載入
loadPrizes();
