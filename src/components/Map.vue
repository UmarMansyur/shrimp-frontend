<template>
  <div class="map-google" id="map" style="width: 100%; height: 200px;"></div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import GoogleApi from '../helpers/googleMap';

onMounted(async () => {
  await GoogleApi.clickMap();
});

// async function initMap() {
//   const loader: any = await GoogleApi.getGoogleApi();

//   loader.load().then(async () => {
//     const { Map } = await google.maps.importLibrary("maps");
//     for (let a = 1; a < 2; a++) {
//       let map = new Map(document.querySelector(".map-google"), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//       });

//       const { Marker } = await google.maps.importLibrary("marker");
//       new Marker({
//         position: { lat: -34.397, lng: 150.644 },
//         map,
//         title: "Hello World!",
//       });
//     }
//   });
// }


</script>