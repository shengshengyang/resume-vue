<script setup>
import { useLanguage } from '../composables/useLanguage';
const { resumeData } = useLanguage();
</script>

<template>
  <section id="about" class="hero">
    <div class="content">
      <h1><span class="highlight">{{ resumeData.profile.name }}</span></h1>
      <h2 class="role">{{ resumeData.profile.role }}</h2>
      <p class="bio">{{ resumeData.profile.bio }}</p>
      <div class="actions">
        <a href="#portfolio" class="btn primary">{{ resumeData.profile.cta_primary }}</a>
        <a href="#experience" class="btn secondary">{{ resumeData.profile.cta_secondary }}</a>
      </div>
    </div>
    <div class="avatar-container">
      <img :src="resumeData.profile.avatar" :alt="resumeData.profile.name" class="avatar" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10rem 0 6rem; /* Increased top padding */
  gap: 4rem;
}

.content {
  flex: 1;
  z-index: 2;
  text-align: left;
}

h1 {
  font-size: 4.5rem;
  line-height: 1;
  margin-bottom: 2rem;
  color: var(--color-heading);
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: -1px;
}

.highlight {
  /* Vue Green Gradient */
  background: linear-gradient(120deg, var(--gradient-text-start) 30%, var(--primary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

.role {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 600;
  opacity: 1;
}

.bio {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 3rem;
  max-width: 550px;
  color: var(--color-text);
  font-weight: 300;
  border-left: 2px solid var(--primary-color);
  padding-left: 1.5rem;
}

.actions {
  display: flex;
  gap: 1.5rem;
}

.btn {
  padding: 1rem 2.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn.primary {
  background-color: var(--primary-color);
  color: #ffffff;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 15px rgba(66, 184, 131, 0.3);
}

.btn.primary:hover {
  background-color: transparent;
  color: var(--primary-color);
  box-shadow: 0 0 25px rgba(66, 184, 131, 0.5);
  transform: translateY(-2px);
}

.btn.secondary {
  border: 1px solid var(--color-border);
  color: var(--color-text);
  background-color: transparent;
  backdrop-filter: var(--glass-backdrop);
}

.btn.secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background-color: rgba(66, 184, 131, 0.05);
}

.avatar-container {
  flex: 1;
  display: flex;
  justify-content: center;
  z-index: 2;
}

.avatar {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  /* Minimal glass border */
  border: 1px solid rgba(66, 184, 131, 0.3);
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.6);
  transition: all 0.5s ease;
  filter: grayscale(100%);
}

.avatar:hover {
  filter: grayscale(0%);
  border-color: var(--primary-color);
  box-shadow: 0 0 40px rgba(66, 184, 131, 0.4);
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    padding: 6rem 0;
    gap: 3rem;
  }
  
  .content {
    text-align: center;
  }
  
  h1 {
    font-size: 3rem;
  }
  
  .bio {
    margin: 0 auto 2.5rem auto;
    text-align: left;
    text-align: center;
    border-left: none;
    padding-left: 0;
  }
  
  .actions {
    justify-content: center;
  }
  
  .avatar {
    width: 200px;
    height: 200px;
  }
}
</style>
