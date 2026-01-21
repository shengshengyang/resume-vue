<script setup>
import { useLanguage } from '../composables/useLanguage';
const { resumeData } = useLanguage();
</script>

<template>
  <section id="portfolio" class="portfolio-section">
    <h2 class="section-title">{{ resumeData.portfolio.title }}</h2>
    <div class="projects-grid">
      <div v-for="project in resumeData.portfolio.items" :key="project.id" class="project-card">
        <div class="project-image">
          <img :src="project.image" :alt="project.title" />
          <div class="overlay">
            <a :href="project.link" class="view-btn">{{ resumeData.portfolio.view_btn }}</a>
          </div>
        </div>
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tags">
            <span v-for="tech in project.technologies" :key="tech" class="tag">{{ tech }}</span>
          </div>
        </div>
      </div>
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
  transition: all 0.4s ease;
  position: relative;
  display: flex;
  flex-direction: column;
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
  transition: transform 0.6s ease;
  filter: grayscale(100%);
}

.project-card:hover .project-image img {
  transform: scale(1.05);
  filter: grayscale(0%);
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
  transition: opacity 0.3s ease;
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
  transition: transform 0.3s ease;
  border-radius: 2px;
}

.project-card:hover .view-btn {
  transform: translateY(0);
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
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--color-text-light);
  font-size: 0.75rem;
  padding: 0.4rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 2px;
}
</style>
