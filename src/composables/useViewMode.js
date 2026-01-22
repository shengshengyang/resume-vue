import { ref } from 'vue';

const isSimpleMode = ref(false);

const toggleViewMode = () => {
  isSimpleMode.value = !isSimpleMode.value;
};

export function useViewMode() {
  return {
    isSimpleMode,
    toggleViewMode
  };
}
