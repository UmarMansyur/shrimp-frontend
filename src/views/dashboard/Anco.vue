<template>
  <button class="btn btn-outline-warning btn-sm me-2 mb-3" data-bs-target="#anco-modal" data-bs-toggle="modal" @click="()=> {getFeed(new Date().toISOString().split('T')[0]); initializeChoices()}">
    <i class="ri-git-merge-line align-middle"></i> Anco
  </button>
  <Modal modal="modal-lg modal-dialog-scrollable" modal-id="anco-modal" title="Cek Anco">
    <div class="row">
      <div class="col-12">
        <div class="alert alert-warning alert-top-border">
          Jika pakan yang diberikan tidak terdeteksi. Silahkan klik tanggal pemberian pakan dan pilih tanggal. Jika tetap tidak terdeteksi, silahkan refresh halaman.
        </div>
      </div>
      <div class="col-12 mb-3">
        <label for="kolam" class="form-label">Kolam: </label>
        <Pool></Pool>
      </div>
      <div class="col-md-6 mb-3">
        <label for="feed" class="form-label">Tanggal Pemberian Pakan</label>
        <VueDatePicker light="true" auto-apply format="yyyy-MM-dd" v-model="feed_stock" :enable-time-picker="false" :class="{
          'is-invalid': !feed_stock_err.valid && feed_stock_err.dirty }" />
      </div>
      <div class="col-md-6 mb-3">
        <label for="time-feed" class="form-label">Waktu: </label>
        <select name="time-feed" id="time-feed" class="form-select" v-model="time" :class="{ 'is-invalid': !time_err.valid && time_err.dirty }">
          <option value="">Pilih Waktu</option>
        </select>
      </div>
      <div class="col-md-12 mb-3">
        <label for="date" class="form-label">Waktu Cek Anco: </label>
        <VueDatePicker light="true" auto-apply time-picker v-model="timecheck" :class="{
          'is-invalid': !timecheck_err.valid && timecheck_err.dirty }" />
      </div>
      <div class="col-md-12 mb-3" v-for="i in amountAnco" :key="i">
        <label for="anco" class="form-label">Anco {{ i }}: </label>
        <div class="row justify-content-between">
          <div class="col-md-4">
            <div class="form-check form-switch form-switch-md mb-3 ">
              <input class="form-check-input" type="checkbox" role="switch" id="finished" v-model="finished[i]"
                @click="finishedClick(i)" :class="{ 'is-invalid': !finished_err.valid && finished_err.dirty }">
              <label class="form-check-label" for="finished">Habis</label>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-check form-switch form-switch-md mb-3 ">
              <input class="form-check-input" type="checkbox" role="switch" id="little-left" v-model="littleLeft[i]"
                @click="littleLeftClick(i)" :class="{ 'is-invalid': !littleLeft_err.valid && littleLeft_err.dirty }">
              <label class="form-check-label" for="little-left">Sisa Sedikit</label>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-check form-switch form-switch-md mb-3 ">
              <input class="form-check-input" type="checkbox" role="switch" id="left a lot" v-model="leftALot[i]"
                @click="leftAllotClick(i)" :class="{ 'is-invalid': !leftALot_err.valid && leftALot_err.dirty }">
              <label class="form-check-label" for="left a lot">Sisa Banyak</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 mb-3">
        <label for="desc" class="form-label">Deskripsi: </label>
        <textarea name="desc" id="desc" cols="30" rows="10" class="form-control" v-model="desc"
          :class="{ 'is-invalid': !desc_err.valid && desc_err.dirty }"
        ></textarea>
      </div>
      <div class="col-md-6 mb-3">
        <button class="btn btn-light">
          <i class="bx bx-x"></i> Batal
        </button>
      </div>
      <div class="col-md-6 mb-3 text-end">
        <button class="btn btn-success" @click="save" data-bs-dismiss="modal" :disabled="!meta.valid">
          <i class="bx bx-send"></i> Simpan
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
declare const Choices: any;
import { useField, useForm } from 'vee-validate';
import Modal from '../../components/Modal.vue';
import Pool from '../../components/Pool.vue';
import * as yup from 'yup';
import useApi from '../../composables/api';
import { onMounted, ref, watch } from 'vue';
import { usePond } from '../../stores/pond';
import Notify from '../../helpers/notify';
import { convertMinutes } from '../../helpers/convertMinutes';

const { getResource, postResource } = useApi();
const pond = usePond();
const schema = yup.object().shape({
  feed_stock: yup.date().required(),
  time: yup.string().required(),
  desc: yup.string(),
  timecheck: yup.string().required(),
  finished: yup.array(yup.boolean()).required(),
  littleLeft: yup.array(yup.boolean()).required(),
  leftALot: yup.array(yup.boolean()).required()
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    timecheck: new Date().toTimeString().split(' ')[0],
    feed_stock: new Date(),
    time: '',
    desc: '',
    finished: [],
    littleLeft: [],
    leftALot: []
  }
});

const { value: feed_stock, meta: feed_stock_err } = useField<Date>('feed_stock');
const { value: time, meta: time_err } = useField<string>('time');
const { value: desc, meta: desc_err } = useField<string>('desc');
const { value: finished, meta: finished_err } = useField<boolean[]>('finished');
const { value: littleLeft, meta: littleLeft_err } = useField<boolean[]>('littleLeft');
const { value: leftALot, meta: leftALot_err } = useField<boolean[]>('leftALot');
const { value: timecheck, meta: timecheck_err } = useField<string>('timecheck');

watch(feed_stock, async () => {
  await getFeed(feed_stock.value.toISOString().split('T')[0]);
  initializeChoices();
});

const times = ref<any[]>([]);
const getFeed = async (date: any) => {
  const response = await getResource('/feed/date/' + date + '?pool_id=' + pond.pool_id + '&limit=100');
  times.value = response.data.map((item: any) => {
    return {
      value: item.time,
      label: item.time + ` (${item.amount} kg)`
    };
  });
};



const select = ref<any>(null);

onMounted(async () => {
  await getFeed(feed_stock.value.toISOString().split('T')[0]);
  initializeChoices();
});

function initializeChoices() {
  if (select.value !== null) {
    select.value.destroy();
  }
  select.value = new Choices('#time-feed', {
    searchEnabled: false,
    itemSelectText: '',
    allowHTML: true,
    shouldSort: false,
    choices: times.value,
  });
}

const amountAnco = ref<number>(0);

watch(time, async (value) => {
  if (value) {
    if (pond.pool_id === 0) return Notify.error('Kolam belum dipilih');
    const response = await getResource('/pool/' + pond.pool_id);
    amountAnco.value = response.data.stock_amount;
  }
});

function finishedClick(i: number) {
  littleLeft.value[i] = false;
  leftALot.value[i] = false;
}

function littleLeftClick(i: number) {
  finished.value[i] = false;
  leftALot.value[i] = false;
}

function leftAllotClick(i: number) {
  finished.value[i] = false;
  littleLeft.value[i] = false;
}

async function save() {
  let ancos = 0;
  for (let i = 1; i <= amountAnco.value; i++) {
    if (finished.value[i]) {
      ancos = 3;
    }
    if (littleLeft.value[i]) {
      ancos = 2;
    }
    if (leftALot.value[i]) {
      ancos = 1;
    }
    await postResource('/anco', {
      pool_id: pond.pool_id,
      date: feed_stock.value?.toISOString().split('T')[0],
      time: time.value,
      description: desc.value,
      anco: i,
      amount: ancos,
      time_check_anco: convertMinutes(timecheck.value),
    });
  }
  clearData();
  Notify.success('Anco berhasil ditambahkan');
}

function clearData() {
  feed_stock.value = new Date();
  time.value = '';
  desc.value = '';
  finished.value = [];
  littleLeft.value = [];
  leftALot.value = [];
  timecheck.value = new Date().toTimeString().split(' ')[0];
}

</script>