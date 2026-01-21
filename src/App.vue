<script setup>
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import Experience from './components/Experience.vue'
import Skills from './components/Skills.vue'
import Portfolio from './components/Portfolio.vue'
import Footer from './components/Footer.vue'
import StarBackground from './components/StarBackground.vue'
</script>

<template>
  <div class="app-container">
    <StarBackground />
    <NavBar />
    <main>
      <div class="content-wrapper">
        <Hero />
        <Experience />
        <Skills />
        <Portfolio />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
</style>
