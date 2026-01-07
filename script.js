// Set the unlock and lock times
const unlockTime = new Date('2026-03-09T00:01:00').getTime();
const lockTime = new Date('2026-03-09T23:56:00').getTime(); // 23 hours 55 minutes window

// Calculate the start time for progress calculation (e.g., from now or a specific date)
const progressStartTime = new Date('2026-01-06T00:00:00').getTime(); // Current date

// Get page elements
const lockPage = document.getElementById('lockPage');
const contentPage = document.getElementById('contentPage');
const expiredPage = document.getElementById('expiredPage');

// Get countdown elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const timeLeftEl = document.getElementById('timeLeft');
const progressFillEl = document.getElementById('progressFill');

// Function to pad numbers with leading zero
function padNumber(num) {
    return num.toString().padStart(2, '0');
}

// Function to update countdown
function updateCountdown() {
    const now = new Date().getTime();
    
    // Check if we're in the active period (between 12:01 AM and 12:55 AM on March 9, 2026)
    if (now >= unlockTime && now < lockTime) {
        // Show content page
        lockPage.classList.add('hidden');
        contentPage.classList.remove('hidden');
        expiredPage.classList.add('hidden');
        
        // Update time remaining
        const timeRemaining = lockTime - now;
        const minutesLeft = Math.floor(timeRemaining / (1000 * 60));
        const secondsLeft = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        timeLeftEl.textContent = `${minutesLeft} minutes ${secondsLeft} seconds`;
        
        // Check every second
        setTimeout(updateCountdown, 1000);
    } 
    // Check if time has expired
    else if (now >= lockTime) {
        // Show expired page
        lockPage.classList.add('hidden');
        contentPage.classList.add('hidden');
        expiredPage.classList.remove('hidden');
    }
    // Show lock page with countdown
    else {
        lockPage.classList.remove('hidden');
        contentPage.classList.add('hidden');
        expiredPage.classList.add('hidden');
        
        // Calculate time until unlock
        const distance = unlockTime - now;
        
        if (distance < 0) {
            // If somehow we're here but time is negative, refresh
            setTimeout(updateCountdown, 100);
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown display
        daysEl.textContent = padNumber(days);
        hoursEl.textContent = padNumber(hours);
        minutesEl.textContent = padNumber(minutes);
        secondsEl.textContent = padNumber(seconds);
        
        // Calculate and update progress bar (percentage of time passed)
        const totalWaitTime = unlockTime - progressStartTime;
        const timePassed = now - progressStartTime;
        const progressPercentage = Math.min((timePassed / totalWaitTime) * 100, 100);
        
        if (progressFillEl) {
            progressFillEl.style.width = progressPercentage.toFixed(2) + '%';
        }
        
        // Update every second
        setTimeout(updateCountdown, 1000);
    }
}

// Start the countdown when page loads
updateCountdown();

// Add some interactive sparkles
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.width = '3px';
    sparkle.style.height = '3px';
    sparkle.style.background = 'white';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleAnimation 2s ease-in-out forwards';
    sparkle.style.zIndex = '0';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

// Add sparkle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create sparkles periodically
setInterval(createSparkle, 500);
