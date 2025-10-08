// Homepage animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  initHomepage();
});

function initHomepage() {
  // Inicializar todas las funcionalidades
  animateBenefitsOnScroll();
  setupSmoothScrolling();
  setupInteractiveElements();
  setupProcessSection();
  setupTabs();
}

function animateBenefitsOnScroll() {
  const benefitCards = document.querySelectorAll('.benefit-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(benefitCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 200);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  benefitCards.forEach(card => {
    observer.observe(card);
  });
}

function setupProcessSection() {
  // Animación para los pasos del proceso
  const processSteps = document.querySelectorAll('.step');
  const chemicalCards = document.querySelectorAll('.chemical-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('step')) {
          const index = Array.from(processSteps).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200);
        } else if (entry.target.classList.contains('chemical-card')) {
          const index = Array.from(chemicalCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 150);
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  processSteps.forEach(step => {
    observer.observe(step);
  });
  
  chemicalCards.forEach(card => {
    observer.observe(card);
  });
}

function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase activa de todos los botones
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Ocultar todos los paneles
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Activar el botón clickeado
      button.classList.add('active');
      
      // Mostrar el panel correspondiente
      const tabId = button.getAttribute('data-tab');
      const tabPanel = document.getElementById(tabId);
      if (tabPanel) {
        tabPanel.classList.add('active');
      }
    });
  });
}

function setupSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.getElementById('main-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function setupInteractiveElements() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Solo crear el estilo una vez verificando si ya existe
if (!document.querySelector('#ripple-styles')) {
  const rippleStyle = document.createElement('style');
  rippleStyle.id = 'ripple-styles';
  rippleStyle.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}