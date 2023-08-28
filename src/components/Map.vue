<template>
  <div class="map-google card-body" id="map" style="width: 100%; height: 300px;"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import useGoogleApi from '../helpers/googleMap';
const { clickMap, location } = useGoogleApi();
const emit = defineEmits(['location']);


onMounted(async () => {
  await clickMap();
});

watch(location, (value) => {
  emit('location', value);
});
</script>