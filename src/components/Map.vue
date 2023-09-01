<template>
  <div>
    <div class="card-body" :id="id" :set-location="setLocation"
    :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import useGoogleApi from "../helpers/googleMap";
const emit = defineEmits(["location"]);
const props = defineProps({
  id: {
    type: String,
    default: "map",
  },
  latitude: {
    type: Number,
    default: 0,
  },
  longitude: {
    type: Number,
    default: 0,
  },
  setLocation: {
    type: Object,
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "300px",
  },
});
const { clickMap, location } = useGoogleApi(props.setLocation);
onMounted(async () => {
  const element = document.getElementById(props.id);
  await clickMap(element);
});

watch(location, (value) => {
  emit("location", value);
});
</script>
