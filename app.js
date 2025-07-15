// PadelMatch Mini App Logic
// Простая SPA без бэкенда, демонстрация навигации и фейковых данных

const data = {
  currentUser: {
    id: 1,
    name: "Simon",
    rating: 1200,
    wins: 0,
    losses: 15,
    matches: 15,
  },
  players: [
    { id: 1, name: "Иван Иванов", rating: 1650, level: "intermediate", wins: 8, losses: 7 },
    { id: 2, name: "Пётр Петров", rating: 1720, level: "advanced", wins: 12, losses: 5 },
    { id: 3, name: "Анна Сидорова", rating: 1580, level: "intermediate", wins: 6, losses: 9 },
    { id: 4, name: "Мария Козлова", rating: 1420, level: "beginner", wins: 4, losses: 8 },
    { id: 5, name: "Алексей Смирнов", rating: 1850, level: "advanced", wins: 15, losses: 3 },
    { id: 6, name: "Елена Волкова", rating: 1380, level: "beginner", wins: 3, losses: 7 },
    { id: 7, name: "Дмитрий Орлов", rating: 1690, level: "intermediate", wins: 9, losses: 6 },
    { id: 8, name: "Ольга Новикова", rating: 1540, level: "intermediate", wins: 7, losses: 8 },
    { id: 9, name: "Сергей Попов", rating: 1920, level: "advanced", wins: 18, losses: 4 },
    { id: 10, name: "Татьяна Морозова", rating: 1460, level: "beginner", wins: 5, losses: 6 },
  ],
  matchResult: {
    team1Score: 0,
    team2Score: 0,
  },
};

// --------------- Навигация по экранам -----------------
const screens = {};
function initScreens() {
  document.querySelectorAll(".screen").forEach((s) => (screens[s.id] = s));
}
function show(id) {
  Object.values(screens).forEach((s) => s.classList.add("hidden"));
  screens[id]?.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  initScreens();
  show("splash");
  setTimeout(() => show("onboarding1"), 1800);
  // Onboarding flow
  next1.onclick = () => show("onboarding2");
  next2.onclick = () => show("onboarding3");
  next3.onclick = () => show("login");
  loginBtn.onclick = () => show("mainMenu");
  // Меню
  document.querySelectorAll(".menu-card").forEach((c) => {
    c.addEventListener("click", () => {
      const target = c.dataset.screen;
      if (target === "search") {
        loadPlayers();
      }
      if (target === "rankings") {
        loadRankings();
      }
      show(target);
    });
  });
  // Back buttons
  document.querySelectorAll(".back-btn").forEach((b) => {
    b.addEventListener("click", () => show(b.dataset.screen));
  });

  matchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Матч создан!");
    show("mainMenu");
  });
  submitResult.addEventListener("click", () => {
    alert("Результат сохранён!");
    show("mainMenu");
  });

  // Search filters
  searchInput.addEventListener("input", filterPlayers);
  levelFilter.addEventListener("change", filterPlayers);

  updateProfile();
});

function updateProfile() {
  userName.textContent = data.currentUser.name;
  userRating.textContent = data.currentUser.rating;
}

function createPlayerCard(p) {
  const div = document.createElement("div");
  div.className = "player-card";
  div.innerHTML = `
    <div class="player-avatar">${p.name.charAt(0)}</div>
    <div class="player-info">
      <div class="player-name">${p.name}</div>
      <div class="player-rating">Рейтинг: ${p.rating}</div>
    </div>
  `;
  return div;
}

function loadPlayers() {
  playersList.innerHTML = "";
  data.players.filter((p) => p.id !== data.currentUser.id).forEach((p) => playersList.appendChild(createPlayerCard(p)));
}

function filterPlayers() {
  const term = searchInput.value.toLowerCase();
  const level = levelFilter.value;
  playersList.innerHTML = "";
  data.players
    .filter((p) => p.id !== data.currentUser.id)
    .filter((p) => p.name.toLowerCase().includes(term) && (!level || p.level === level))
    .forEach((p) => playersList.appendChild(createPlayerCard(p)));
}

function loadRankings() {
  rankingsList.innerHTML = "";
  [...data.players]
    .sort((a, b) => b.rating - a.rating)
    .forEach((p, i) => {
      const item = document.createElement("div");
      item.className = "ranking-item";
      item.innerHTML = `
        <div class="ranking-position">${i + 1}</div>
        <div class="ranking-avatar">${p.name.charAt(0)}</div>
        <div class="ranking-info">
          <div class="ranking-name">${p.name}</div>
          <div class="ranking-stats">${p.wins}П ${p.losses}П</div>
        </div>
        <div class="ranking-rating">${p.rating}</div>`;
      rankingsList.appendChild(item);
    });
}

function changeScore(team, delta) {
  data.matchResult[team + "Score"] = Math.max(0, data.matchResult[team + "Score"] + delta);
  document.getElementById(team + "Score").textContent = data.matchResult[team + "Score"];
}

// Telegram WebApp theme support (optional)
if (window.Telegram && Telegram.WebApp) {
  const tg = Telegram.WebApp;
  tg.ready();
  tg.expand();
}
