// app.js - логика приложения MyPartner

const data = {
  currentUser: {
    id: 1,
    name: "Иван Иванов",
    rating: 1.65,
    matches: 15,
    wins: 8,
    losses: 7,
    city: "Москва",
    country: "Россия"
  },
  players: [
    { id: 1, name: "Иван Иванов", rating: 1.65, wins: 8, losses: 7, city: "Москва", country: "Россия" },
    { id: 2, name: "Петр Петров", rating: 1.72, wins: 12, losses: 5, city: "Москва", country: "Россия" },
    { id: 3, name: "Анна Сидорова", rating: 1.58, wins: 6, losses: 9, city: "СПб", country: "Россия" },
    { id: 4, name: "Мария Козлова", rating: 1.42, wins: 4, losses: 8, city: "Москва", country: "Россия" },
    { id: 5, name: "Алексей Смирнов", rating: 1.85, wins: 15, losses: 3, city: "Казань", country: "Россия" },
    { id: 6, name: "Елена Волкова", rating: 1.38, wins: 3, losses: 7, city: "Москва", country: "Россия" },
    { id: 7, name: "Дмитрий Орлов", rating: 1.69, wins: 9, losses: 6, city: "СПб", country: "Россия" },
    { id: 8, name: "Ольга Новикова", rating: 1.54, wins: 7, losses: 8, city: "Москва", country: "Россия" },
    { id: 9, name: "Сергей Попов", rating: 1.92, wins: 18, losses: 4, city: "Казань", country: "Россия" },
    { id: 10, name: "Татьяна Морозова", rating: 1.46, wins: 5, losses: 6, city: "Москва", country: "Россия" }
  ],
  matches: [
    {
      id: 1,
      title: "Вечерний матч в центре",
      date: "2025-07-16",
      time: "19:00",
      location: "Спорт-клуб Центральный",
      minRating: 1.4,
      maxRating: 1.8,
      players: [
        { id: 2, name: "Петр Петров", rating: 1.72 },
        { id: 7, name: "Дмитрий Орлов", rating: 1.69 }
      ],
      neededPlayers: 2
    },
    {
      id: 2,
      title: "Утренний матч для новичков",
      date: "2025-07-17",
      time: "10:00",
      location: "Корт Солнечный",
      minRating: 1.0,
      maxRating: 1.5,
      players: [
        { id: 4, name: "Мария Козлова", rating: 1.42 },
        { id: 6, name: "Елена Волкова", rating: 1.38 },
        { id: 10, name: "Татьяна Морозова", rating: 1.46 }
      ],
      neededPlayers: 1
    },
    {
      id: 3,
      title: "Профессиональный матч",
      date: "2025-07-18",
      time: "18:30",
      location: "Теннисный клуб Элита",
      minRating: 1.7,
      maxRating: 2.0,
      players: [
        { id: 5, name: "Алексей Смирнов", rating: 1.85 },
        { id: 9, name: "Сергей Попов", rating: 1.92 }
      ],
      neededPlayers: 2
    }
  ]
};

// Управление экранами
const screens = {};
let currentScreen = 'splash';
function initScreens() {
  document.querySelectorAll('.screen').forEach(s => screens[s.id] = s);
}
function showScreen(id) {
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  screens[id]?.classList.remove('hidden');
  currentScreen = id;
  if (id === 'searchMatches') loadMatches();
  if (id === 'rankings') loadRankings();
}

document.addEventListener('DOMContentLoaded', () => {
  initScreens();
  showScreen('splash');
  setTimeout(() => showScreen('onboarding1'), 2000);
  ['next1','next2','next3'].forEach((id,i)=>{
    document.getElementById(id)?.addEventListener('click',()=>showScreen(['onboarding2','onboarding3','login'][i]));
  });
  document.getElementById('loginBtn')?.addEventListener('click',()=>showScreen('mainMenu'));
  document.querySelectorAll('.menu-card').forEach(c=>c.addEventListener('click',()=>showScreen(c.dataset.screen)));
  document.getElementById('matchForm')?.addEventListener('submit',e=>{e.preventDefault();alert('Матч создан успешно!');showScreen('mainMenu');});
  document.getElementById('profileForm')?.addEventListener('submit',e=>{e.preventDefault();data.currentUser.name=document.getElementById('editName').value;data.currentUser.city=document.getElementById('editCity').value;updateProfile();alert('Профиль обновлен!');showScreen('profile');});
  ['matchSearchInput','ratingFilter'].forEach(id=>document.getElementById(id)?.addEventListener('input',filterMatches));
  updateProfile();
});

function loadMatches() {
  const list=document.getElementById('matchesList');if(!list) return;list.innerHTML='';
  data.matches.forEach(m=>list.appendChild(createMatchCard(m)));
}
function createMatchCard(m){const card=document.createElement('div');card.className='match-card';card.innerHTML=`<div class="match-header"><div class="match-title">${m.title}</div><div class="match-rating">${m.minRating}-${m.maxRating}</div></div><div class="match-info"><div class="match-detail">📅 ${formatDate(m.date)} в ${m.time}</div><div class="match-detail">📍 ${m.location}</div></div><div class="match-players">${m.players.map(p=>`<span class='player-chip'>${p.name} (${p.rating})</span>`).join('')}</div><div class="needed-players">Нужно игроков: ${m.neededPlayers}</div>`;card.addEventListener('click',()=>showMatchDetails(m));return card;}
function showMatchDetails(m){const c=document.getElementById('matchDetailsContent');if(!c)return;c.innerHTML=`<div class='match-details-header'><div class='match-details-title'>${m.title}</div></div><div class='match-details-info'>${detailRow('Дата',formatDate(m.date))}${detailRow('Время',m.time)}${detailRow('Место',m.location)}${detailRow('Рейтинг',`${m.minRating}-${m.maxRating}`)}${detailRow('Нужно игроков',m.neededPlayers)}</div><div class='match-players-section'><div class='match-players-title'>Участники (${m.players.length}/4):</div><div class='player-list'>${m.players.map(p=>`<div class='player-item'><div class='player-avatar'>${p.name.charAt(0)}</div><div class='player-info'><div class='player-name'>${p.name}</div><div class='player-rating'>Рейтинг: ${p.rating}</div></div></div>`).join('')}</div></div><button class='chat-button' onclick='openChat()'>💬 Открыть чат</button>`;showScreen('matchDetails');}
function detailRow(l,v){return`<div class='detail-row'><span class='detail-label'>${l}:</span><span class='detail-value'>${v}</span></div>`;}
function openChat(){alert('Чат открыт! Здесь будет функция общения с участниками матча.');}
function filterMatches(){const q=document.getElementById('matchSearchInput').value.toLowerCase();const rf=document.getElementById('ratingFilter').value;const list=document.getElementById('matchesList');if(!list)return;list.innerHTML='';data.matches.filter(m=>{const search=m.title.toLowerCase().includes(q)||m.location.toLowerCase().includes(q);let rating=true;if(rf){const [min,max]=rf.split('-').map(parseFloat);rating=m.minRating>=min&&m.maxRating<=max;}return search&&rating;}).forEach(m=>list.appendChild(createMatchCard(m)));}
function loadRankings(){const list=document.getElementById('rankingsList');if(!list)return;list.innerHTML='';const sorted=[...data.players].sort((a,b)=>b.rating-a.rating);sorted.forEach((p,i)=>{const item=document.createElement('div');item.className='ranking-item';item.innerHTML=`<div class='ranking-position'>${i+1}</div><div class='ranking-avatar'>${p.name.charAt(0)}</div><div class='ranking-info'><div class='ranking-name'>${p.name}</div><div class='ranking-details'>${p.city} • ${p.wins}П ${p.losses}П<br>Город: ${getCityRank(p,sorted)} • Страна: ${i+1}</div></div><div class='ranking-rating'>${p.rating}</div>`;list.appendChild(item);});}
function getCityRank(p,arr){return arr.filter(pl=>pl.city===p.city).findIndex(pl=>pl.id===p.id)+1;}
function updateProfile(){document.getElementById('userName').textContent=data.currentUser.name;document.getElementById('userRating').textContent=data.currentUser.rating;document.getElementById('userCity').textContent=data.currentUser.city;}
function formatDate(d){return new Date(d).toLocaleDateString('ru-RU',{day:'numeric',month:'long'});}

if(window.Telegram&&window.Telegram.WebApp){const tg=window.Telegram.WebApp;tg.ready();tg.expand();}

// make helper accessible
autoplay=false;window.showScreen=showScreen;window.openChat=openChat;