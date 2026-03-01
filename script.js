let tokens = Number(localStorage.getItem("tokens")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let upgradeLevel = Number(localStorage.getItem("upgradeLevel")) || 1;
let lastBonus = localStorage.getItem("lastBonus") || 0;

const tokenEl = document.getElementById("tokens");
const upgradeEl = document.getElementById("upgrade");
const bonusText = document.getElementById("bonusText");

function save() {
  localStorage.setItem("tokens", tokens);
  localStorage.setItem("clickPower", clickPower);
  localStorage.setItem("upgradeLevel", upgradeLevel);
  localStorage.setItem("lastBonus", lastBonus);
}

function updateUI() {
  tokenEl.textContent = tokens;
  upgradeEl.textContent = upgradeLevel;
  save();
}

document.getElementById("clickBtn").onclick = () => {
  tokens += clickPower;
  updateUI();
};

function spinSlot() {
  if (tokens < 10) return alert("Nema tokena");
  tokens -= 10;

  const s = ["🍒","🍋","💎","7️⃣"];
  const a = s[Math.floor(Math.random()*4)];
  const b = s[Math.floor(Math.random()*4)];
  const c = s[Math.floor(Math.random()*4)];

  document.getElementById("slotResult").textContent = `${a} ${b} ${c}`;

  if (a===b && b===c) {
    tokens += 50;
    alert("🎉 JACKPOT +50");
  }
  updateUI();
}

function buyUpgrade() {
  if (tokens < 50) return alert("Nema tokena");
  tokens -= 50;
  upgradeLevel++;
  clickPower++;
  updateUI();
}

function dailyBonus() {
  const now = Date.now();
  if (now - lastBonus < 86400000) {
    bonusText.textContent = "Dođi sutra ⏳";
    return;
  }
  tokens += 25;
  lastBonus = now;
  bonusText.textContent = "+25 tokena ✔";
  updateUI();
}

/* VIP IMAGES */
const girls = ["images/girl1.jpg","images/girl2.jpg","images/girl3.jpg"];
let gi = 0;
setInterval(()=>{
  gi = (gi+1)%girls.length;
  document.getElementById("girlImage").src = girls[gi];
},5000);

/* Telegram */
if (window.Telegram?.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

updateUI();
