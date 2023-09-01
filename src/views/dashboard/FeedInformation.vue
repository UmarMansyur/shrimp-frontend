<template>
  <div class="tab-pane" id="messages" role="tabpanel">
    <h6>Pakan</h6>
    <Modal modalId="edit-feed-modal" modal="modal-md" title="Pakan">
      <div class="row text-dark">
        <div class="col-12 mb-3">
          <label for="pool" class="form-label">Kolam: </label>
          <Pool></Pool>
        </div>
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

    </Modal>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-hover table-bordered text-center">
            <thead class="align-middle text-dark">
              <tr>
                <th scope="col" rowspan="2">No</th>
                <th scope="col" rowspan="2">DOC</th>
                <th scope="col" rowspan="2" class="text-start">Tanggal Tebar</th>
                <th scope="col" rowspan="2" class="text-start">Waktu</th>
                <th scope="col" rowspan="2" style="width: 10%;">Jumlah(Kg)</th>
                <th scope="col" colspan="2" rowspan="2">Aksi</th>
              </tr>
            </thead>
            <tbody class="align-middle text-dark">
              <tr v-for="(item, i) in result" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item.doc }}</td>
                <td class="text-start">{{ item.date }}</td>
                <td class="text-start">{{ item.time }}</td>
                <td>{{ item.amount }}</td>
                <td>
                  <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#edit-feed-modal"
                    @click="edit(item.id)">
                    <i class="bx bx-pencil"></i> Edit
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="destroy(item.id)">
                    <i class="bx bx-trash"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
    <div class="col-md-12 mt-3">
      <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage" :go-to="goToPage"
        :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage" :total-data="totalData">
      </Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import usePagination from '../../composables/pagination2';
import Pagination from '../../components/Pagination.vue';
import { usePond } from '../../stores/pond';
import Pool from '../../components/Pool.vue';
import Modal from '../../components/Modal.vue';
import useApi from '../../composables/api';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import Notify from '../../helpers/notify';
import { convertMinutes } from '../../helpers/convertMinutes';
import Sweet from '../../helpers/sweetalert2';
const query = ref<string>("");
const path = ref<string>("/feed/date/" + new Date().toISOString().split('T')[0]);
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
} = usePagination(path, "", query);

const { getResource, putResource, deleteResource } = useApi();

const pond = usePond();

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

watch(pond, async () => {
  if (pond.pool_id) {
    path.value = "/feed/date/" + new Date().toISOString().split('T')[0] + "?pool_id=" + pond.pool_id;
    await fetchData();
  }
});


const id = ref<string>('');
const edit = async (v: string) => {
  const response = await getResource('/feed/' + v);
  id.value = v;
  if (response) {
    date.value = new Date(response.data.date);
    time.value = response.data.time;
    amount.value = response.data.amount;
    skipDay.value = Boolean(response.data.is_fast);
  }
};


const save = async () => {
  if (pond.pool_id === 0) return Notify.error('Kolam belum dipilih');
  const data = {
    pool_id: pond.pool_id,
    date: (typeof date.value === 'string') ? date.value : date.value?.toISOString().split('T')[0],
    time: convertMinutes(time.value),
    amount: amount.value ? amount.value : 0,
    is_fast: skipDay.value,
  };
  Sweet.confirm('Pastikan data yang dimasukkan sudah benar', async () => {
    const response = await putResource('/feed/' + id.value, data);
    if (response) {
      Notify.success('Pakan berhasil dirubah');
    }
    fetchData();
  });
}

watch(skipDay, async () => {
  if (skipDay.value) {
    date.value = new Date();
    time.value = new Date().toTimeString().split(' ')[0];
    amount.value = 0;
  }
});

const destroy = async (v: string) => {
  Sweet.confirm('Data akan dihapus permanen!', async () => {
    const response = await deleteResource('/feed/' + v);
    if (response) {
      Notify.success('Pakan berhasil dihapus');
    }
    fetchData();
  });
};

</script>