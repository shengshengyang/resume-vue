<script setup>
import { useLanguage } from '../composables/useLanguage';
const { resumeData } = useLanguage();
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="contact-direct">
        <span>{{ resumeData.profile.phone }}</span>
        <span class="separator">|</span>
        <a :href="`mailto:${resumeData.profile.email}`">{{ resumeData.profile.email }}</a>
      </div>

      <div class="social-links">
        <a 
          v-for="link in resumeData.social.items" 
          :key="link.name"
          :href="link.url" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {{ link.name }}
        </a>
      </div>

      <p>{{ resumeData.footer.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-background-soft);
  padding: 3rem 0;
  margin-top: 6rem;
  text-align: center;
  border-top: 1px solid var(--color-border);
  position: relative;
  z-index: 2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* Ensure horizontal centering */
  gap: 1.5rem;
}

.container p {
  color: var(--color-text-light);
  font-size: 0.9rem;
  opacity: 0.8;
}

.contact-direct {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  font-size: 0.95rem;
  opacity: 0.9;
  /* Removed specific margins, relying on container gap */
}

.contact-direct a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s;
}

.contact-direct a:hover {
  color: var(--primary-color);
}

.separator {
  opacity: 0.5;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
}

.social-links a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.social-links a:hover {
  color: var(--primary-color);
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
  transform: translateY(-2px);
}
</style>
