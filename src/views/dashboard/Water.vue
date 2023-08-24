<template>
  <button class="btn btn-outline-info btn-sm me-2 mb-3" data-bs-target="#water-modal" data-bs-toggle="modal">
    <i class="ri-water-flash-line"></i> Air
  </button>
  <Modal modal-id="water-modal" modal="modal-md" title="Kualitas Air">
    <div class="row">
      <Pool></Pool>
      <div class="col-md-6 mb-3">
      <label for="date" class="form-label">Tanggal Pengecekan: </label>
        <VueDatePicker auto-apply format="YYY/MM/DD"/>
      </div>
      <div class="col-md-6 mb-3">
      <label for="date" class="form-label">Waktu Pengecekan: </label>
        <VueDatePicker auto-apply time-picker/>
      </div>
      <div class="col-md-6 mb-3">
        <label for="pH" class="form-label">pH: </label>
        <input type="search" class="form-control" id="pH" placeholder="pH">
      </div>
      <div class="col-md-6 mb-3">
        <label for="salinitas" class="form-label">Salinitas: </label>
        <input type="search" class="form-control" id="salinitas" placeholder="salinitas">
      </div>
      <div class="col-md-6 mb-3">
        <label for="temperature" class="form-label">Suhu: </label>
        <input type="search" class="form-control" id="temperature" placeholder="temperature">
      </div>
      <div class="col-md-6 mb-3">
        <label for="do" class="form-label">DO: </label>
        <input type="search" class="form-control" id="Do" placeholder="do">
      </div>
      <div class="col-md-12 mb-3">
        <label for="water-color" class="form-label">Warna Air: </label>
        <input type="search" class="form-control" id="water-color" placeholder="water-color">
      </div>
      <div class="col-md-6">
        <button class="btn btn-light" data-bs-dismiss="modal">
          <i class="bx bx-x"></i> Batal
        </button>
      </div>
      <div class="col-md-6 text-end">
        <button class="btn btn-success">
          <i class="bx bx-send"></i> Simpan
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '../../components/Modal.vue';
import Pool from '../../components/Pool.vue';
</script>