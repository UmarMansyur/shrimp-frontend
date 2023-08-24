<template>
  <div class="modal fade" :id="modalId" data-bs-keyboard="false" tabindex="-1"
    aria-hidden="true">
    <div class="modal-dialog" :class="modal" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalScrollableTitle">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body">

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modal: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  modalId: {
    type: String,
    required: true
  }
});
</script>