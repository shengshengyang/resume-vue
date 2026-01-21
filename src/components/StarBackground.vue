<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref(null);
let animationFrameId;

const initStars = () => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  canvas.width = width;
  canvas.height = height;
  
  const stars = [];
  const numStars = 200;
  
  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.brightness = Math.random();
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
      
      // Twinkle effect
      this.brightness += (Math.random() - 0.5) * 0.1;
      if (this.brightness > 1) this.brightness = 1;
      if (this.brightness < 0.3) this.brightness = 0.3;
    }
    
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
  
  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  animate();
  
  const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationFrameId);
  };
};

onMounted(() => {
  const cleanup = initStars();
  onUnmounted(cleanup);
});
</script>

<template>
  <canvas ref="canvasRef" class="star-background"></canvas>
</template>

<style scoped>
.star-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
