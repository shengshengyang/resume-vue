<script setup>
import { resumeData } from '../data.js';
const { profile } = resumeData;
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ new Date().getFullYear() }} {{ profile.name }}. All rights reserved.</p>
      <div class="social-links">
        <a :href="'https://' + profile.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a :href="'https://' + profile.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a :href="'mailto:' + profile.email">Email</a>
      </div>
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
  gap: 1.5rem;
}

.container p {
  color: var(--color-text-light);
  font-size: 0.9rem;
  opacity: 0.8;
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
