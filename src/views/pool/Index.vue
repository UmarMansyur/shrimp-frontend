<template>
  <Parent>
    <div class="row">
      <div class="col-12 mb-3 text-end">
        <RouterLink to="/pool/create" class="btn btn-outline-primary">Tambah Kolam</RouterLink>
      </div>
      <div class="row">
        <Map></Map>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
  import Parent from '../Parent.vue';
  import Map from '../../components/Map.vue';
</script>