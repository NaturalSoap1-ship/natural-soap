// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("main-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Responsive menu
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const nav = document.querySelector("nav ul");
  const menuToggle = document.querySelector(".menu-toggle");
  
  // Crear overlay si no existe
  let overlay = document.querySelector(".overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }

  // Toggle del menú
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = nav.classList.contains("active");
    
    if (!isActive) {
      // Abrir menú
      nav.classList.add("active");
      menuToggle.classList.add("active");
      overlay.classList.add("active");
      menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      document.body.style.overflow = 'hidden';
    } else {
      // Cerrar menú
      closeMenu();
    }
  });

  // Función para cerrar menú
  function closeMenu() {
    nav.classList.remove("active");
    menuToggle.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.style.overflow = '';
  }

  // Cerrar menú al hacer clic en overlay
  overlay.addEventListener("click", closeMenu);

  // Cerrar menú al hacer clic en un enlace (en móvil)
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Cerrar menú al redimensionar la ventana si se vuelve a desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Cerrar menú con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // ====== PARTE DE IDIOMAS - CORREGIDA ======
  const bubble = document.getElementById("lang-bubble");
  const options = bubble.querySelector(".lang-options");
  const secretBtn = document.getElementById("secret-page");
  const homeBtn = document.getElementById("home-page"); // Nuevo botón para home

  // Mostrar / ocultar menú
  bubble.addEventListener("click", (e) => {
    if (e.target.closest(".fa-language")) {
      bubble.classList.toggle("active");
    }
  });

  // Cambiar idioma
  options.querySelectorAll("button[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
      bubble.classList.remove("active");
    });
  });

  // Página secreta - RUTA CORREGIDA
  if (secretBtn) {
    secretBtn.addEventListener("click", () => {
      window.location.href = "secret-es.html";
    });
  }

  // Botón para volver a la página principal - NUEVO
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // Cargar idioma guardado
  const savedLang = localStorage.getItem("siteLang") || "es";
  setLanguage(savedLang);
});

function setLanguage(lang) {
  localStorage.setItem("siteLang", lang);
  const cachedTranslations = window.SITE_TRANSLATIONS && window.SITE_TRANSLATIONS[lang];

  if (cachedTranslations) {
    applyTranslations(cachedTranslations);
    return;
  }

  loadTranslations(lang)
    .then(applyTranslations)
    .catch(err => {
      console.error("Error cargando idioma:", err);
      const fallback = window.SITE_TRANSLATIONS && window.SITE_TRANSLATIONS.es;

      if (fallback && lang !== "es") {
        applyTranslations(fallback);
        return;
      }

      alert(`No se pudo cargar el idioma ${lang}. Verifica que los archivos JSON existan en la carpeta /lang/`);
    });
}

function applyTranslations(data) {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (data[key]) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = data[key];
      } else {
        el.innerHTML = data[key];
      }
    }
  });
}

function loadTranslations(lang) {
  return fetch(`lang/${lang}.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      return res.json();
    })
    .catch(() => fetch(`/lang/${lang}.json`).then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      return res.json();
    }));
}
