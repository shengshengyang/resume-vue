<script setup>
import { useLanguage } from '../composables/useLanguage';

const { resumeData } = useLanguage();
</script>

<template>
  <div class="simple-resume">
    <!-- Header -->
    <header class="header">
      <h1>{{ resumeData.profile.name }}</h1>
      <div class="contact-info">
        <span>{{ resumeData.profile.phone }}</span> | 
        <span>{{ resumeData.profile.email }}</span> |
        <span>{{ resumeData.profile.location }}</span>
      </div>
      <div class="links">
        <a v-for="link in resumeData.social.items" :key="link.name" :href="link.url" target="_blank">{{ link.name }}</a>
      </div>
    </header>

    <hr />

    <!-- Summary -->
    <section class="section">
      <h3>Summary</h3> <!-- Use hardcoded or add to locale if strict bilingual needed, but 'Summary' usually implied by Bio -->
      <p>{{ resumeData.profile.bio }}</p>
    </section>

    <!-- Skills -->
    <section class="section">
      <h3>{{ resumeData.skills.title }}</h3>
      <div class="skills-list">
        <span v-for="skill in resumeData.skills.items" :key="skill" class="skill-item">{{ skill }}</span>
      </div>
    </section>

    <!-- Experience -->
    <section class="section">
      <h3>{{ resumeData.experience.title }}</h3>
      <div v-for="job in resumeData.experience.items" :key="job.id" class="job-item">
        <div class="job-header">
          <h4>{{ job.role }}</h4>
          <span class="company">{{ job.company }}</span>
          <span class="period">{{ job.period }}</span>
        </div>
        <p class="job-desc">{{ job.description }}</p>
        
        <ul v-if="job.projects" class="projects-list">
          <li v-for="project in job.projects" :key="project.name">
            <strong>{{ project.name }}</strong>: {{ project.description }} ({{ project.tech }})
          </li>
        </ul>
      </div>
    </section>

    <!-- Certifications -->
    <section class="section" v-if="resumeData.skills.certifications && resumeData.skills.certifications.length">
      <h3>{{ resumeData.skills.certifications_title || 'Certifications' }}</h3>
      <div v-for="cert in resumeData.skills.certifications" :key="cert.name" class="cert-item">
        <div class="cert-header">
          <h4>{{ cert.name }}</h4>
          <span class="issuer">{{ cert.issuer }}</span>
        </div>
        <div v-if="cert.link">
          <a :href="cert.link" target="_blank">View Credly Badge</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.simple-resume {
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  color: black;
  font-family: 'Times New Roman', Times, serif; /* Serifs are better for pure documents */
  line-height: 1.5;
}

/* Force light theme override for this component */
:global(body:has(.simple-resume)) {
  background: #f0f0f0 !important; /* Muted background for the app */
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: black;
}

.contact-info, .links {
  text-align: center;
  margin-bottom: 0.5rem;
}

.links a {
  margin: 0 0.5rem;
  color: blue;
  text-decoration: underline;
}

hr {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1.5rem 0;
}

.section {
  margin-bottom: 2rem;
}

h3 {
  border-bottom: 1px solid #000;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  color: #333;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item::after {
  content: " •";
  color: #666;
}

.skill-item:last-child::after {
  content: "";
}

.job-item, .project-item, .cert-item {
  margin-bottom: 1.5rem;
}

.job-header, .project-header, .cert-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
}

h4 {
  font-size: 1.1rem;
  margin: 0;
  font-weight: bold;
}

.company, .issuer {
  font-weight: bold;
  color: #444;
}

.period {
  font-style: italic;
}

.projects-list {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.tech-stack {
  font-style: italic;
  font-size: 0.9rem;
  color: #555;
}
</style>
