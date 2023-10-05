<template>
  <div class="tab-pane active show" id="home" role="tabpanel">
    <h6 class="mb-0">Data Anco berikut adalah data hanco hari ini!</h6>
    <div class="row mt-4">
      <div class="col-md-12" v-if="result.length === 0">
        <div class="alert alert-info alert-top-border">
          <p class="mb-0 text-center">Belum ada data anco hari ini!</p>
        </div>
      </div>
      <div class="col-md-3" v-for="item in result" :key="item.id">
        <div class="card overflow-hidden shadow-none border">
          <div class="card-body">
            <div class="float-end">
              <button id="btnGroupVerticalDrop1" type="button" class="btn btn-waves btn-sm" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i class="ri-more-fill"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop1">
                <a class="dropdown-item" href="#edit-anco-modal" data-bs-toggle="modal" @click="edit(item.id)">Edit</a>
                <a class="dropdown-item" href="#" @click.prevent="destroy(item.id)">Hapus</a>
              </div>
            </div>
            <h2 class="text-info">A<span class="fs-17">{{ item.anco }}</span></h2>
            <div class="row text-dark">
              <div class="col-7 fw-bold">Tanggal Pemberian Pakan </div>
              <div class="col-5">: {{ item.date }}</div>
              <div class="col-7 fw-bold">Waktu Pemberian Pakan </div>
              <div class="col-5">: {{ item.time }} WIB</div>
              <div class="col-7 fw-bold">Waktu Pengecekan</div>
              <div class="col-5">: {{ item.time_check_anco }} WIB</div>
              <div class="col-7 fw-bold">Sisa</div>
              <div class="col-5" v-if="item.amount == 3">: Habis</div>
              <div class="col-5" v-else-if="item.amount == 2">: Sisa Sedikit</div>
              <div class="col-5" v-else>: Sisa Banyak</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-4" v-if="result.length > 0">
        <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage" :go-to="goToPage"
          :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage"
          :total-data="totalData">
        </Pagination>
      </div>
    </div>
    <Modal modal="modal-lg momdal-dialog-scrollable" modal-id="edit-anco-modal" title="Edit Cek Anco">
      <div class="row mb-3">
        <div class="col-12">
          <label for="edit-kolam" class="form-label text-dark">Kolam: </label>
          <Pool disabled></Pool>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="edit-feed" class="form-label text-dark">Tanggal Pemberian Pakan</label>
          <VueDatePicker light="true" auto-apply format="yyyy-MM-dd" :enable-time-picker="false" v-model="date"/>
        </div>
        <div class="col-md-6 mb-3">
          <label for="edit-time-feed" class="form-label text-dark">Waktu: </label>
          <select name="edit-time-feed" id="edit-time-feed" class="form-select" v-model="time">
            <option value="">Pilih Waktu</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mb-3">
          <label for="edit-date" class="form-label text-dark">Waktu Cek Anco: </label>
          <VueDatePicker light="true" auto-apply time-picker v-model="time_check_anco"/>
        </div>
      </div>
      <div class="row text-dark">
        <div class="col-md-12 mb-3">
          <label for="edit-anco" class="form-label text-dark">Status Anco: </label>
          <div class="row justify-content-between mb-3">
            <div class="col-md-4">
              <div class="form-check form-switch form-switch-md mb-3">
                <input class="form-check-input" type="checkbox" role="switch" id="edit-finished" v-model="finished" @click="finishedClick">
                <label class="form-check-label" for="edit-finished">Habis</label>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-check form-switch form-switch-md mb-3">
                <input class="form-check-input" type="checkbox" role="switch" id="edit-little-left" v-model="littleLeft" @click="littleLeftClick">
                <label class="form-check-label" for="edit-little-left">Sisa Sedikit</label>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-check form-switch form-switch-md mb-3">
                <input class="form-check-input" type="checkbox" role="switch" id="edit-leftalot" v-model="leftALot" @click="leftAllotClick">
                <label class="form-check-label" for="edit-leftalot">Sisa Banyak</label>
              </div>
            </div>
            <div class="col-12 mb-3">
              <label for="edit-desc" class="form-label text-dark">Deskripsi: </label>
              <textarea name="edit-desc" id="edit-desc" cols="30" rows="10" class="form-control" v-model="desc"
              ></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <button class="btn btn-light" data-bs-dismiss="modal">
                <i class="bx bx-x"></i> Batal
              </button>
            </div>
            <div class="col-md-6 text-end">
              <button class="btn btn-success" id="btn-save" :disabled="!meta.valid" @click="save()" data-bs-dismiss="modal">
                <i class="bx bx-send"></i> Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
declare const Choices: any;
import { watch, ref } from 'vue';
import Pool from '../../components/Pool.vue';
import { usePond } from '../../stores/pond';
import usePagination from '../../composables/pagination2';
import Pagination from '../../components/Pagination2.vue';
import Modal from '../../components/Modal.vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import useApi from '../../composables/api';
import Sweet from '../../helpers/sweetalert2';
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Jakarta');
const pond = usePond();
const path = ref<string>("/ancol/date/" + moment(new Date()).format('YYYY-MM-DD') + `?pool_id=${pond.pool_id}`)
const {
  result,
  currentPage,
  totalPage,
  pageList,
  totalData,
  isFirstPage,
  isLastPage,
  nextPage,
  prevPage,
  goToPage,
  fetchData,
} = usePagination(path, "", '');


const schema = yup.object().shape({
  date: yup.date().required(),
  time: yup.string().required(),
  time_check_anco: yup.string().required(),
  desc: yup.string().required(),
  finished: yup.boolean(),
  littleLeft: yup.boolean(),
  leftALot: yup.boolean(),

});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    date: new Date(),
    time: '',
    time_check_anco: new Date().toTimeString().split(' ')[0],
    amount: 0,
    desc: '',
    finished: false,
    littleLeft: false,
    leftALot: false,
  },
});

const { value: date } = useField<Date>('date');
const { value: time } = useField<string>('time');
const { value: time_check_anco } = useField<string>('time_check_anco');
const { value: desc } = useField<string>('desc');
const { value: finished } = useField<boolean>('finished');
const { value: littleLeft } = useField<boolean>('littleLeft');
const { value: leftALot } = useField<boolean>('leftALot');

const loadData = async () => {
  if (pond.pool_id === 0) return;
  await fetchData();
};


watch(pond, async () => {
  path.value = "/anco/date/" + new Date().toISOString().split('T')[0] + `?pool_id=${pond.pool_id}`;
  await loadData();
});

const save = async () => {
  let ancos = 0;
  if(finished.value){
    ancos = 3;
  }else if(littleLeft.value){
    ancos = 2;
  }else{
    ancos = 1;
  }
  const data = {
    date: (typeof date.value === 'string') ? date.value : date.value?.toISOString().split('T')[0],
    time: time.value,
    time_check_anco: time_check_anco.value,
    description: desc.value,
    amount: ancos,
  };
  const response = await putResource('/anco/' + id.value, data);
  if (response) {
    Sweet.success('Berhasil mengubah data anco!');
    await loadData();
  }
};
const { getResource, putResource, deleteResource } = useApi();
const id = ref<string>('');
const edit = async (v: string) => {
  const response = await getResource('/anco/' + v);
  id.value = v;
  date.value = response.data.date;
  time.value = response.data.time;
  time_check_anco.value = response.data.time_check_anco;
  desc.value = response.data.description;
  getFeed(date.value);
  if(response.data.amount == 3){
    finished.value = true;
  }else if(response.data.amount == 2){
    littleLeft.value = true;
  }else{
    leftALot.value = true;
  }
};

const times = ref<any[]>([]);
const getFeed = async (date: any) => {
  const response = await getResource('/feed/date/' + date);
  times.value = response.data.map((item: any) => {
    return {
      value: item.time,
      label: item.time + ` (${item.amount} kg)`
    };
  });
};

watch(date, async () => {
  await getFeed(date.value);
  initializeChoices();
});

const select = ref<any>(null);
function initializeChoices() {
  if (select.value !== null) {
    select.value.destroy();
  }
  select.value = new Choices('#edit-time-feed', {
    searchEnabled: true,
    itemSelectText: '',
    allowHTML: true,
    shouldSort: false,
    choices: times.value,
  });
}

const finishedClick = () => {
  littleLeft.value = false;
  leftALot.value = false;
};

const littleLeftClick = () => {
  finished.value = false;
  leftALot.value = false;
};

const leftAllotClick = () => {
  finished.value = false;
  littleLeft.value = false;
};

const destroy = async (v: string) => {
  Sweet.confirm('Data akan dihapus secara permanen!', async () => {
    const response = await deleteResource('/anco/' + v);
    if (response) {
      Sweet.success('Berhasil menghapus data anco!');
      await loadData();
    }
  });
};



</script>