import { ref, computed, watch } from 'vue';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

const currentLang = ref(localStorage.getItem('language') || 'en');

const messages = {
  en,
  zh
};

const resumeData = computed(() => messages[currentLang.value]);

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'zh' : 'en';
};

watch(currentLang, (newLang) => {
  localStorage.setItem('language', newLang);
});

export function useLanguage() {
  return {
    currentLang,
    resumeData,
    toggleLanguage
  };
}
