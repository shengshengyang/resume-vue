<script setup>
import { useLanguage } from '../composables/useLanguage';
const { resumeData } = useLanguage();
</script>

<template>
  <section id="skills" class="skills-section">
    <h2 class="section-title">{{ resumeData.skills.title }}</h2>
    <div class="skills-grid">
      <div v-for="skill in resumeData.skills.items" :key="skill" class="skill-tag">
        {{ skill }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: 6rem 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--color-heading);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.skill-tag {
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  padding: 1rem 2rem;
  border-radius: 4px; /* Minimal radius */
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--color-text);
  border: var(--glass-border);
  transition: all 0.3s ease;
  min-width: 120px;
  text-align: center;
}

.skill-tag:hover {
  background-color: rgba(66, 184, 131, 0.1);
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(66, 184, 131, 0.15);
}
</style>
