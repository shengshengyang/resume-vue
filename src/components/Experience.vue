<script setup>
import { resumeData } from '../data.js';
const { experience } = resumeData;
</script>

<template>
  <section id="experience" class="experience-section">
    <h2 class="section-title">Work Experience</h2>
    <div class="timeline">
      <div v-for="job in experience" :key="job.id" class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="job-header">
            <h3>{{ job.role }}</h3>
            <span class="period">{{ job.period }}</span>
          </div>
          <h4>{{ job.company }}</h4>
          <p>{{ job.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  padding: 6rem 0;
  /* background-color: var(--color-background-soft); removed for transparency */
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--color-heading);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--primary-color), transparent);
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  margin-bottom: 4rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 13px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-background);
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 10px var(--primary-color);
  z-index: 2;
}

.timeline-content {
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--primary-color);
  backdrop-filter: blur(5px);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.timeline-content:hover {
  transform: translateX(5px);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
  border-color: rgba(0, 243, 255, 0.3);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

h3 {
  font-size: 1.4rem;
  color: var(--color-heading);
  margin: 0;
  font-weight: 600;
}

h4 {
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.period {
  font-size: 0.85rem;
  color: var(--primary-color);
  background-color: rgba(0, 243, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(0, 243, 255, 0.2);
  letter-spacing: 1px;
}

p {
  line-height: 1.7;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 10px;
  }
  
  .timeline-item {
    padding-left: 40px;
  }
  
  .timeline-dot {
    left: 3px;
  }
}
</style>
