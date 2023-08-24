<template>
  <button class="btn btn-outline-success btn-sm me-2 mb-3" data-bs-target="#feed-modal" data-bs-toggle="modal">
    <i class="ri-dropbox-fill"></i> Pakan
  </button>
  <Modal modalId="feed-modal" modal="modal-md" title="Pakan">
    <div class="row">
      <div class="col-12 mb-3">
        <Pool></Pool>
      </div>
      <div class="col-md-6 mb-3">
        <label for="date" class="form-label">Tanggal Pemberian Pakan: </label>
        <VueDatePicker light="true" auto-apply format="DD-MM-YYYY"></VueDatePicker>
      </div>
      <div class="col-md-6 mb-3">
        <label for="time-feed" class="form-label">Waktu: </label>
        <VueDatePicker light="true" auto-apply time-picker></VueDatePicker>
      </div>
      <div class="col-md-12 mb-3">
        <label for="amount" class="form-label">Jumlah(Kg): </label>
        <input type="search" name="amount" id="amount" class="form-control">
      </div>
      <div class="col-md-12 mb-3">
        <div class="form-check form-switch form-switch-md">
          <input class="form-check-input" type="checkbox" role="switch" id="skip-day">
          <label class="form-check-label" for="skip-day">Lewati Hari Ini</label>
        </div>
      </div>
      <div class="col-md-12 mb-3">
        <label for="desc">Catatan: </label>
        <textarea name="desc" id="desc" cols="30" rows="5" class="form-control"></textarea>
      </div>
      <div class="col-md-6">
        <button class="btn btn-light">
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