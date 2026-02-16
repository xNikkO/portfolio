console.log("System Initialized...");

// --- Lightbox Logic ---
function openLightbox(source) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";

  if (source.endsWith(".mp4")) {
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "block";
    lightboxVideo.src = source;
    // Play only when opened in lightbox
    lightboxVideo.play().catch(e => console.log("Video play failed", e));
  } else {
    lightboxVideo.style.display = "none";
    lightboxVideo.pause();
    lightboxImg.style.display = "block";
    lightboxImg.src = source;
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxVideo = document.getElementById("lightbox-video");
  
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
  
  // Stop video to save resources
  lightboxVideo.pause();
  lightboxVideo.currentTime = 0;
  lightboxVideo.src = "";
}

// Close on Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Optimize main video: ensure it's muted and plays if possible, but don't force it too hard
    const video = document.getElementById('landing-video');
    if (video) {
        video.muted = true; // Ensure muted for autoplay policy
        video.play().catch(error => {
            console.log("Autoplay prevented (browser policy):", error);
        });
    }
    
    updateLanguage(currentLang);
});

// --- Internationalization (i18n) ---
const translations = {
  pl: {
    status: "OTWARTY NA WSPÓŁPRACĘ",
    role: "Cybersecurity Enthusiast",
    bio: "Student Informatyki na specjalizacji Cyberbezpieczeństwo. Pasjonat bezpieczeństwa IT, stawiający na wszechstronny rozwój w technikach ofensywnych i defensywnych. Aktywnie tworzę narzędzia edukacyjne i badam najnowsze wektory ataków, wykorzystując tę wiedzę do budowania skuteczniejszej obrony i mechanizmów reagowania na incydenty.",
    contact_btn: "Kontakt",
    section_1: "01 // WYRÓŻNIONY_PROJEKT",
    project_status: "AKTYWNY DEV",
    project_desc: "\"Autorska platforma CTF z autorskimi scenariuszami. Projekt skupia się na praktycznej nauce cyberbezpieczeństwa poprzez symulację realnych incydentów IT.\"",
    
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
    bio: "Computer Science student specializing in Cybersecurity. An IT security enthusiast focused on comprehensive development in both offensive and defensive techniques. I actively create educational tools and research the latest attack vectors, leveraging this knowledge to build effective defenses and incident response mechanisms.",
    contact_btn: "Contact",
    section_1: "01 // FEATURED_PROJECT",
    project_status: "ACTIVE DEV",
    project_desc: "\"Proprietary CTF platform with custom scenarios. The project focuses on practical cybersecurity learning through simulation of real IT incidents.\"",
    
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

  const btnPl = document.getElementById('lang-pl');
  const btnEn = document.getElementById('lang-en');

  if (btnPl) btnPl.classList.toggle('active', lang === 'pl');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');
  
  localStorage.setItem('lang', lang);
  currentLang = lang;
}

function toggleLanguage() {
  const newLang = currentLang === 'pl' ? 'en' : 'pl';
  updateLanguage(newLang);
}
