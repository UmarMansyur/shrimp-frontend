<template>
  <div class="page-title-box">
    <div class="row justify-content-between align-items-center mt-3">
      <div class="col-md-3 col-6">
        <select name="ponds" id="ponds" class="form-select">
          <option value="1" selected>Tambak 1</option>
        </select>
      </div>
      <div class="col-md-6 d-none d-md-block"></div>
      <div class="col-md-3 col-6">
        <div class="row align-item-center">
          <label class="col-sm-3 col-form-label col-form-label d-none d-lg-block">Bulan:</label>
          <div class="col-sm-9">
            <div class="input-group">
              <VueDatePicker month-picker light="true" v-model="month" auto-apply></VueDatePicker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <span>Rombasan Pragaan Sumenep</span> <a href="" class="text-info">Lihat Daftar kolam</a>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <StartSycle/>
        <Feed/>
        <Anco/>
        <Water/>
        <Kimia/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StartSycle from './StartCycle.vue';
import Feed from './Feed.vue';
import Water from './Water.vue';
import Anco from './Anco.vue';
import Kimia from './Kimia.vue';
const month = ref(new Date());
</script>