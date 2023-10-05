<template>
  <button class="btn btn-outline-info btn-sm me-2 mb-3" data-bs-target="#water-modal" data-bs-toggle="modal">
    <i class="ri-water-flash-line"></i> Air
  </button>
  <Modal modal-id="water-modal" modal="modal-md" title="Kualitas Air">
    <div class="row">
      <div class="col-12 mb-3">
        <label for="kolam" class="form-label">Kolam: </label>
        <Pool></Pool>
      </div>
    </div>
    <div class="row" v-show="pond.is_start">
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
        <label for="pH" class="form-label">pH: </label>
        <input type="search" class="form-control" id="pH" placeholder="pH" v-model="ph"
          :class="ph_meta.dirty && !ph_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-md-6 mb-3">
        <label for="salinitas" class="form-label">Salinitas: </label>
        <input type="search" class="form-control" id="salinitas" placeholder="Salinitas" v-model="salinitas"
          :class="salinitas_meta.dirty && !salinitas_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-md-6 mb-3">
        <label for="temperature" class="form-label">Suhu: </label>
        <input type="search" class="form-control" id="temperature" placeholder="Suhu" v-model="temperature"
          :class="temperature_meta.dirty && !temperature_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-md-6 mb-3">
        <label for="do" class="form-label">DO: </label>
        <input type="search" class="form-control" id="Do" placeholder="DO" v-model="Do"
          :class="Do_meta.dirty && !Do_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-md-6 mb-3">
        <label for="water-color" class="form-label">Warna Air: </label>
        <select class="form-select" aria-label="Default select example" v-model="waterColor" id="water-color"
          :class="waterColor_meta.dirty && !waterColor_meta.valid ? 'is-invalid' : ''">
          <option value="" disabled> Pilih Warna Air </option>
          <option value="Kuning">Kuning</option>
          <option value="Kuning Kehijauan">Kuning Kehijauan</option>
          <option value="Coklat">Coklat</option>
          <option value="Coklat Kehijauan">Coklat Kehijauan</option>
          <option value="Coklat Gelap">Coklat Gelap</option>
          <option value="Coklat Muda">Coklat Muda</option>
          <option value="Coklat Kemerahan">Coklat Kemerahan</option>
          <option value="Hijau">Hijau</option>
          <option value="Hijau Kecoklatan">Hijau Kecoklatan</option>
          <option value="Hijau Kebiruan">Hijau Kebiruan</option>
          <option value="Hijau Gelap Kecoklatan">Hijau Gelap Kecoklatan</option>
          <option value="Hijau Kecoklatan">Hijau Kecoklatan</option>
          <option value="Hijau Gelap">Hijau Gelap</option>
          <option value="Hitam">Hitam</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label for="brightness" class="form-label">Kecerahan: </label>
        <input type="search" class="form-control" id="brightness" placeholder="Kecerahan" v-model="brightness"
          :class="brightness_meta.dirty && !brightness_meta.valid ? 'is-invalid' : ''">
      </div>
      <div class="col-md-6">
        <button class="btn btn-light" data-bs-dismiss="modal">
          <i class="bx bx-x"></i> Batal
        </button>
      </div>
      <div class="col-md-6 text-end">
        <button class="btn btn-success" @click="save" :disabled="!meta.valid" data-bs-dismiss="modal">
          <i class="bx bx-send"></i> Simpan
        </button>
      </div>
    </div>
    <div class="row" v-show="!pond.is_start">
      <NotCycleFound />
    </div>
  </Modal>
</template>

<script setup lang="ts">
declare const Choices: any;
import { useField, useForm } from 'vee-validate';
import Modal from '../../components/Modal.vue';
import Pool from '../../components/Pool.vue';
import * as yup from 'yup';
import { onMounted } from 'vue';
import { usePond } from '../../stores/pond';
import useApi from '../../composables/api';
import Notify from '../../helpers/notify';
import { convertMinutes } from '../../helpers/convertMinutes';
import NotCycleFound from '../../components/NotCycleFound.vue';

const schema = yup.object().shape({
  date: yup.date().required(),
  time: yup.string().required(),
  ph: yup.number().required(),
  salinitas: yup.number().required(),
  temperature: yup.number().required(),
  do: yup.number().required(),
  waterColor: yup.string().required(),
  brightness: yup.number().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    date: new Date(),
    time: new Date().toTimeString().split(' ')[0],
    ph: '',
    salinitas: '',
    temperature: '',
    do: '',
    waterColor: '',
    brightness: '',
  }
});

const { value: date, meta: date_meta } = useField<Date>('date');
const { value: time, meta: time_meta } = useField<string>('time');
const { value: ph, meta: ph_meta } = useField<number>('ph');
const { value: salinitas, meta: salinitas_meta } = useField<number>('salinitas');
const { value: temperature, meta: temperature_meta } = useField<number>('temperature');
const { value: Do, meta: Do_meta } = useField<number>('do');
const { value: waterColor, meta: waterColor_meta } = useField<string>('waterColor');
const { value: brightness, meta: brightness_meta } = useField<number>('brightness');

onMounted(() => {
  new Choices('#water-color', {
    searchEnabled: true,
    itemSelectText: '',
    allowHTML: true,
  });
});

const pond = usePond();
const { postResource } = useApi();
const save = async () => {
  if (pond.pool_id === 0) return Notify.error('Kolam belum dipilih');
  const data = {
    pool_id: pond.pool_id,
    date: date.value.toISOString().split('T')[0],
    time: convertMinutes(time.value),
    pH: ph.value,
    salinity: salinitas.value,
    temperature: temperature.value,
    DO: Do.value,
    water_color: waterColor.value,
    brightness: brightness.value,
    water_height: 0,
  };
  const response = await postResource('/water', data);
  if (response) {
    Notify.success('Berhasil menyimpan data');
  }
};
</script>