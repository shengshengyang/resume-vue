<script setup>
import { ref, onMounted } from 'vue';
import { useLanguage } from '../composables/useLanguage';

const { resumeData, toggleLanguage, currentLang } = useLanguage();

const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  isDark.value = savedTheme === 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
});
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <a href="#" class="logo">{{ resumeData.profile.name }}</a>
      <div class="nav-right">
        <ul class="nav-links">
          <li><a href="#about">{{ resumeData.nav.about }}</a></li>
          <li><a href="#experience">{{ resumeData.nav.experience }}</a></li>
          <li><a href="#skills">{{ resumeData.nav.skills }}</a></li>
          <li><a href="#portfolio">{{ resumeData.nav.portfolio }}</a></li>
        </ul>
        <button @click="toggleLanguage" class="lang-toggle">
          {{ currentLang === 'en' ? '中' : 'EN' }}
        </button>
        <button @click="toggleTheme" class="theme-toggle" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
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
  z-index: 1000;
  border-bottom: var(--glass-border);
  padding: 1rem 0;
  transition: background-color 0.3s ease, border-color 0.3s ease;
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
}

/* Toggle Button */
.theme-toggle,
.lang-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-text);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.lang-toggle {
  font-weight: 700;
  font-size: 0.9rem;
  width: 36px; /* Fixed width to prevent jump */
  height: 36px;
  border: 1px solid transparent;
}

.lang-toggle:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.1);
}

.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--primary-color);
  transform: rotate(15deg);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: text-shadow 0.3s ease, color 0.3s ease;
}

.logo:hover {
  text-shadow: 0 0 10px var(--primary-color);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none; /* simple hide on mobile for now to prevent clutter */
  }
}

.nav-links a {
  color: var(--color-text);
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
  box-shadow: 0 0 5px var(--primary-color);
}

.nav-links a:hover {
  color: var(--primary-color);
  text-shadow: 0 0 8px rgba(66, 184, 131, 0.5);
}

.nav-links a:hover::after {
  width: 100%;
}
</style>
