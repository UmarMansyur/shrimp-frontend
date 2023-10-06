<template>
  <Parent>
    <div class="row">
      <div class="col-12">
        <div class="alert alert-primary">
          <p class="mb-0 text-center">
            Untuk mengetahui laporan, silahkan isi beberapa paramter wajib yang dibutuhkan oleh sistem. Parameter tersebut
            terdapat pada tombol filter dibagian pojok kanan atas tabel.
          </p>
        </div>
      </div>
    </div>
    <div class="row mb-3 text-dark">
      <div class="col-md-2 mb-3 col-sm-3">
        <select name="pond" id="pond" class="form-select" v-model="pond"></select>
      </div>
      <div class="col-md-2 mb-3 col-sm-3">
        <select name="pool" id="pool" class="form-select" v-model="pool">
          <option value="all">Semua</option>
        </select>
      </div>
      <div class="col-md-2 mb-3 col-sm-2"></div>
      <div class="col-md-6 mb-3 col-sm-4 text-end">
        <button class="btn waves btn-success" @click="exportExcel"><i class="bx bx-download"></i></button>
        <button class="btn waves btn-warning mx-1" @click="print">
          <i class="bx bx-printer"></i>
        </button>
        <button class="btn waves btn-outline-primary" data-bs-toggle="modal" data-bs-target="#filter"><i
            class="bx bx-filter"></i> Filter</button>
        <Modal modal-id="filter" title="Filter" class="modal-md">
          <div class="row text-start">
            <div class="col-12 mb-3">
              <label class="form-label" for="from">Dari Tanggal</label>
              <VueDatePicker light="true" auto-apply :enable-time-picker="false" v-model="from"></VueDatePicker>
            </div>
            <div class="col-md-12 mb-3">
              <label class="form-label" for="to">Sampai Tanggal</label>
              <VueDatePicker light="true" auto-apply :enable-time-picker="false" v-model="to"></VueDatePicker>
            </div>
            <div class="col-6 mb-3">
              <button class="btn btn-primary" @click="filter" :disabled="!meta.valid"
                data-bs-dismiss="modal">Filter</button>
            </div>
            <div class="col-6 mb-3 text-end">
              <button class="btn btn-outline-primary" @click="reset">Reset</button>
            </div>
          </div>
        </Modal>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive table-card">
              <table class="table align-middle table-bordeless table-centered table-nowrap mb-0 text-center">
                <thead class="text-dark table-primary">
                  <tr class="text-center align-middle">
                    <th rowspan="2">Tanggal</th>
                    <th rowspan="2">DOC</th>
                    <th rowspan="2">Nama Kolam</th>
                    <th colspan="5">Kualitas Air</th>
                    <th colspan="3">Anco</th>
                    <th rowspan="2">Pakan(Kg)</th>
                    <th colspan="4">Kimia</th>
                  </tr>
                  <tr>
                    <th>pH</th>
                    <th>Salinitas</th>
                    <th>Suhu</th>
                    <th>DO</th>
                    <th>Warna Air</th>
                    <th>Waktu Mulai</th>
                    <th>Jenis Anco</th>
                    <th>Status</th>
                    <th>Amonia</th>
                    <th>Nitrit</th>
                    <th>Nitrat</th>
                    <th>Alkalinitas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in result" :key="index">
                    <td>
                      {{ item.created_at ? item.created_at.split('T')[0] : '' }}
                    </td>
                    <td>
                      {{ Math.ceil((new Date(item.feed_date).getTime() - new Date(item.stock_date).getTime()) / (1000 *
                        3600 * 24)) }}
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>{{ item.ph }}</td>
                    <td>{{ item.salinity }}</td>
                    <td>{{ item.temperature }}</td>
                    <td>{{ item.DO }}</td>
                    <td>{{ item.water_color }}</td>
                    <td>{{ item.time_check_anco }}</td>
                    <td>Anco {{ item.anco }}</td>
                    <td v-if="item.anco_amount === 3">Habis</td>
                    <td v-else-if="item.anco_amount === 2">Sisa Sedikit</td>
                    <td v-else-if="item.anco_amount === 1">Sisa Banyak</td>
                    <td>{{ item.pakan }}</td>
                    <td>{{ item.amonia }}</td>
                    <td>{{ item.nitrit }}</td>
                    <td>{{ item.nitrat }}</td>
                    <td>{{ item.alkalinitas }}</td>
                  </tr>
                  <tr v-if="result.length === 0" class="bg-light">
                    <td colspan="16" class="text-center">
                      <img src="/assets/images/not-found.svg" alt="empty" class="img-fluid" width="500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-12 float-end" v-if="result.length !== 0">
            <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage"
              :go-to="goToPage" :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage"
              :total-data="totalData">
            </Pagination>
          </div>
        </div>
      </div>
    </div>

  </Parent>
</template>

<script setup lang="ts">
declare const Choices: any;
import { onMounted, ref, watch } from 'vue';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import Pagination from '../../components/Pagination.vue';
import usePagination from '../../composables/pagination2';
import Parent from '../Parent.vue';
import useApi from '../../composables/api';
import Modal from '../../components/Modal.vue';
const path = ref<string>('/report/' + '2023-08-01' + '/' + new Date().toISOString().split('T')[0]);
const query = ref<string>('');
const q = ref<string>('?pool_id=all');
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
} = usePagination(path, q, query);


const { getResource } = useApi();

const schema = yup.object({
  from: yup.date().required(),
  to: yup.date().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  },
});


const { value: from } = useField<Date>('from');
const { value: to } = useField<Date>('to');
const pool = ref<string>('');

const filter = async () => {
  const start_date = (typeof from.value === 'string') ? from.value : from.value.toISOString().split('T')[0];
  const end_date = (typeof to.value === 'string') ? to.value : to.value.toISOString().split('T')[0];
  path.value = '/report/' + start_date + '/' + end_date;
  let pool_id = pool.value ? pool.value : 'all';
  q.value = '?pool_id=' + pool_id;
  await fetchData();
};


onMounted(async () => {
  await loadPonds();
  await loadPool();
});


const pond = ref<string>('');
const loadPonds = async () => {
  const response = await getResource('/pond/list/me');
  if (response) {
    new Choices('#pond', {
      allowHTML: true,
      choices: response.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name
        };
      })
    });
  }
};
const select = ref<any>(null);
const loadPool = async () => {
  const response = await getResource('/pool/list/me/' + pond.value);
  if (response) {
    select.value = new Choices('#pool', {
      allowHTML: true,
      choices: response.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name
        };
      })
    });
    if(response.data.length > 0) {
      select.value.setChoiceByValue(response.data[0].id);
      pool.value = response.data[0].id;
    }
  }
};


watch(pond, async () => {
  if (select.value) {
    select.value.destroy();
  }
  await loadPool();
});

const reset = async () => {
  from.value = new Date();
  to.value = new Date();
};

const print = () => {
  window.open(import.meta.env.VITE_API_SHRIMP + '/print/report/' + path.value.split('/')[2] + '/' + path.value.split('/')[3] + q.value, '_blank');

}
const exportExcel = () => {
  window.open(import.meta.env.VITE_API_SHRIMP + '/export/report/' + path.value.split('/')[2] + '/' + path.value.split('/')[3] + q.value, '_blank');

}
</script>