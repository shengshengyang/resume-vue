<script setup>
import { ref, computed } from 'vue';
import { useLanguage } from '../composables/useLanguage';
const { resumeData } = useLanguage();

// 3D Tilt Logic
const card = ref(null);
const rotation = ref({ x: 0, y: 0 });
const isHovering = ref(false);

const handleMouseMove = (e) => {
  if (!card.value) return;

  const rect = card.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
  const rotateY = ((x - centerX) / centerX) * 10;

  rotation.value = { x: rotateX, y: rotateY };
};

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  rotation.value = { x: 0, y: 0 };
};

const cardStyle = computed(() => {
  return {
    transform: `perspective(1000px) rotateX(${rotation.value.x}deg) rotateY(${rotation.value.y}deg) scale3d(1.02, 1.02, 1.02)`,
    transition: isHovering.value ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
  };
});
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
      <div 
        class="avatar-card" 
        ref="card"
        @mousemove="handleMouseMove"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        :style="cardStyle"
      >
        <div class="glow" v-if="isHovering"></div>
        <img 
          :src="resumeData.profile.avatar" 
          :alt="resumeData.profile.name" 
          class="avatar" 
        />
      </div>
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
  background-clip: text;
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
  perspective: 1000px; /* Helper perspective on container */
}

.avatar-card {
  position: relative;
  width: 300px; /* Slightly larger container for the effect */
  height: 300px;
  border-radius: 50%;
  transform-style: preserve-3d;
  cursor: default; /* No pointer cursor since it's not clickable anymore */
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(66, 184, 131, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  display: block;
}

/* Optional Glow Effect */
.glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1), transparent 70%);
  pointer-events: none;
  z-index: 2;
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
  
  .avatar-card {
    width: 220px;
    height: 220px;
  }
}
</style>
