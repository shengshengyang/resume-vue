<script setup>
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <a href="#" class="logo">Alex Dev</a>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* Glassmorphic Navbar */
.navbar {
  background-color: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: var(--glass-border);
  padding: 1rem 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: text-shadow 0.3s ease;
}

.logo:hover {
  text-shadow: 0 0 10px var(--primary-color);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: var(--color-text);
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
  box-shadow: 0 0 5px var(--primary-color);
}

.nav-links a:hover {
  color: var(--primary-color);
  text-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
}

.nav-links a:hover::after {
  width: 100%;
}
</style>
