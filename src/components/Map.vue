<template>
  <div class="map-google card-body" id="map" style="width: 100%; height: 300px;"></div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import GoogleApi from '../helpers/googleMap';

onMounted(async () => {
  await GoogleApi.clickMap();
});

</script>