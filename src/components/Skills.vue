<script setup>
import { resumeData } from '../data.js';
const { skills } = resumeData;
</script>

<template>
  <section id="skills" class="skills-section">
    <h2 class="section-title">Technical Skills</h2>
    <div class="skills-grid">
      <div v-for="skill in skills" :key="skill" class="skill-tag">
        {{ skill }}
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-heading);
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto;
}

.skill-tag {
  background-color: var(--color-background-mute);
  padding: 0.6rem 1.4rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  transition: all 0.2s;
}

.skill-tag:hover {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
}
</style>
