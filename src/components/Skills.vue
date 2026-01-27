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
    
    <div v-if="resumeData.skills.certifications" class="certifications-container">
      <h3 class="subsection-title">{{ resumeData.skills.certifications_title }}</h3>
      <div class="certs-grid">
        <a 
          v-for="cert in resumeData.skills.certifications" 
          :key="cert.name" 
          :href="cert.link" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="cert-card"
        >
          <div class="cert-image">
            <img :src="cert.image" :alt="cert.name" />
          </div>
          <div class="cert-info">
            <h4>{{ cert.name }}</h4>
            <span>{{ cert.issuer }}</span>
          </div>
        </a>
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

.certifications-container {
  margin-top: 6rem;
  text-align: center;
}

.subsection-title {
  font-size: 1.8rem;
  margin-bottom: 3rem;
  color: var(--color-heading);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
}

.certs-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 0 1rem;
}

.cert-card {
  background-color: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: var(--glass-border);
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  width: 280px;
}

.cert-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 30px rgba(66, 184, 131, 0.15);
  background-color: rgba(66, 184, 131, 0.05);
}

.cert-image {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cert-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.1));
}

.cert-info h4 {
  color: var(--color-heading);
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.cert-info span {
  color: var(--color-text-light);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
