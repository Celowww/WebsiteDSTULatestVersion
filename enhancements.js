function initCarousel() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextBtn = carousel.querySelector('.carousel-next');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        let currentIndex = 0;
        
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = Array.from(dotsContainer.children);
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }
        
        let autoSlide = setInterval(nextSlide, 5000);
        
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
        carousel.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    });
}

function initCalculator() {
    const calculator = document.getElementById('courseCalculator');
    if (!calculator) return;
    
    const courseSelect = document.getElementById('courseSelect');
    const hoursSelect = document.getElementById('hoursSelect');
    const studentsSelect = document.getElementById('studentsSelect');
    const totalPrice = document.getElementById('totalPrice');
    
    const prices = {
        'python': 12900,
        'design': 14500,
        'marketing': 11200,
        'mobile': 16800,
        'data': 13900,
        'ai': 18500
    };
    
    function calculate() {
        const course = courseSelect.value;
        const hours = parseFloat(hoursSelect.value);
        const students = parseInt(studentsSelect.value);
        
        if (!course || !hours || !students) {
            totalPrice.textContent = '0 ₽';
            return;
        }
        
        let basePrice = prices[course] || 0;
        let total = basePrice * (hours / 40) * students;
        
        if (students >= 10) total *= 0.80;      
        else if (students >= 5) total *= 0.85;  
        else if (students >= 3) total *= 0.90;  
        
        const currentPrice = parseInt(totalPrice.textContent.replace(/\D/g, ''));
        animatePriceChange(currentPrice, Math.round(total));
    }
    
    function animatePriceChange(from, to) {
        const duration = 500; 
        const start = Date.now();
        
        function update() {
            const now = Date.now();
            const progress = Math.min((now - start) / duration, 1);
            const current = Math.round(from + (to - from) * progress);
            totalPrice.textContent = current.toLocaleString('ru-RU') + ' ₽';
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        update();
    }
    
    courseSelect.addEventListener('change', calculate);
    hoursSelect.addEventListener('change', calculate);
    studentsSelect.addEventListener('change', calculate);
    
    calculate();
}

function initEnhancedModals() {
    const existingModals = document.querySelectorAll('#loginModal');
    
    existingModals.forEach(modal => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.id = 'loginModalOverlay';
        
        const content = modal.querySelector('div[style*="background: white"]');
        if (content) {
            content.className = 'modal-content';
            content.style.cssText = ''; 
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.onclick = closeLoginModal;
            content.prepend(closeBtn);
            
            overlay.appendChild(content);
        }
        
        modal.replaceWith(overlay);
    });
    
    window.openLoginModal = function() {
        document.getElementById('loginModalOverlay')?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.closeLoginModal = function() {
        document.getElementById('loginModalOverlay')?.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initCalculator();
    initEnhancedModals();
    
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});