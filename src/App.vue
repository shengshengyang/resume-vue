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

const { isSimpleMode } = useViewMode()
</script>

<template>
  <div class="app-container">
    <AmbientBackground v-if="!isSimpleMode" />
    <NavBar /> <!-- NavBar handles the toggle -->
    
    <main v-if="!isSimpleMode">
      <div class="content-wrapper">
        <Hero />
        <Experience />
        <Skills />
        <Portfolio />
      </div>
    </main>

    <SimpleResume v-else />

    <Footer v-if="!isSimpleMode" />
  </div>
</template>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
</style>
