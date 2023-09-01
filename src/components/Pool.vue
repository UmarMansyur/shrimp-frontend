<template>
  <select name="pool" id="pool" class="form-select" v-model="pools.pool_id" >
    <option :value="0">Pilih Kolam</option>
    <option v-for="pool in pools.pool" :value="pool.id" :key="pool.id">{{ pool.name == null ? 'Belum di set' : pool.name
    }}</option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePond } from '../stores/pond';
const pools: any = usePond();
const select = ref<any>(null);



</script>