<script setup>
import { useLanguage } from '../composables/useLanguage';
const { resumeData } = useLanguage();
</script>

<template>
  <section id="portfolio" class="portfolio-section">
    <h2 class="section-title">{{ resumeData.portfolio.title }}</h2>
    <div class="projects-grid">
      <article v-for="project in resumeData.portfolio.items" :key="project.id" class="project-card">
        <div class="project-image">
          <img :src="project.image" :alt="project.title" loading="lazy" />
          <div class="overlay">
            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="view-btn">
              {{ resumeData.portfolio.view_btn }} <span class="btn-icon" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tags">
            <span v-for="tech in project.technologies" :key="tech" class="tag">{{ tech }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.portfolio-section {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: var(--glass-border);
  border-radius: 4px;
  overflow: hidden;
  transition: all var(--duration-normal) ease;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: default;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 15px 40px rgba(66, 184, 131, 0.15);
  background-color: rgba(66, 184, 131, 0.05); /* Slight tint */
}

.project-image {
  position: relative;
  height: 240px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) ease;
  will-change: transform;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--duration-normal) ease;
}

.project-card:hover .overlay {
  opacity: 1;
}

.view-btn {
  background-color: white;
  color: black;
  padding: 0.8rem 2rem;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: translateY(10px);
  transition: transform var(--duration-normal) ease;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.project-card:hover .view-btn {
  transform: translateY(0);
}

.btn-icon {
  transition: transform var(--duration-normal) ease;
}

.view-btn:hover .btn-icon {
  transform: translateX(4px);
}

.project-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

h3 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

p {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-weight: 300;
  flex: 1;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tag {
  background-color: var(--color-background-mute);
  color: var(--color-text);
  font-size: 0.75rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--color-border);
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 2px;
  cursor: default;
}
</style>
