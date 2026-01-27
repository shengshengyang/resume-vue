<template>
  <div class="ambient-background">
    <div class="noise"></div>
    <div class="vignette"></div>
  </div>
</template>

<style scoped>
.ambient-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background-color: var(--color-background);
  transition: background-color var(--duration-normal) ease;
  will-change: background-color;
}

.noise {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03; /* Very subtle grain */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  will-change: opacity;
}

.vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(66, 184, 131, 0.03) 0%, /* Subtle Vue Green core */
    transparent 60%,
    var(--vignette-color) 100%
  );
}

@media (prefers-reduced-motion: reduce) {
  .ambient-background,
  .noise {
    transition: none;
    will-change: auto;
  }
}
</style>
