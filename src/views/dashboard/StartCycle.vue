<template>
  <button class="btn btn-outline-primary btn-sm me-2 mb-3" data-bs-target="#static-modal" data-bs-toggle="modal">
    <i class="ri-bubble-chart-fill align-middle"></i> Mulai Siklus
  </button>
  <Modal modal="modal-md" modal-id="static-modal" title="Mulai Siklus">
    <div class="row">
      <div class="col-12 mb-3">
        <label for="kolam" class="form-label">Kolam: </label>
        <Pool></Pool>
      </div>
      <div class="col-12 mb-3">
        <label for="date" class="form-label">Tanggal Tebar: </label>
        <VueDatePicker v-model="date" light="true" format="yyyy-MM-dd" auto-apply :enable-time-picker="false" />
      </div>
      <div class="col-12 mb-3">
        <label for="amount">Jumlah Bibit:</label>
        <input type="search" name="amount" id="amount" class="form-control" placeholder="Jumlah Bibit"
          v-model="stock_amount">
      </div>
      <div class="col-6">
        <button class="btn btn-light" data-bs-dismiss="modal">
          <i class="bx bx-x"></i> Batal
        </button>
      </div>
      <div class="col-6 text-end">
        <button class="btn btn-success" id="btn-save" data-bs-dismiss="modal" :disabled="!meta.valid" @click="save()">
          <i class="bx bx-send"></i> Simpan
        </button>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '../../components/Modal.vue';
import Pool from '../../components/Pool.vue';
import * as yup from 'yup';
import { usePond } from '../../stores/pond';
import { useField, useForm } from 'vee-validate';
import { watch } from 'vue';
import useApi from '../../composables/api';
import Sweet from '../../helpers/sweetalert2';
const { putResource, getResource } = useApi();
const pool = usePond();

const schema = yup.object().shape({
  date: yup.date().required(),
  stock_amount: yup.number().required(),
  pool_id: yup.number().required().min(1),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    date: '',
    stock_amount: 0,
    pool_id: 0,
  },
});

const { value: date } = useField<Date>('date');
const { value: stock_amount } = useField<number>('stock_amount');
const { value: pool_id } = useField<number>('pool_id');

watch(pool, (value) => {
  pool_id.value = value.pool_id;
  if (value.pool_id > 0) {
    checkAvailableValue();
  }
});

const checkAvailableValue = async () => {
  const response = await getResource('/pool/' + pool_id.value);
  if (response.stock_amount > 0 && response.stock_date) {
    date.value = response.stock_date;
    stock_amount.value = response.stock_amount;
    document.getElementById('btn-save')?.classList.add('d-none');
    return;
  }
  document.getElementById('btn-save')?.classList.remove('d-none');
};

const save = async () => {
  const data = {
    stock_date: date.value?.toISOString().split('T')[0],
    stock_amount: Number(stock_amount.value),
  };
  Sweet.confirm('Pastikan data yang dimasukkan sudah benar!', async () => {
    const response = await putResource('/pool/' + pool_id.value, data);
    if (response) {
      Sweet.success('Berhasil memulai siklus!');
    }
  });
}


</script>