<template>
  <div class="col-md-3">
    <div class="input-group mb-3">
      <label for="" class="mt-2 me-2">Tampilkan</label>
      <select class="form-select" v-model="limit">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
const limit = ref<number>(10);
const computedLimit = computed(() => limit.value);
const emit = defineEmits(['limit']);
watch(computedLimit, (value) => {
  if(value) {
    limit.value = value;
    emit('limit', value);
  }
});
</script>