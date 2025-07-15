// Application data
const appData = {
  currentUser: {
    id: 1,
    name: "Иван Иванов", 
    rating: 1.65,
    matches: 15,
    wins: 8,
    losses: 7,
    city: "Москва",
    country: "Россия",
    description: ""
  },
  players: [
    {"id": 1, "name": "Иван Иванов", "rating": 1.65, "wins": 8, "losses": 7, "city": "Москва", "country": "Россия"},
    {"id": 2, "name": "Петр Петров", "rating": 1.72, "wins": 12, "losses": 5, "city": "Москва", "country": "Россия"},
    {"id": 3, "name": "Анна Сидорова", "rating": 1.58, "wins": 6, "losses": 9, "city": "СПб", "country": "Россия"},
    {"id": 4, "name": "Мария Козлова", "rating": 1.42, "wins": 4, "losses": 8, "city": "Москва", "country": "Россия"},
    {"id": 5, "name": "Алексей Смирнов", "rating": 1.85, "wins": 15, "losses": 3, "city": "Казань", "country": "Россия"},
    {"id": 6, "name": "Елена Волкова", "rating": 1.38, "wins": 3, "losses": 7, "city": "Москва", "country": "Россия"},
    {"id": 7, "name": "Дмитрий Орлов", "rating": 1.69, "wins": 9, "losses": 6, "city": "СПб", "country": "Россия"},
    {"id": 8, "name": "Ольга Новикова", "rating": 1.54, "wins": 7, "losses": 8, "city": "Москва", "country": "Россия"},
    {"id": 9, "name": "Сергей Попов", "rating": 1.92, "wins": 18, "losses": 4, "city": "Казань", "country": "Россия"},
    {"id": 10, "name": "Татьяна Морозова", "rating": 1.46, "wins": 5, "losses": 6, "city": "Москва", "country": "Россия"}
  ],
  matches: [
    {
      "id": 1,
      "title": "Вечерний матч в центре",
      "date": "2025-07-16",
      "time": "19:00", 
      "location": "Спорт-клуб Центральный",
      "minRating": 1.4,
      "maxRating": 1.8,
      "players": [
        {"id": 2, "name": "Петр Петров", "rating": 1.72},
        {"id": 7, "name": "Дмитрий Орлов", "rating": 1.69}
      ],
      "neededPlayers": 2
    },
    {
      "id": 2,
      "title": "Утренний матч для новичков",
      "date": "2025-07-17",
      "time": "10:00",
      "location": "Корт Солнечный", 
      "minRating": 1.0,
      "maxRating": 1.5,
      "players": [
        {"id": 4, "name": "Мария Козлова", "rating": 1.42},
        {"id": 6, "name": "Елена Волкова", "rating": 1.38},
        {"id": 10, "name": "Татьяна Морозова", "rating": 1.46}
      ],
      "neededPlayers": 1
    },
    {
      "id": 3,
      "title": "Профессиональный матч",
      "date": "2025-07-18",
      "time": "18:30",
      "location": "Теннисный клуб Элита",
      "minRating": 1.7,
      "maxRating": 2.0,
      "players": [
        {"id": 5, "name": "Алексей Смирнов", "rating": 1.85},
        {"id": 9, "name": "Сергей Попов", "rating": 1.92}
      ],
      "neededPlayers": 2
    }
  ]
};

// Current state
let currentScreen = 'splash';
let currentMatch = null;
let onboardingStep = 1;
let currentRankingTab = 'city';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('App initializing...');
  
  // Initialize Telegram Web App
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
  
  // Show splash screen for 2 seconds
  setTimeout(() => {
    console.log('Moving to onboarding...');
    showScreen('onboarding1');
  }, 2000);
  
  // Set default date for match creation
  const today = new Date().toISOString().split('T')[0];
  const matchDateInput = document.getElementById('matchDate');
  if (matchDateInput) {
    matchDateInput.value = today;
  }
  
  // Initialize theme
  initializeTheme();
});

// Screen navigation
function showScreen(screenId) {
  console.log('Showing screen:', screenId);
  
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.add('hidden');
  });
  
  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.remove('hidden');
    targetScreen.classList.add('fade-in');
    currentScreen = screenId;
    
    // Update screen-specific content
    updateScreenContent(screenId);
  } else {
    console.error('Screen not found:', screenId);
  }
}

function updateScreenContent(screenId) {
  switch(screenId) {
    case 'search-matches':
      loadMatches();
      break;
    case 'profile':
      loadProfile();
      break;
    case 'edit-profile':
      loadEditProfile();
      break;
    case 'rankings':
      loadRankings();
      break;
    case 'match-details':
      loadMatchDetails();
      break;
  }
}

// Make functions globally available
window.nextOnboarding = function() {
  console.log('Next onboarding step:', onboardingStep);
  onboardingStep++;
  if (onboardingStep === 2) {
    showScreen('onboarding2');
  } else if (onboardingStep === 3) {
    showScreen('onboarding3');
  } else {
    showLogin();
  }
};

window.showLogin = function() {
  console.log('Showing login screen');
  showScreen('login');
};

window.loginTelegram = function() {
  console.log('Telegram login');
  // Simulate Telegram login
  setTimeout(() => {
    showMainMenu();
  }, 500);
};

window.showMainMenu = function() {
  console.log('Showing main menu');
  showScreen('main-menu');
};

// Main menu navigation functions
window.showSearchMatches = function() {
  console.log('Showing search matches');
  showScreen('search-matches');
};

window.showCreateMatch = function() {
  console.log('Showing create match');
  showScreen('create-match');
};

window.showProfile = function() {
  console.log('Showing profile');
  showScreen('profile');
};

window.showEditProfile = function() {
  console.log('Showing edit profile');
  showScreen('edit-profile');
};

window.showRankings = function() {
  console.log('Showing rankings');
  showScreen('rankings');
};

window.showSettings = function() {
  console.log('Showing settings');
  showScreen('settings');
};

window.showMatchDetails = function() {
  console.log('Showing match details');
  showScreen('match-details');
};

window.showChat = function() {
  console.log('Showing chat');
  showScreen('chat');
};

// Matches functionality
function loadMatches() {
  console.log('Loading matches...');
  const matchesList = document.getElementById('matches-list');
  if (!matchesList) {
    console.error('Matches list element not found');
    return;
  }
  
  matchesList.innerHTML = '';
  
  appData.matches.forEach(match => {
    const matchCard = createMatchCard(match);
    matchesList.appendChild(matchCard);
  });
}

function createMatchCard(match) {
  const card = document.createElement('div');
  card.className = 'match-card';
  card.onclick = () => {
    console.log('Match clicked:', match.id);
    currentMatch = match;
    showMatchDetails();
  };
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long',
      weekday: 'short'
    });
  };
  
  card.innerHTML = `
    <div class="match-title">${match.title}</div>
    <div class="match-meta">
      <span>📅 ${formatDate(match.date)}</span>
      <span>🕐 ${match.time}</span>
      <span>📍 ${match.location}</span>
    </div>
    <div class="match-players">
      <div style="font-size: 12px; color: var(--tg-theme-hint-color); margin-bottom: 8px;">
        Участники:
      </div>
      ${match.players.map(player => `
        <div class="match-player">
          <span>👤 ${player.name}</span>
          <span class="player-rating">${player.rating}</span>
        </div>
      `).join('')}
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
      <span class="needed-players">Нужно: ${match.neededPlayers} игрока</span>
      <span style="font-size: 12px; color: var(--tg-theme-hint-color);">
        Рейтинг: ${match.minRating} - ${match.maxRating}
      </span>
    </div>
  `;
  
  return card;
}

window.filterMatches = function() {
  console.log('Filtering matches...');
  const minRating = parseFloat(document.getElementById('minRating').value);
  const maxRating = parseFloat(document.getElementById('maxRating').value);
  
  const filteredMatches = appData.matches.filter(match => {
    return match.minRating >= minRating && match.maxRating <= maxRating;
  });
  
  const matchesList = document.getElementById('matches-list');
  matchesList.innerHTML = '';
  
  if (filteredMatches.length === 0) {
    matchesList.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--tg-theme-hint-color);">Матчи не найдены</div>';
    return;
  }
  
  filteredMatches.forEach(match => {
    const matchCard = createMatchCard(match);
    matchesList.appendChild(matchCard);
  });
};

// Match details
function loadMatchDetails() {
  console.log('Loading match details for:', currentMatch);
  if (!currentMatch) return;
  
  const matchInfo = document.getElementById('match-info');
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long',
      weekday: 'long'
    });
  };
  
  matchInfo.innerHTML = `
    <h3>${currentMatch.title}</h3>
    
    <div class="match-detail">
      <div class="match-detail-icon">📅</div>
      <div class="match-detail-text">
        <div class="match-detail-label">Дата</div>
        <div class="match-detail-value">${formatDate(currentMatch.date)}</div>
      </div>
    </div>
    
    <div class="match-detail">
      <div class="match-detail-icon">🕐</div>
      <div class="match-detail-text">
        <div class="match-detail-label">Время</div>
        <div class="match-detail-value">${currentMatch.time}</div>
      </div>
    </div>
    
    <div class="match-detail">
      <div class="match-detail-icon">📍</div>
      <div class="match-detail-text">
        <div class="match-detail-label">Место</div>
        <div class="match-detail-value">${currentMatch.location}</div>
      </div>
    </div>
    
    <div class="match-detail">
      <div class="match-detail-icon">⭐</div>
      <div class="match-detail-text">
        <div class="match-detail-label">Рейтинг</div>
        <div class="match-detail-value">${currentMatch.minRating} - ${currentMatch.maxRating}</div>
      </div>
    </div>
    
    <div class="match-detail">
      <div class="match-detail-icon">👥</div>
      <div class="match-detail-text">
        <div class="match-detail-label">Нужно игроков</div>
        <div class="match-detail-value">${currentMatch.neededPlayers}</div>
      </div>
    </div>
    
    <div class="match-players-section">
      <h4>Участники матча:</h4>
      ${currentMatch.players.map(player => `
        <div class="match-player-card">
          <div class="match-player-avatar">👤</div>
          <div class="match-player-info">
            <div class="match-player-name">${player.name}</div>
            <div class="match-player-rating">⭐ ${player.rating}</div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <button class="chat-button" onclick="showChat()">
      💬 Открыть чат матча
    </button>
  `;
}

// Create match
window.createMatch = function() {
  console.log('Creating match...');
  const title = document.getElementById('matchTitle').value;
  const date = document.getElementById('matchDate').value;
  const time = document.getElementById('matchTime').value;
  const location = document.getElementById('matchLocation').value;
  const minRating = parseFloat(document.getElementById('createMinRating').value);
  const maxRating = parseFloat(document.getElementById('createMaxRating').value);
  
  if (!title || !date || !time || !location) {
    alert('Пожалуйста, заполните все поля');
    return;
  }
  
  const newMatch = {
    id: appData.matches.length + 1,
    title,
    date,
    time,
    location,
    minRating,
    maxRating,
    players: [
      {
        id: appData.currentUser.id,
        name: appData.currentUser.name,
        rating: appData.currentUser.rating
      }
    ],
    neededPlayers: 3
  };
  
  appData.matches.push(newMatch);
  
  // Show success message
  const form = document.querySelector('.create-form');
  form.innerHTML = `
    <div class="success-message">
      ✅ Матч успешно создан!
    </div>
    <button class="btn btn--primary btn--full-width" onclick="showMainMenu()">
      Вернуться в главное меню
    </button>
  `;
};

// Profile functionality
function loadProfile() {
  console.log('Loading profile...');
  const profileName = document.getElementById('profileName');
  const profileRating = document.getElementById('profileRating');
  const profileMatches = document.getElementById('profileMatches');
  const profileWins = document.getElementById('profileWins');
  const profileLosses = document.getElementById('profileLosses');
  const profileCity = document.getElementById('profileCity');
  const profileCountry = document.getElementById('profileCountry');
  
  if (profileName) profileName.textContent = appData.currentUser.name;
  if (profileRating) profileRating.textContent = appData.currentUser.rating;
  if (profileMatches) profileMatches.textContent = appData.currentUser.matches;
  if (profileWins) profileWins.textContent = appData.currentUser.wins;
  if (profileLosses) profileLosses.textContent = appData.currentUser.losses;
  if (profileCity) profileCity.textContent = appData.currentUser.city;
  if (profileCountry) profileCountry.textContent = appData.currentUser.country;
}

function loadEditProfile() {
  console.log('Loading edit profile...');
  const editName = document.getElementById('editName');
  const editCity = document.getElementById('editCity');
  const editDescription = document.getElementById('editDescription');
  
  if (editName) editName.value = appData.currentUser.name;
  if (editCity) editCity.value = appData.currentUser.city;
  if (editDescription) editDescription.value = appData.currentUser.description || '';
}

window.saveProfile = function() {
  console.log('Saving profile...');
  const name = document.getElementById('editName').value;
  const city = document.getElementById('editCity').value;
  const description = document.getElementById('editDescription').value;
  
  if (!name.trim()) {
    alert('Имя не может быть пустым');
    return;
  }
  
  appData.currentUser.name = name;
  appData.currentUser.city = city;
  appData.currentUser.description = description;
  
  // Update in players array
  const playerIndex = appData.players.findIndex(p => p.id === appData.currentUser.id);
  if (playerIndex !== -1) {
    appData.players[playerIndex].name = name;
    appData.players[playerIndex].city = city;
  }
  
  showProfile();
};

// Rankings functionality
function loadRankings() {
  console.log('Loading rankings...');
  showRankingTab(currentRankingTab);
}

window.showRankingTab = function(tab) {
  console.log('Showing ranking tab:', tab);
  currentRankingTab = tab;
  
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.querySelector(`[onclick="showRankingTab('${tab}')"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
  
  // Filter and sort players
  let players = [...appData.players];
  
  if (tab === 'city') {
    players = players.filter(p => p.city === appData.currentUser.city);
  }
  
  players.sort((a, b) => b.rating - a.rating);
  
  const rankingsList = document.getElementById('rankings-list');
  if (!rankingsList) return;
  
  rankingsList.innerHTML = '';
  
  players.forEach((player, index) => {
    const rankingItem = document.createElement('div');
    rankingItem.className = 'ranking-item';
    
    if (player.id === appData.currentUser.id) {
      rankingItem.classList.add('current-user');
    }
    
    rankingItem.innerHTML = `
      <div class="ranking-position">${index + 1}</div>
      <div class="ranking-avatar">👤</div>
      <div class="ranking-info">
        <div class="ranking-name">${player.name}</div>
        <div class="ranking-city">${player.city}</div>
      </div>
      <div class="ranking-rating">${player.rating}</div>
    `;
    
    rankingsList.appendChild(rankingItem);
  });
};

// Settings functionality
window.changeTheme = function() {
  console.log('Changing theme...');
  const themeSelect = document.getElementById('themeSelect');
  if (!themeSelect) return;
  
  const theme = themeSelect.value;
  
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-color-scheme');
  } else {
    document.documentElement.setAttribute('data-color-scheme', theme);
  }
  
  // Save theme preference
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    console.log('Cannot save theme preference');
  }
};

// Initialize theme
function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
      themeSelect.value = savedTheme;
      changeTheme();
    }
  } catch (e) {
    console.log('Cannot load theme preference');
  }
}

// Chat functionality
window.sendMessage = function() {
  console.log('Sending message...');
  const messageInput = document.getElementById('messageInput');
  if (!messageInput) return;
  
  const message = messageInput.value.trim();
  
  if (!message) return;
  
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.innerHTML = `
    <span class="message-author">${appData.currentUser.name}:</span>
    <span class="message-text">${message}</span>
  `;
  
  chatMessages.appendChild(messageElement);
  messageInput.value = '';
  
  // Auto-scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Simulate response
  setTimeout(() => {
    const responses = [
      'Отлично! Увидимся на корте!',
      'Согласен, это хорошая идея',
      'Я буду готов к игре',
      'Давайте встретимся пораньше'
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const responseElement = document.createElement('div');
    responseElement.className = 'message';
    responseElement.innerHTML = `
      <span class="message-author">Петр Петров:</span>
      <span class="message-text">${randomResponse}</span>
    `;
    
    chatMessages.appendChild(responseElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
};

// Enhanced message input
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && currentScreen === 'chat') {
    const messageInput = document.getElementById('messageInput');
    if (document.activeElement === messageInput) {
      sendMessage();
    }
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && currentScreen !== 'main-menu' && currentScreen !== 'splash') {
    // Go back to previous screen
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
      backButton.click();
    }
  }
});

// Utility functions
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long',
    weekday: 'short'
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize match search with debounced filtering
const debouncedFilter = debounce(() => {
  if (typeof filterMatches === 'function') {
    filterMatches();
  }
}, 300);

// Add search functionality
document.addEventListener('input', function(e) {
  if (e.target.id === 'minRating' || e.target.id === 'maxRating') {
    debouncedFilter();
  }
});

// Touch and click enhancements
document.addEventListener('touchstart', function(e) {
  // Add touch feedback
  if (e.target.classList.contains('btn') || e.target.classList.contains('menu-card')) {
    e.target.style.transform = 'scale(0.98)';
  }
});

document.addEventListener('touchend', function(e) {
  // Remove touch feedback
  if (e.target.classList.contains('btn') || e.target.classList.contains('menu-card')) {
    setTimeout(() => {
      e.target.style.transform = '';
    }, 100);
  }
});

// Telegram Web App back button
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.BackButton.onClick(function() {
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
      backButton.click();
    }
  });
  
  // Show back button when not on main screens
  function updateBackButton() {
    if (['main-menu', 'splash', 'login'].includes(currentScreen)) {
      window.Telegram.WebApp.BackButton.hide();
    } else {
      window.Telegram.WebApp.BackButton.show();
    }
  }
  
  // Call updateBackButton on screen changes
  const originalShowScreen = showScreen;
  showScreen = function(screenId) {
    originalShowScreen(screenId);
    updateBackButton();
  };
}

console.log('App script loaded successfully');