<script setup>
import { useLanguage } from '../composables/useLanguage';
const { resumeData } = useLanguage();
</script>

<template>
  <section id="experience" class="experience-section">
    <h2 class="section-title">{{ resumeData.experience.title }}</h2>
    <div class="timeline">
      <div v-for="job in resumeData.experience.items" :key="job.id" class="timeline-item">
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
  padding: 8rem 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 5rem;
  color: var(--color-heading);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
}

.timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  border-left: 2px solid rgba(66, 184, 131, 0.2); /* Base track line */
}

/* Optional: "Progress" effect on the line itself if desired, or keep simple track */

.timeline-item {
  position: relative;
  padding-left: 40px; /* Space for the line */
  margin-bottom: 3rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  display: block;
  position: absolute;
  left: -6px; /* Center on the 2px border */
  top: 35px; /* Aligns with header */
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-background);
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 10px rgba(66, 184, 131, 0.5);
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-dot {
  background-color: var(--primary-color);
  box-shadow: 0 0 20px rgba(66, 184, 131, 0.8);
  transform: scale(1.3);
}

.timeline-content {
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  padding: 2.5rem;
  border: var(--glass-border);
  border-radius: 4px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.timeline-content:hover {
  transform: translateY(-5px);
  background-color: rgba(66, 184, 131, 0.1);
  border-color: var(--primary-color);
  box-shadow: 0 10px 40px rgba(66, 184, 131, 0.15);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin: 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

h4 {
  font-size: 1rem;
  color: var(--color-text-light);
  margin-bottom: 0;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.period {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
  font-weight: 300;
}

p {
  line-height: 1.8;
  color: var(--color-text);
  font-weight: 300;
  font-size: 1rem;
  margin: 0;
}

@media (max-width: 768px) {
  .timeline-item {
    margin-bottom: 2rem;
  }
}
</style>
