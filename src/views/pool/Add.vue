<template>
  <Parent>
    <div class="row mb-3">
      <div class="col-12">
        <button class="btn btn-primary" @click="$router.go(-1)"><i class="bx bx-arrow-back"></i></button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Tambah Tambak</h4>
            <div class="flex-shrink-0">
              <div class="form-check form-switch form-switch-right form-switch-md">
                <input class="form-check-input code-switcher" type="checkbox" id="shape" @click="isSircle()">
                <label for="shape" class="form-label text-muted">Lingkaran</label>
              </div>
            </div>
          </div>
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
                  <small class="mt-3">Harap aktifkan GPS terlebih dahulu, secara default. Mark yang ada dipeta mengikuti
                    posisi GPS anda.</small>
                </div>
                <div v-if="!circle" class="col-12">
                  <SquareWide></SquareWide>
                </div>
                <div class="col-12" v-else>
                <CircleWide></CircleWide>
                </div>
                <div class="col-12 mb-3">
                  <label for="anco" class="form-label">Jumlah Anco: </label>
                  <input text="number" name="anco" id="anco" class="form-control" placeholder="4">
                </div>
                <hr>
                <div class="col-md-12 mt-3 text-center">
                  <button class="btn btn-success"><i class="bx bx-send"></i> Simpan Kolam</button>
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
import { ref } from 'vue';
import SquareWide from './SquareWide.vue';
import CircleWide from './CircleWide.vue';


const circle = ref<any>(false);
const isSircle = () => {
  circle.value = !circle.value;
};
</script>