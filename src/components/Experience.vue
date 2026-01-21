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
          
          <div v-if="job.projects && job.projects.length" class="experience-projects">
            <div v-for="project in job.projects" :key="project.name" class="project-item">
              <div class="project-header">
                <span class="project-bullet">▹</span>
                <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="project-name link">
                  {{ project.name }} <span class="link-icon">↗</span>
                </a>
                <span v-else class="project-name">{{ project.name }}</span>
                <span v-if="project.tech" class="project-tech">({{ project.tech }})</span>
              </div>
              <div class="project-desc">{{ project.description }}</div>
            </div>
          </div>
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



.experience-projects {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(66, 184, 131, 0.3);
}

.project-item {
  margin-bottom: 1rem;
}

.project-item:last-child {
  margin-bottom: 0;
}

.project-header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  flex-wrap: wrap;
}

.project-bullet {
  color: var(--primary-color);
  font-size: 0.8rem;
}

.project-name {
  color: var(--color-heading);
  font-weight: 600;
  font-size: 1rem;
}

.project-name.link {
  text-decoration: none;
  border-bottom: 1px dotted var(--primary-color);
  transition: all 0.2s;
}

.project-name.link:hover {
  color: var(--primary-color);
  border-bottom-style: solid;
}

.link-icon {
  font-size: 0.8em;
  margin-left: 2px;
  vertical-align: top;
}

.project-tech {
  color: var(--primary-color);
  font-size: 0.85rem;
  opacity: 0.8;
}

.project-desc {
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.9;
  padding-left: 1.2rem;
}
</style>
