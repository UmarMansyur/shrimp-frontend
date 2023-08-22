<template>
  <Parent>
    <div class="row">
      <div class="col-12 mb-3 text-end">
        <RouterLink to="/pool/create" class="btn btn-outline-primary">Tambah Kolam</RouterLink>
      </div>
      <div class="row">
        <PoolMap></PoolMap>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import PoolMap from '../../components/poolMap.vue';
import Parent from '../Parent.vue';
</script>