<template>
  <button class="btn btn-outline-primary btn-sm me-2 mb-3" data-bs-target="#static-modal" data-bs-toggle="modal">
    <i class="ri-bubble-chart-fill align-middle"></i> Mulai Siklus
  </button>
  <Modal modal="modal-lg" modal-id="static-modal" title="Mulai Siklus">
    <div class="row">
      <Pool></Pool>
      <div class="col-12 mb-3">
        <label for="date" class="form-label">Tanggal Tebar: </label>
        <VueDatePicker v-model="date" light="true" auto-apply></VueDatePicker>
      </div>
      <div class="col-12 mb-3">
        <label for="amount">Jumlah Bibit:</label>
        <input type="search" name="amount" id="amount" class="form-control" placeholder="Jumlah Bibit">
      </div>
      <div class="col-6">
        <button class="btn btn-light" data-bs-dismiss="modal">
          <i class="bx bx-x"></i> Batal
        </button>
      </div>
      <div class="col-6 text-end">
        <button class="btn btn-success" data-bs-dismiss="modal">
          <i class="bx bx-send"></i> Simpan
        </button>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Modal from '../../components/Modal.vue';
import Pool from '../../components/Pool.vue';
const date = ref<Date>(new Date());
</script>