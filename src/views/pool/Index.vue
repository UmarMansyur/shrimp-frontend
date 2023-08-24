<template>
  <Parent>
    <div class="row">
      <div class="col-md-2 mb-3">
        <select name="ponds" id="ponds" class="form-select">
          <option value="1" selected>Tambak 1</option>
        </select>
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-6 mb-3 text-end">
        <RouterLink to="/pool/create" class="btn btn-outline-primary">Tambah Kolam</RouterLink>
      </div>
      <div class="col-12">
        <PoolMap></PoolMap>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import PoolMap from '../../components/poolMap.vue';
import Parent from '../Parent.vue';
</script>