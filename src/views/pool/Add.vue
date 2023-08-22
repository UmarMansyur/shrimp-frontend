<template>
  <Parent>
    <div class="row">
      <div class="col-12">
        <button class="btn btn-primary" @click="$router.go(-1)"><i class="bx bx-arrow-back"></i></button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="card-body p-4">
            <form action="">
              <div class="row">
                <div class="col-12 mb-3">
                  <label for="pond_name" class="form-label">Pilih Tambak: </label>
                  <select name="pond_name" id="pond_name" class="form-select">Pilih Jenis Tambak</select>
                </div>
                <div class="col-12 mb-3">
                  <label for="pool_name" class="form-label">Nama Kolam: </label>
                  <input type="text" name="pool_name" id="pool_name" class="form-control" placeholder="Nama Kolam">
                  </div>
                  <div class="col-12 mb-3">
                    <label for="pool_address" class="form-label">Lokasi: </label>
                    <Map></Map>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>


<script setup lang="ts">
import Parent from '../Parent.vue';
import Map from '../../components/Map.vue';

</script>