// Products Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp integration
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const phoneNumber = '50376141401'; // Número de WhatsApp
            const message = `¡Hola! Estoy interesado/a en comprar: ${productName}. Por favor, cuéntame más sobre disponibilidad y formas de pago.`;
            
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        observer.observe(card);
    });

    // Initialize language functionality
    initializeLanguage();
});

// Language functionality
function initializeLanguage() {
    const langBubble = document.getElementById('lang-bubble');
    const langOptions = document.querySelector('.lang-options');
    
    if (langBubble) {
        langBubble.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });

        // Close language options when clicking outside
        document.addEventListener('click', function() {
            langBubble.classList.remove('active');
        });

        // Language selection
        const langButtons = document.querySelectorAll('.lang-options button[data-lang]');
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');
                changeLanguage(selectedLang);
                langBubble.classList.remove('active');
            });
        });

        // Secret page button
        const secretButton = document.getElementById('secret-page');
        if (secretButton) {
            secretButton.addEventListener('click', function() {
                window.location.href = 'secret-es.html';
            });
        }
    }
}

// Language change function (compatible with global.js)
function changeLanguage(lang) {
    // This function will be called by the global language system
    console.log('Language changed to:', lang);
    // The actual translation is handled by the global.js file
}