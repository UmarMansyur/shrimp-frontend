<template>
  <button class="btn btn-outline-danger btn-sm me-2 mb-3" data-bs-target="#kimia-modal" data-bs-toggle="modal">
    <i class="ri-temp-hot-line"></i> Kimia
  </button>
  <Modal modal-id="kimia-modal" modal="modal-md" title="Kimia">
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
        <label for="amonia" class="form-label">Amonia: </label>
        <input type="search" class="form-control" id="amonia" placeholder="amonia">
      </div>
      <div class="col-md-6 mb-3">
        <label for="nitrit" class="form-label">Nitrit: </label>
        <input type="search" class="form-control" id="nitrit" placeholder="nitrit">
      </div>
      <div class="col-md-6 mb-3">
        <label for="nitrat" class="form-label">Nitrat: </label>
        <input type="search" class="form-control" id="nitrat" placeholder="nitrat">
      </div>
      <div class="col-md-6 mb-3">
        <label for="alkalinitas" class="form-label">Alkalinitas: </label>
        <input type="search" class="form-control" id="alkalinitas" placeholder="alkalinitas">
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