<script setup>
import { resumeData } from '../data.js';
const { profile } = resumeData;
</script>

<template>
  <section id="about" class="hero">
    <div class="content">
      <h1>Hi, I'm <span class="highlight">{{ profile.name }}</span></h1>
      <h2 class="role">{{ profile.role }}</h2>
      <p class="bio">{{ profile.bio }}</p>
      <div class="actions">
        <a href="#portfolio" class="btn primary">View My Work</a>
        <a href="#experience" class="btn secondary">My Experience</a>
      </div>
    </div>
    <div class="avatar-container">
      <img :src="profile.avatar" :alt="profile.name" class="avatar" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8rem 0;
  gap: 4rem;
}

.content {
  flex: 1;
  z-index: 2;
}

h1 {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--color-heading);
  text-transform: uppercase;
  letter-spacing: -1px;
}

.highlight {
  /* Neon Gradient */
  background: linear-gradient(120deg, #ffffff 0%, var(--primary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  text-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
}

.role {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 500;
}

.bio {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 3rem;
  max-width: 600px;
  color: var(--color-text-light);
  border-left: 2px solid var(--primary-color);
  padding-left: 1.5rem;
}

.actions {
  display: flex;
  gap: 1.5rem;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 0; /* Boxy tech feel */
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
}

.btn.primary {
  background-color: rgba(0, 243, 255, 0.1);
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
}

.btn.primary:hover {
  background-color: var(--primary-color);
  color: #000;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.6);
  transform: translateY(-2px);
}

.btn.secondary {
  border: 1px solid var(--color-border);
  color: var(--color-text);
  background-color: rgba(255, 255, 255, 0.05);
}

.btn.secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background-color: rgba(0, 243, 255, 0.05);
}

.avatar-container {
  flex: 1;
  display: flex;
  justify-content: center;
  z-index: 2;
}

.avatar {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(0, 243, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.2), inset 0 0 20px rgba(0, 243, 255, 0.2);
  transition: all 0.5s ease;
}

.avatar:hover {
  box-shadow: 0 0 50px rgba(0, 243, 255, 0.4), inset 0 0 30px rgba(0, 243, 255, 0.4);
  transform: scale(1.02);
  border-color: var(--primary-color);
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column-reverse;
    text-align: center;
    padding: 4rem 0;
    gap: 2rem;
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .bio {
    margin: 0 auto 2.5rem auto;
    text-align: left;
  }
  
  .actions {
    justify-content: center;
  }
  
  .avatar {
    width: 220px;
    height: 220px;
  }
}
</style>
