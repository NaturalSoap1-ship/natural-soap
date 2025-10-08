// About Page Animations and Interactions
document.addEventListener('DOMContentLoaded', function() {
  initAboutPage();
});

function initAboutPage() {
  animateOnScroll();
  setupParallaxEffect();
  setupGalleryInteractions();
  animateStats();
}

function animateOnScroll() {
  // Elements to animate
  const animatedElements = [
    ...document.querySelectorAll('.mv-card'),
    ...document.querySelectorAll('.gallery-item'),
    ...document.querySelectorAll('.stat')
  ];
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add delay based on element type for staggered animation
        let delay = 0;
        
        if (entry.target.classList.contains('mv-card')) {
          delay = Array.from(document.querySelectorAll('.mv-card')).indexOf(entry.target) * 200;
        } else if (entry.target.classList.contains('gallery-item')) {
          delay = Array.from(document.querySelectorAll('.gallery-item')).indexOf(entry.target) * 100;
        } else if (entry.target.classList.contains('stat')) {
          delay = Array.from(document.querySelectorAll('.stat')).indexOf(entry.target) * 150;
        }
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

function setupParallaxEffect() {
  const heroSection = document.querySelector('.about-hero');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroSection) {
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });
}

function setupGalleryInteractions() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
}

// Stats counter animation
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  const impactSection = document.querySelector('.impact-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(stat => {
          const originalText = stat.textContent;
          const target = parseInt(originalText);
          
          // Solo animar si es un número
          if (!isNaN(target)) {
            let current = 0;
            const increment = target / 30; // Más rápido
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                clearInterval(timer);
                current = target;
                stat.textContent = originalText; // Volver al texto original con símbolos
              } else {
                stat.textContent = Math.floor(current) + (originalText.includes('%') ? '%' : '+');
              }
            }, 50);
          }
        });
      }
    });
  }, { threshold: 0.5 });
  
  if (impactSection) {
    observer.observe(impactSection);
  }
}

// Efecto de confeti para los botones del CTA
function setupCtaEffects() {
  const ctaButtons = document.querySelectorAll('.cta-section .btn');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Efecto de pulso al hacer click
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}

// Inicializar efectos del CTA
setTimeout(setupCtaEffects, 1000);