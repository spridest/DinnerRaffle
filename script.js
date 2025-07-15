const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const spinBtn = document.getElementById("spinBtn");

// 對應每個角度區段的獎品
const prizes = ["iPhone", "AirPods", "電動牙刷", "再接再厲", "Switch", "100元禮券"];

let spinning = false;

spinBtn.addEventListener("click", () => {
  if (spinning) return;

  spinning = true;
  result.textContent = "";

  // 隨機角度（至少轉幾圈 + 停在某一格）
  const segment = 360 / prizes.length;
  const randIndex = Math.floor(Math.random() * prizes.length);
  const endDeg = 360 * 5 + (360 - randIndex * segment - segment / 2);

  wheel.style.transform = `rotate(${endDeg}deg)`;

  setTimeout(() => {
    result.textContent = `🎉 恭喜你抽中：${prizes[randIndex]}！`;
    spinning = false;
  }, 4000);
});
