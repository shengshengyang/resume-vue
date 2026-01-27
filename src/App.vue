<script setup>
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import Experience from './components/Experience.vue'
import Skills from './components/Skills.vue'
import Portfolio from './components/Portfolio.vue'
import Footer from './components/Footer.vue'
import AmbientBackground from './components/AmbientBackground.vue'
import SimpleResume from './components/SimpleResume.vue'
import { useViewMode } from './composables/useViewMode'
import { useLanguage } from './composables/useLanguage'

const { isSimpleMode } = useViewMode()
const { isChangingLang, transitionKey } = useLanguage()
</script>

<template>
  <div class="app-container">
    <a href="#main-content" class="skip-to-main">{{ isSimpleMode ? 'Skip to content' : '跳至主內容' }}</a>
    <AmbientBackground v-if="!isSimpleMode" />
    <NavBar /> <!-- NavBar handles the toggle -->

    <main v-if="!isSimpleMode" id="main-content" class="main-content" :class="{ 'sand-dissolve': isChangingLang }" :key="transitionKey">
      <div class="content-wrapper">
        <Hero />
        <Experience />
        <Skills />
        <Portfolio />
      </div>
    </main>

    <SimpleResume v-else id="main-content" />

    <Footer v-if="!isSimpleMode" />
  </div>
</template>

<style>
.app-container {
  position: relative;
  z-index: 1;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

main {
  position: relative;
  z-index: 2;
}

/* Sand dissolve effect */
.main-content {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-content.sand-dissolve {
  opacity: 0;
}

/* Text sand dissolve animation - enhanced */
.main-content.sand-dissolve h1,
.main-content.sand-dissolve h2,
.main-content.sand-dissolve h3,
.main-content.sand-dissolve h4,
.main-content.sand-dissolve p,
.main-content.sand-dissolve span,
.main-content.sand-dissolve a,
.main-content.sand-dissolve .skill-tag,
.main-content.sand-dissolve .tag,
.main-content.sand-dissolve .period,
.main-content.sand-dissolve .contact-item,
.main-content.sand-dissolve .project-name,
.main-content.sand-dissolve .company-name,
.main-content.sand-dissolve .role,
.main-content.sand-dissolve .section-title,
.main-content.sand-dissolve .subsection-title {
  animation: sandDissolve 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}

/* New text sand formation animation - enhanced */
.main-content:not(.sand-dissolve) h1,
.main-content:not(.sand-dissolve) h2,
.main-content:not(.sand-dissolve) h3,
.main-content:not(.sand-dissolve) h4,
.main-content:not(.sand-dissolve) p,
.main-content:not(.sand-dissolve) span,
.main-content:not(.sand-dissolve) .skill-tag,
.main-content:not(.sand-dissolve) .tag,
.main-content:not(.sand-dissolve) .period,
.main-content:not(.sand-dissolve) .contact-item,
.main-content:not(.sand-dissolve) .project-name,
.main-content:not(.sand-dissolve) .company-name,
.main-content:not(.sand-dissolve) .role,
.main-content:not(.sand-dissolve) .section-title,
.main-content:not(.sand-dissolve) .subsection-title {
  animation: sandFormation 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}

/* Stagger animations for different elements */
.main-content h1 { animation-delay: 0ms !important; }
.main-content h2 { animation-delay: 50ms !important; }
.main-content h3 { animation-delay: 100ms !important; }
.main-content h4 { animation-delay: 150ms !important; }
.main-content p { animation-delay: 200ms !important; }
.main-content .skill-tag { animation-delay: 250ms !important; }
.main-content .tag { animation-delay: 250ms !important; }

/* Mobile optimizations */
@media (max-width: 768px) {
  .main-content h1,
  .main-content h2,
  .main-content h3,
  .main-content h4,
  .main-content p,
  .main-content .skill-tag,
  .main-content .tag {
    animation-delay: 0ms !important;
  }
}
</style>
