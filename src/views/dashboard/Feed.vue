<template>
  <button class="btn btn-outline-success btn-sm me-2 mb-3" data-bs-target="#feed-modal" data-bs-toggle="modal">
    <i class="ri-dropbox-fill"></i> Pakan
  </button>
  <Modal modalId="feed-modal" modal="modal-md" title="Pakan">
    <div class="row">
      <div class="col-12 mb-3">
        <Pool></Pool>
      </div>
    </div>
    <div class="row"  v-if="pond.is_start">
      <div class="col-md-6 mb-3">
        <label for="date" class="form-label">Tanggal Pemberian Pakan: </label>
        <VueDatePicker light="true" auto-apply format="yyyy-MM-dd" v-model="date" :enable-time-picker="false"
          :disabled="skipDay" />
      </div>
      <div class="col-md-6 mb-3">
        <label for="time-feed" class="form-label">Waktu: </label>
        <VueDatePicker light="true" auto-apply time-picker v-model="time" :is-24="true" enable-seconds
          :disabled="skipDay" />
      </div>
      <div class="col-md-12 mb-3">
        <label for="amount" class="form-label">Jumlah(Kg): </label>
        <input type="search" name="amount" id="amount" class="form-control" placeholder="Jumlah Pakan" v-model="amount"
          :disabled="skipDay">
      </div>
      <div class="col-md-12 mb-3">
        <div class="form-check form-switch form-switch-md">
          <input class="form-check-input" type="checkbox" role="switch" id="skip-day" v-model="skipDay">
          <label class="form-check-label" for="skip-day">Lewati Hari Ini</label>
        </div>
      </div>
      <div class="col-md-6">
        <button class="btn btn-light" data-bs-dismiss="modal">
          <i class="bx bx-x"></i> Batal
        </button>
      </div>
      <div class="col-md-6 text-end">
        <button class="btn btn-success" data-bs-dismiss="modal" @click="save" :disabled="!meta.valid && !skipDay">
          <i class="bx bx-send"></i> Simpan
        </button>
      </div>
    </div>
    <div class="row" v-else>
     <NotCycleFound></NotCycleFound>
    </div>

  </Modal>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import NotCycleFound from '../../components/NotCycleFound.vue';
import Modal from '../../components/Modal.vue';
import Pool from '../../components/Pool.vue';
import * as yup from 'yup';
import { usePond } from '../../stores/pond';
import useApi from '../../composables/api';
import { convertMinutes } from '../../helpers/convertMinutes';
import Sweet from '../../helpers/sweetalert2';
import Notify from '../../helpers/notify';

const { postResource } = useApi();

const schema = yup.object().shape({
  date: yup.date().required(),
  time: yup.string().required(),
  amount: yup.number().required(),
  skipDay: yup.boolean().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    date: new Date(),
    time: new Date().toTimeString().split(' ')[0],
    amount: '',
    skipDay: false,
  },
});

const { value: date } = useField<Date>('date');
const { value: time } = useField<string>('time');
const { value: amount } = useField<number>('amount');
const { value: skipDay } = useField<boolean>('skipDay');

const pond = usePond();

const save = async () => {
  if (pond.pool_id === 0) return Notify.error('Kolam belum dipilih');
  const data = {
    pool_id: pond.pool_id,
    date: date.value?.toISOString().split('T')[0],
    time: convertMinutes(time.value),
    amount: amount.value ? amount.value : 0,
    is_fast: skipDay.value,
  };
  Sweet.confirm('Pastikan data yang dimasukkan sudah benar', async () => {
    const response = await postResource('/feed', data);
    if (response) {
      Notify.success('Pakan berhasil ditambahkan');
    }
    clearData();
  });
};

function clearData() {
  date.value = new Date();
  time.value = new Date().toTimeString().split(' ')[0];
  amount.value = 0;
  skipDay.value = false;
}

</script>