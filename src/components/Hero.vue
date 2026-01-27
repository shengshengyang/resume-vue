<script setup>
import { ref, computed } from 'vue';
import { useLanguage } from '../composables/useLanguage';
const { resumeData } = useLanguage();

// Flip Logic
const isFlipped = ref(false);
const audioCtx = ref(null);

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
  
  const rotateX = ((y - centerY) / centerY) * -15; // Max rotation deg
  const rotateY = ((x - centerX) / centerX) * 15;

  rotation.value = { x: rotateX, y: rotateY };
};

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  rotation.value = { x: 0, y: 0 };
};

const wrapperStyle = computed(() => {
  return {
    transform: `perspective(1000px) rotateX(${rotation.value.x}deg) rotateY(${rotation.value.y}deg)`,
    transition: isHovering.value ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
  };
});

const playPopSound = () => {
  if (!audioCtx.value) {
    audioCtx.value = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  if (audioCtx.value.state === 'suspended') {
    audioCtx.value.resume();
  }

  const oscillator = audioCtx.value.createOscillator();
  const gainNode = audioCtx.value.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(600, audioCtx.value.currentTime); // Lower pitch for flip
  oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.value.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.1, audioCtx.value.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.value.currentTime + 0.1);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.value.destination);

  oscillator.start();
  oscillator.stop(audioCtx.value.currentTime + 0.15);
};

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
  playPopSound();
};

const parsedBio = computed(() => {
  const bio = resumeData.value.profile.bio;
  // Dynamic lookup for the blog link from social items
  const blogItem = resumeData.value.social.items.find(item => item.name === 'Blog');
  const link = blogItem ? blogItem.url : '#'; 
  
  const linkHtml = `<a href="${link}" target="_blank" class="blog-link">`;
  
  // Match longer phrases first to avoid partial replacements
  if (bio.includes('personal technical blog')) {
    return bio.replace('personal technical blog', `${linkHtml}personal technical blog</a>`);
  } else if (bio.includes('個人技術部落格')) {
    return bio.replace('個人技術部落格', `${linkHtml}個人技術部落格</a>`);
  } else if (bio.includes('blog')) {
    return bio.replace('blog', `${linkHtml}blog</a>`);
  } else if (bio.includes('部落格')) {
    return bio.replace('部落格', `${linkHtml}部落格</a>`);
  }
  return bio;
});
</script>

<template>
  <section id="about" class="hero">
    <div class="content">
      <h1><span class="highlight">{{ resumeData.profile.name }}</span></h1>
      <h2 class="role">{{ resumeData.profile.role }}</h2>
      <p class="bio" v-html="parsedBio"></p>
      <div class="actions">
        <a href="#portfolio" class="btn primary">{{ resumeData.profile.cta_primary }}</a>
        <a href="#experience" class="btn secondary">{{ resumeData.profile.cta_secondary }}</a>
      </div>
    </div>
    <div class="avatar-container">
      <!-- Wrapper handles the 3D Tilt (Mouse Follow) -->
      <div
        class="coin-wrapper"
        ref="card"
        @mousemove="handleMouseMove"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        :style="wrapperStyle"
        role="button"
        :aria-label="isFlipped ? 'Show avatar' : 'Show contact information'"
        tabindex="0"
        @keydown.enter="toggleFlip"
        @keydown.space.prevent="toggleFlip"
      >
        <!-- Coin handles the Click Flip -->
        <div
          class="coin"
          :class="{ 'flipped': isFlipped }"
          @click="toggleFlip"
        >
          <!-- Front: Avatar -->
          <div class="coin-face front">
            <div class="glow" v-if="isHovering" aria-hidden="true"></div>
            <img
              :src="resumeData.profile.avatar"
              :alt="`${resumeData.profile.name} - ${resumeData.profile.role}`"
              class="avatar"
            />
          </div>
          <!-- Back: Contact Info -->
          <div class="coin-face back">
            <div class="contact-info">
              <h3>{{ resumeData.profile.contact_title }}</h3>
              <p class="contact-item">
                {{ resumeData.profile.phone }}
              </p>
              <p class="contact-item">
                <a :href="`mailto:${resumeData.profile.email}`" @click.stop>{{ resumeData.profile.email }}</a>
              </p>
            </div>
          </div>
        </div>
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
  flex: 2; /* Takes up 2/3 of space */
  z-index: 2;
  text-align: left;
}

/* ... */

.avatar-container {
  flex: 1; /* Takes up 1/3 of space */
  display: flex;
  justify-content: center;
  z-index: 2;
  perspective: 1000px;
}

.coin-wrapper {
  width: 260px; /* Reduced from 300px */
  height: 260px;
  cursor: pointer;
  perspective: 1000px; /* Perspective needed for child coin flip */
  /* Wrapper itself also moves in 3D */
  transform-style: preserve-3d; 
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
  transition: all var(--duration-normal) ease;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  cursor: pointer;
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
  flex: 1; /* Takes up 1/3 of space */
  display: flex;
  justify-content: center;
  z-index: 2;
  perspective: 1000px;
}

.coin-wrapper {
  width: 250px; /* Reduced from 300px */
  height: 250px;
  cursor: pointer;
  perspective: 1000px; /* Perspective needed for child coin flip */
  /* Wrapper itself also moves in 3D */
  transform-style: preserve-3d; 
}

.coin {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform var(--duration-slow) cubic-bezier(0.4, 0.2, 0.2, 1.1);
  transform-style: preserve-3d;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}

.coin.flipped {
  transform: rotateY(180deg);
}

.coin-face {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(66, 184, 131, 0.3);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  will-change: transform;
}

.front {
  z-index: 2;
}

.back {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--card-bg-color); /* Fallback */
  background: linear-gradient(135deg, var(--glass-bg) 0%, rgba(66, 184, 131, 0.1) 100%);
  border: 2px solid var(--primary-color);
  color: var(--color-text);
  padding: 2rem;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-info h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 1.2rem;
}

.contact-item {
  margin: 0.8rem 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap; /* allow wrap if really detailed */
  justify-content: center;
}

.contact-item a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--duration-normal) ease;
}

.contact-item a:hover {
  color: var(--primary-color);
}

.icon {
  font-size: 1.2rem;
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
  
  .coin-wrapper {
    width: 220px;
    height: 220px;
  }
}

@media (min-width: 1000px) {
  /* spacer : content : avatar : spacer = 1 : 4 : 2 : 1 */
  .hero::before {
    content: "";
    flex: 1;
    display: block;
  }

  .hero::after {
    content: "";
    flex: 1;
    display: block;
  }

  .content {
    flex: 4;
  }
  
  .avatar-container {
    flex: 2;
  }
}

/* Dark Mode Shadow Override */
:global([data-theme="dark"]) .coin {
  box-shadow: 0 20px 60px rgba(66, 184, 131, 0.3);
  border-color: rgba(66, 184, 131, 0.4);
}

/* Deep selector for v-html content */
:deep(.blog-link) {
  color: var(--primary-color);
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  animation: pulse 2s infinite;
  padding: 0 0.3rem;
  border-radius: 4px;
  transition: all var(--duration-normal) ease;
}

:deep(.blog-link:hover) {
  background-color: rgba(66, 184, 131, 0.1);
  transform: scale(1.1);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  :deep(.blog-link) {
    animation: none;
  }
}

@keyframes pulse {
  0% {
    text-shadow: 0 0 0 rgba(66, 184, 131, 0.4);
  }
  50% {
    text-shadow: 0 0 10px rgba(66, 184, 131, 0.8), 0 0 20px rgba(66, 184, 131, 0.4);
    transform: scale(1.02);
  }
  100% {
    text-shadow: 0 0 0 rgba(66, 184, 131, 0.4);
  }
}
</style>
