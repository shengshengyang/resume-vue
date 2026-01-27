<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useLanguage } from '../composables/useLanguage';
import { useViewMode } from '../composables/useViewMode';

const { resumeData, toggleLanguage, currentLang, isChangingLang } = useLanguage();
const { isSimpleMode, toggleViewMode } = useViewMode();

const isDark = ref(true);
const isNavbarHidden = ref(false);
const lastScrollPosition = ref(0);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const handleScroll = () => {
  const currentScrollPosition = window.scrollY || document.documentElement.scrollTop;
  
  if (currentScrollPosition < 0) {
    return;
  }
  
  // Hide if scrolling down and not at top
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 10) {
    return;
  }
  
  isNavbarHidden.value = currentScrollPosition > lastScrollPosition.value && currentScrollPosition > 50;
  lastScrollPosition.value = currentScrollPosition;
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  isDark.value = savedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  window.addEventListener('scroll', handleScroll);
});

const handleLanguageSwitch = () => {
  toggleLanguage();
  isNavbarHidden.value = false;
  // Sync last scroll position to avoid 'jump' to hidden state if layout shifts
  lastScrollPosition.value = window.scrollY || document.documentElement.scrollTop;
};


onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="navbar" :class="{ 'navbar--hidden': isNavbarHidden }" role="navigation" aria-label="Main navigation">
    <div class="container">
      <!-- Logo removed as requested -->
      <div class="nav-placeholder"></div>
      <div class="nav-right">
        <ul class="nav-links" v-if="!isSimpleMode" role="list" :class="{ 'sand-dissolve': isChangingLang }" :key="currentLang">
          <li><a href="#about">{{ resumeData.nav.about }}</a></li>
          <li><a href="#experience">{{ resumeData.nav.experience }}</a></li>
          <li><a href="#skills">{{ resumeData.nav.skills }}</a></li>
          <li><a href="#portfolio">{{ resumeData.nav.portfolio }}</a></li>
          <li class="dropdown">
            <button
              class="dropdown-trigger"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ resumeData.nav.links }} <span aria-hidden="true">▾</span>
            </button>
            <ul class="dropdown-menu" role="menu" aria-label="Social links">
              <li v-for="link in resumeData.social.items" :key="link.name" role="none">
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  role="menuitem"
                >
                  {{ link.name }} <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <button
          @click="toggleViewMode"
          class="mode-toggle"
          :aria-label="isSimpleMode ? 'Switch to interactive view' : 'Switch to list view'"
          :title="isSimpleMode ? 'Switch to interactive' : 'Switch to list view'"
        >
           <span aria-hidden="true">{{ isSimpleMode ? '✨' : '📄' }}</span>
        </button>

        <button
          @click="handleLanguageSwitch"
          class="lang-toggle"
          :class="{ 'lang-animating': isChangingLang }"
          :aria-label="`Switch to ${currentLang === 'en' ? 'Chinese' : 'English'}`"
        >
          {{ currentLang === 'en' ? '中' : 'EN' }}
        </button>

        <button
          @click="toggleTheme"
          class="theme-toggle"
          :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Glassmorphic Navbar */
.navbar {
  background-color: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  border-bottom: var(--glass-border);
  padding: 1rem 0;
  transition: background-color var(--duration-normal) ease, border-color var(--duration-normal) ease, transform var(--duration-normal) ease;
}

.navbar--hidden {
  transform: translateY(-100%);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: auto; /* Push to right since logo is gone */
}

/* Toggle Button - Improved touch targets */
.theme-toggle,
.lang-toggle,
.mode-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all var(--duration-normal) ease;
  min-width: 44px;
  min-height: 44px;
}

.lang-toggle {
  font-weight: 700;
  font-size: 0.9rem;
  width: 44px; /* Fixed width to prevent jump */
  height: 44px;
  border: 1px solid transparent;
}

.mode-toggle {
  font-size: 1.2rem;
  width: 44px;
  height: 44px;
}

.mode-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.lang-toggle:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
}

/* Language toggle rotation animation with sand effect */
.lang-toggle {
  transition: all var(--duration-normal) ease;
  position: relative;
  overflow: hidden;
}

.lang-toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(66, 184, 131, 0.3),
    transparent
  );
  transition: left 0.6s ease;
}

.lang-toggle.lang-animating::before {
  left: 100%;
}

.lang-toggle.lang-animating {
  animation: langSwitchRotate 0.6s ease-in-out;
}

@keyframes langSwitchRotate {
  0% {
    transform: rotate(0deg) scale(1);
    box-shadow: 0 0 0 0 rgba(66, 184, 131, 0.7);
  }
  25% {
    transform: rotate(90deg) scale(0.95);
    box-shadow: 0 0 20px 0 rgba(66, 184, 131, 0.4);
  }
  50% {
    transform: rotate(180deg) scale(0.85);
    box-shadow: 0 0 30px 0 rgba(66, 184, 131, 0.2);
  }
  75% {
    transform: rotate(270deg) scale(0.95);
    box-shadow: 0 0 20px 0 rgba(66, 184, 131, 0.4);
  }
  100% {
    transform: rotate(360deg) scale(1);
    box-shadow: 0 0 0 0 rgba(66, 184, 131, 0.7);
  }
}

.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--primary-color);
  transform: rotate(15deg);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

@media (max-width: 768px) {
  .nav-links {
    display: none; /* simple hide on mobile for now to prevent clutter */
  }

  /* Improve button spacing on mobile */
  .nav-right {
    gap: 0.5rem;
  }
}

.nav-links a {
  color: var(--color-text);
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all var(--duration-normal) ease;
  position: relative;
  padding: 0.5rem 0;
}

.nav-links > li > a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary-color);
  transition: width var(--duration-normal) ease;
  box-shadow: 0 0 5px var(--primary-color);
}

.nav-links > li > a:hover {
  color: var(--primary-color);
  text-shadow: 0 0 8px rgba(66, 184, 131, 0.5);
}

.nav-links > li > a:hover::after {
  width: 100%;
}

/* Language change transition effect */
.nav-links {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-links.sand-dissolve a,
.nav-links.sand-dissolve button {
  animation: navDissolve 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.nav-links:not(.sand-dissolve) a,
.nav-links:not(.sand-dissolve) button {
  animation: navFormation 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes navDissolve {
  0% {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    filter: blur(3px);
    transform: translateX(-10px);
  }
}

@keyframes navFormation {
  0% {
    opacity: 0;
    filter: blur(3px);
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0);
  }
}

/* Stagger nav links */
.nav-links li:nth-child(1) { animation-delay: 0ms; }
.nav-links li:nth-child(2) { animation-delay: 50ms; }
.nav-links li:nth-child(3) { animation-delay: 100ms; }
.nav-links li:nth-child(4) { animation-delay: 150ms; }
.nav-links li:nth-child(5) { animation-delay: 200ms; }

/* Dropdown Styles */
.dropdown {
  position: relative;
}

.dropdown-trigger {
  background: none;
  border: none;
  color: var(--color-text);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: color var(--duration-normal) ease;
  min-height: 44px;
}

.dropdown-trigger:hover {
  color: var(--primary-color);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--card-bg-color, #1a1a1a); /* Fallback or variable */
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: var(--glass-border);
  border-radius: 8px;
  padding: 0.5rem 0;
  min-width: 180px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all var(--duration-normal) ease;
  list-style: none;
  display: flex;
  flex-direction: column;
  z-index: var(--z-dropdown);
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li {
  padding: 0;
}

.dropdown-menu a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.2rem;
  color: var(--color-text);
  font-size: 0.9rem;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color var(--duration-fast) ease;
  text-transform: none; /* override uppercase from parent if needed */
  min-height: 44px;
}

.dropdown-menu a:hover {
  background-color: rgba(66, 184, 131, 0.1);
  color: var(--primary-color);
  text-shadow: none; /* Reset shadow for dropdown items */
}

.dropdown-menu a span {
  font-size: 0.8em;
  opacity: 0.5;
}


.dropdown-menu a:hover span {
  opacity: 1;
}
</style>
