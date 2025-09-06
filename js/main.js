// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function showSection(targetSection) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(targetSection);
    if (target) {
        target.classList.add('active');
    }

    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === targetSection) {
            link.classList.add('active');
        }
    });
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        showSection(section);
    });
});

// Add click functionality to learning area cards
const areaCards = document.querySelectorAll('.area-card');
areaCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Add a subtle animation feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // You can add modal functionality here later
        console.log(`Clicked on learning area: ${card.querySelector('.area-title').textContent}`);
    });
});

// Add click functionality to writing cards
const writingCards = document.querySelectorAll('.writing-card');
writingCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Add a subtle animation feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // You can add blog post navigation here later
        console.log(`Clicked on article: ${card.querySelector('.writing-title').textContent}`);
    });
});

// Smooth scroll to top when switching sections
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top functionality when changing sections
navLinks.forEach(link => {
    link.addEventListener('click', scrollToTop);
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate stats on page load
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        const finalNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 20;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                stat.textContent = finalNumber;
                clearInterval(timer);
            } else {    
                stat.textContent = Math.floor(currentNumber);
            }
        }, 50);
    });

    // Add hover effects to progress items
    const progressItems = document.querySelectorAll('.progress-item');
    progressItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (item.classList.contains('active')) {
                item.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
});

async function loadArticles() {
    try {
        const response = await fetch('articles.json');
        const articles = await response.json();

        const container = document.getElementById('writings-grid');
        container.innerHTML = ''; // clear container first

        articles.forEach(article => {
            const articleHTML = `
                <article class="writing-card">
                    <div class="writing-meta">
                        <div class="writing-date">${article.date}</div>
                        <span class="writing-category">${article.category}</span>
                    </div>
                    <h3 class="writing-title">${article.title}</h3>
                    <p class="writing-excerpt">${article.excerpt}</p>
                    <div class="writing-tags">
                        ${article.tags.map(tag => `<span class="writing-tag">${tag}</span>`).join('')}
                    </div>
                </article>
            `;
            container.insertAdjacentHTML('beforeend', articleHTML);
        });

        // Add click events if desired
        const writingCards = document.querySelectorAll('.writing-card');
        writingCards.forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => { card.style.transform = ''; }, 150);
                console.log(`Clicked on article: ${card.querySelector('.writing-title').textContent}`);
            });
        });

    } catch (err) {
        console.error('Failed to load articles:', err);
    }
}

// Call when DOM is ready
document.addEventListener('DOMContentLoaded', loadArticles);
