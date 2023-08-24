<template>
  <button class="btn btn-outline-warning btn-sm me-2 mb-3" data-bs-target="#anco-modal" data-bs-toggle="modal">
    <i class="ri-git-merge-line align-middle"></i> Anco
  </button>
  <Modal modal="modal-lg modal-dialog-scrollable" modal-id="anco-modal" title="Cek Anco">
    <div class="row">
      <Pool></Pool>
      <div class="col-md-12 mb-3">
        <label for="date" class="form-label">Tanggal: </label>
        <VueDatePicker light="true" auto-apply format="DD-MM-YYYY"></VueDatePicker>
      </div>
      <div class="col-md-6 mb-3">
        <label for="feed" class="form-label">Tanggal Pemberian Pakan</label>
        <VueDatePicker light="true" auto-apply format="DD-MM-YYYY"></VueDatePicker>
      </div>
      <div class="col-md-6 mb-3">
        <label for="time-feed" class="form-label">Waktu: </label>
        <VueDatePicker light="true" auto-apply time-picker></VueDatePicker>
      </div>
      <div class="col-md-12 mb-3">
        <label for="anco" class="form-label">Anco 1: </label>
        <div class="row justify-content-between">
          <div class="col-md-4">
            <div class="form-check form-switch form-switch-md mb-3 ">
              <input class="form-check-input" type="checkbox" role="switch" id="finished">
              <label class="form-check-label" for="finished">Habis</label>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-check form-switch form-switch-md mb-3 ">
              <input class="form-check-input" type="checkbox" role="switch" id="little-left">
              <label class="form-check-label" for="little-left">Sisa Sedikit</label>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-check form-switch form-switch-md mb-3 ">
              <input class="form-check-input" type="checkbox" role="switch" id="left a lot">
              <label class="form-check-label" for="left a lot">Sisa Banyak</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 mb-3">
        <label for="desc" class="form-label">Deskripsi: </label>
        <textarea name="desc" id="desc" cols="30" rows="10" class="form-control"></textarea>
      </div>
      <div class="col-md-6 mb-3">
        <button class="btn btn-light">
          <i class="bx bx-x"></i> Batal
        </button>
      </div>
      <div class="col-md-6 mb-2 text-end">
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