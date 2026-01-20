console.log("System Initialized...");

/* --- LIGHTBOX LOGIC --- */

function openLightbox(source) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";

  // Sprawdź czy to wideo (kończy się na .mp4)
  if (source.endsWith(".mp4")) {
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "block";
    lightboxVideo.src = source;
    lightboxVideo.play();
  } else {
    lightboxVideo.style.display = "none";
    lightboxVideo.pause(); // Zatrzymaj wideo jeśli było odtwarzane
    lightboxImg.style.display = "block";
    lightboxImg.src = source;
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxVideo = document.getElementById("lightbox-video");
  
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
  
  // Zatrzymaj wideo przy zamknięciu
  lightboxVideo.pause();
  lightboxVideo.currentTime = 0;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

/* --- LANGUAGE SWITCHER --- */
const translations = {
  pl: {
    status: "OTWARTY NA WSPÓŁPRACĘ",
    role: "Cybersecurity Enthusiast",
    bio: "Student Informatyki pasjonujący się bezpieczeństwem IT. Łączę analityczne podejście Blue Team (SOC) z ofensywną ciekawością Red Teamu. Tworzę własne narzędzia edukacyjne i stale poszerzam wiedzę o nowe wektory ataków.",
    contact_btn: "Kontakt",
    section_1: "01 // WYRÓŻNIONY_PROJEKT",
    project_status: "AKTYWNY DEV",
    project_desc: "\"Autorska platforma CTF z autorskimi scenariuszami. Projekt skupia się na praktycznej nauce cyberbezpieczeństwa poprzez symulację realnych incydentów IT.\"",
    
    // Zaktualizowane opisy zdjęć
    view_dashboard: "LANDING PAGE",
    view_challenge: "POKÓJ CTF",
    view_ranking: "PROFIL UŻYTKOWNIKA",
    
    section_2: "02 // CERTYFIKATY & ŚCIEŻKI",
    section_3: "03 // ARSENAŁ_TECHNICZNY",
    skill_soc_1: "Analiza Logów (Syslog, Auth.log)",
    skill_soc_2: "Ruch Sieciowy (Wireshark)",
    skill_soc_3: "Koncepcje SIEM",
    skill_soc_4: "Triage Incydentów"
  },
  en: {
    status: "OPEN TO WORK",
    role: "Cybersecurity Enthusiast",
    bio: "CS Student passionate about IT Security. I combine the analytical approach of Blue Team (SOC) with the offensive curiosity of Red Team. I create my own educational tools and constantly expand my knowledge of new attack vectors.",
    contact_btn: "Contact",
    section_1: "01 // FEATURED_PROJECT",
    project_status: "ACTIVE DEV",
    project_desc: "\"Proprietary CTF platform with custom scenarios. The project focuses on practical cybersecurity learning through simulation of real IT incidents.\"",
    
    // Updated image descriptions
    view_dashboard: "LANDING PAGE",
    view_challenge: "CTF ROOM",
    view_ranking: "USER PROFILE",
    
    section_2: "02 // CERTIFICATIONS & PATHS",
    section_3: "03 // TECHNICAL_ARSENAL",
    skill_soc_1: "Log Analysis (Syslog, Auth.log)",
    skill_soc_2: "Network Traffic (Wireshark)",
    skill_soc_3: "SIEM Concepts",
    skill_soc_4: "Incident Triage"
  }
};

let currentLang = localStorage.getItem('lang') || 'pl';

function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  // Aktualizacja przycisku
  document.getElementById('lang-pl').classList.toggle('active', lang === 'pl');
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  
  // Zapisz wybór
  localStorage.setItem('lang', lang);
  currentLang = lang;
}

function toggleLanguage() {
  const newLang = currentLang === 'pl' ? 'en' : 'pl';
  updateLanguage(newLang);
}

// Inicjalizacja języka przy starcie
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
});
