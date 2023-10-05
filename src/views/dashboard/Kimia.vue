<template>
  <button class="btn btn-outline-danger btn-sm me-2 mb-3" data-bs-target="#kimia-modal" data-bs-toggle="modal">
    <i class="ri-temp-hot-line"></i> Kimia
  </button>
  <Modal modal-id="kimia-modal" modal="modal-md" title="Kimia">
    <div class="row">
      <div class="col-12 mb-3">
        <label for="kolam" class="form-label">Kolam: </label>
        <Pool></Pool>
      </div>
    </div>
    <div class="row" v-if="pond.is_start">
      <div class="col-md-6 mb-3">
        <label for="date" class="form-label">Tanggal Pengecekan: </label>
        <VueDatePicker auto-apply format="yyyy-MM-dd" :enable-time-picker="false" v-model="date"
          :class="date_meta.dirty && !date_meta.valid ? 'is-invalid' : ''" />
      </div>
      <div class="col-md-6 mb-3">
        <label for="date" class="form-label">Waktu Pengecekan: </label>
        <VueDatePicker auto-apply time-picker v-model="time"
          :class="time_meta.dirty && !time_meta.valid ? 'is-invalid' : ''" />
      </div>
      <div class="col-md-6 mb-3">
        <label for="amonia" class="form-label">Amonia: </label>
        <input type="search" class="form-control" id="amonia" placeholder="Amonia" v-model="amonia"
          :class="amonia_meta.dirty && !amonia_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-md-6 mb-3">
        <label for="nitrit" class="form-label">Nitrit: </label>
        <input type="search" class="form-control" id="nitrit" placeholder="Nitrit" v-model="nitrit"
          :class="nitrit_meta.dirty && !nitrit_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-md-6 mb-3">
        <label for="nitrat" class="form-label">Nitrat: </label>
        <input type="search" class="form-control" id="nitrat" placeholder="Nitrat" v-model="nitrat"
          :class="nitrat_meta.dirty && !nitrat_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-md-6 mb-3">
        <label for="alkalinitas" class="form-label">Alkalinitas: </label>
        <input type="search" class="form-control" id="alkalinitas" placeholder="Alkalinitas" v-model="alkalinitas"
          :class="alkalinitas_meta.dirty && !alkalinitas_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-6">
        <button class="btn btn-light" data-bs-dismiss="modal">
          <i class="bx bx-x"></i> Batal
        </button>
      </div>
      <div class="col-6 text-end">
        <button class="btn btn-success" @click="save" :disabled="!meta.valid" data-bs-dismiss="modal">
          <i class="bx bx-send"></i> Simpan
        </button>
      </div>
    </div>
    <div class="row" v-else>
      <NotCycleFound/>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import Modal from '../../components/Modal.vue';
import Pool from '../../components/Pool.vue';
import * as yup from 'yup';
import { usePond } from '../../stores/pond';
import useApi from '../../composables/api';
import Notify from '../../helpers/notify';
import NotCycleFound from '../../components/NotCycleFound.vue';

const schema = yup.object({
  date: yup.date().required(),
  time: yup.string().required(),
  amonia: yup.string().required(),
  nitrit: yup.string().required(),
  nitrat: yup.string().required(),
  alkalinitas: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    date: new Date(),
    time: new Date().toTimeString().split(' ')[0],
    amonia: '',
    nitrit: '',
    nitrat: '',
    alkalinitas: '',
  }
});

const { value: date, meta: date_meta } = useField<Date>('date');
const { value: time, meta: time_meta } = useField<string>('time');
const { value: amonia, meta: amonia_meta } = useField<string>('amonia');
const { value: nitrit, meta: nitrit_meta } = useField<string>('nitrit');
const { value: nitrat, meta: nitrat_meta } = useField<string>('nitrat');
const { value: alkalinitas, meta: alkalinitas_meta } = useField<string>('alkalinitas');

const pond = usePond();
const { postResource } = useApi();
const save = async () => {
  if (pond.pool_id === 0) return Notify.error('Kolam belum dipilih');
  const data = {
    pool_id: pond.pool_id,
    date: date.value.toISOString().split('T')[0],
    time: time.value,
    amonia: amonia.value,
    nitrit: nitrit.value,
    nitrat: nitrat.value,
    alkalinitas: alkalinitas.value,
  };
  const response = await postResource('/kimia', data);
  if (response) {
    Notify.success('Berhasil menambahkan data kimia air');
  }
  clearData();
};

function clearData() {
  date.value = new Date();
  time.value = new Date().toTimeString().split(' ')[0];
  amonia.value = '';
  nitrit.value = '';
  nitrat.value = '';
  alkalinitas.value = '';
}


</script>