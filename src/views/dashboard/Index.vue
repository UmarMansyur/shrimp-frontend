<template>
  <Parent>
    <Shrimp />
    <CardInformation />
    <ChartInformation />
  </Parent>
</template>

<script setup lang="ts">
import Shrimp from './Shrimp.vue';
import Parent from '../Parent.vue';
import CardInformation from './CardInformation.vue';
import ChartInformation from './ChartInformation.vue';
</script>