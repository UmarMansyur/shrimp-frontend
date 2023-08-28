import { ref } from "vue";

const loader = ref<Boolean>(true);

export default function useSkeleton() {
  const showLoader = async () => {
    loader.value = true;
  }

  const hideLoader = async () => {
    loader.value = false;
  }

  return {
    loader,
    showLoader,
    hideLoader
  }
}