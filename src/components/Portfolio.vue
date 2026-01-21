<script setup>
import { resumeData } from '../data.js';
const { projects } = resumeData;
</script>

<template>
  <section id="portfolio" class="portfolio-section">
    <h2 class="section-title">Featured Projects</h2>
    <div class="projects-grid">
      <div v-for="project in projects" :key="project.id" class="project-card">
        <div class="project-image">
          <img :src="project.image" :alt="project.title" />
          <div class="overlay">
            <a :href="project.link" class="view-btn">View Project</a>
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
  padding: 6rem 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--color-heading);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: rgba(11, 12, 21, 0.6);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
  backdrop-filter: blur(5px);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 243, 255, 0.1);
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  filter: grayscale(20%) contrast(110%);
}

.project-card:hover .project-image img {
  transform: scale(1.1);
  filter: grayscale(0%) contrast(100%);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.project-card:hover .overlay {
  opacity: 1;
}

.view-btn {
  background-color: transparent;
  color: var(--primary-color);
  padding: 0.8rem 1.8rem;
  border: 1px solid var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: scale(0.9);
  transition: all 0.3s ease;
}

.view-btn:hover {
  background-color: var(--primary-color);
  color: #000;
  transform: scale(1);
  box-shadow: 0 0 15px var(--primary-color);
}

.project-content {
  padding: 1.5rem;
}

h3 {
  font-size: 1.4rem;
  color: var(--color-heading);
  margin-bottom: 0.8rem;
  font-weight: 600;
}

p {
  color: var(--color-text-light);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: rgba(0, 243, 255, 0.05);
  color: var(--primary-color);
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(0, 243, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
