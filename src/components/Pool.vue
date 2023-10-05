<template>
  <select name="pool" id="pool" class="form-select" v-model="pools.pool_id" @change="checkCycle">
    <option :value="0">Pilih Kolam</option>
    <option v-for="pool in pools.pool" :value="pool.id" :key="pool.id">{{ pool.name == null ? 'Belum di set' : pool.name
    }}</option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePond } from '../stores/pond';
import useApi from '../composables/api';
const pools: any = usePond();
const select = ref<any>(null);

const { getResource } = useApi();
const checkCycle = async () => {
  if(pools.pool_id > 0) {
    const response = await getResource('/pool/' + pools.pool_id);
    if(response) {
      pools.is_start = response.stock_date !== null;
    }
  } 
}


</script>