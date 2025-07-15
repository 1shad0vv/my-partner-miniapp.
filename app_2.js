// Patch: adjust onboarding next logic and remove prefill of login inputs
function handleOnboardingNext(e) {
  e.preventDefault();
  if (currentOnboardingSlide === 1) {
    showOnboardingSlide(2);
  } else {
    // Either slide 2 or 3 -> go to login directly
    showScreen('login-screen');
  }
}

// Update loadUserData to not prefill login fields
function loadUserData() {
  const today = new Date().toISOString().split('T')[0];
  const matchDateInput = document.getElementById('match-date');
  const matchTimeInput = document.getElementById('match-time');
  if (matchDateInput) {
    matchDateInput.min = today;
    matchDateInput.value = today;
  }
  if (matchTimeInput) {
    matchTimeInput.value = '19:00';
  }
}