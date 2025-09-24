// Create floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 6 + 's';
    heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
    document.getElementById('heartsContainer').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create hearts periodically
setInterval(createHeart, 2000);

// Show surprise function
function showSurprise() {
    const surpriseSection = document.getElementById('surpriseSection');
    surpriseSection.style.display = 'block';
    surpriseSection.scrollIntoView({ behavior: 'smooth' });
    createParticleExplosion(event);
}

// Play music function
function playMusic() {
    const audio = document.getElementById('loveAudio');
    audio.play().catch(e => {
        alert('Please add your favorite song file as "our-song.mp3" to make this work! 🎵');
    });
    createParticleExplosion(event);
}

// Show memories function
function showMemories() {
    alert('This would open a photo gallery of all our beautiful memories together! 📷💕');
    createParticleExplosion(event);
}

// Create particle explosion effect
function createParticleExplosion(event) {
    const button = event.target;
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 4000);
    }
}

// Click effect
document.addEventListener('click', function(e) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = (e.clientX - 25) + 'px';
    effect.style.top = (e.clientY - 25) + 'px';
    document.body.appendChild(effect);
    
    setTimeout(() => effect.remove(), 800);
});

// Photo click effect
document.addEventListener('DOMContentLoaded', function() {
    const mainPhoto = document.getElementById('mainPhoto');
    
    mainPhoto.addEventListener('click', function() {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Romantic quotes that appear on photo click
    const romanticQuotes = [
        "You are my sunshine on cloudy days ☀️",
        "With you, every moment is magical ✨",
        "You make my heart skip a beat 💓",
        "In your eyes, I found my home 🏠",
        "You are my favorite hello and hardest goodbye 👋"
    ];

    let quoteIndex = 0;
    mainPhoto.addEventListener('click', function() {
        alert(romanticQuotes[quoteIndex % romanticQuotes.length]);
        quoteIndex++;
    });
});

// Add some initial hearts
for (let i = 0; i < 5; i++) {
    setTimeout(createHeart, i * 1000);
}

// Add subtle animations on page load
window.addEventListener('load', function() {
    document.querySelector('.card').classList.add('loaded');
});

// Responsive text size adjustment
function adjustTextSize() {
    const card = document.querySelector('.card');
    const cardWidth = card.offsetWidth;
    
    if (cardWidth < 400) {
        document.querySelector('.title').style.fontSize = '2rem';
        document.querySelector('.message').style.fontSize = '1rem';
    }
}

window.addEventListener('resize', adjustTextSize);
window.addEventListener('load', adjustTextSize);
