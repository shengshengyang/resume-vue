import { ref, computed, watch } from 'vue';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

const currentLang = ref(localStorage.getItem('language') || 'en');

const messages = {
  en,
  zh
};

const resumeData = computed(() => messages[currentLang.value]);
const isChangingLang = ref(false);
const transitionKey = ref(0);

const toggleLanguage = async () => {
  isChangingLang.value = true;
  transitionKey.value++;

  // 沙子消散动画时长
  await new Promise(resolve => setTimeout(resolve, 600));

  currentLang.value = currentLang.value === 'en' ? 'zh' : 'en';

  // 新文字浮现动画时长
  await new Promise(resolve => setTimeout(resolve, 100));

  isChangingLang.value = false;
};

watch(currentLang, (newLang) => {
  localStorage.setItem('language', newLang);
});

export function useLanguage() {
  return {
    currentLang,
    resumeData,
    toggleLanguage,
    isChangingLang,
    transitionKey
  };
}
