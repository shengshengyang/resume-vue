import { ref, computed, watch } from 'vue';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

// Import avatar image
import headImage from '@/assets/head.jpg';

const currentLang = ref(localStorage.getItem('language') || 'en');

const messages = {
  en,
  zh
};

// Resolve avatar path to actual URL
const resolveAvatar = (data) => {
  if (data.profile.avatar === '@/assets/head.jpg') {
    data.profile.avatar = headImage;
  }
  return data;
};

const resumeData = computed(() => resolveAvatar({ ...messages[currentLang.value] }));

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
