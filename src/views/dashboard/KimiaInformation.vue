<template>
  <div class="tab-pane" id="settings" role="tabpanel">
    <h6>Kimia</h6>
    <div class="row">
      <div class="col-12">
        <Modal modal-id="edit-kimia-modal" modal="modal-md" title="Kimia">
          <div class="row">
            <div class="col-12 mb-3">
              <label for="kolam" class="form-label">Kolam: </label>
              <Pool></Pool>
            </div>
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
              <input type="search" class="form-control" id="amonia" placeholder="amonia" v-model="amonia"
                :class="amonia_meta.dirty && !amonia_meta.valid ? 'is-invalid' : ''">
            </div>
            <div class="col-md-6 mb-3">
              <label for="nitrit" class="form-label">Nitrit: </label>
              <input type="search" class="form-control" id="nitrit" placeholder="nitrit" v-model="nitrit"
                :class="nitrit_meta.dirty && !nitrit_meta.valid ? 'is-invalid' : ''">
            </div>
            <div class="col-md-6 mb-3">
              <label for="nitrat" class="form-label">Nitrat: </label>
              <input type="search" class="form-control" id="nitrat" placeholder="nitrat" v-model="nitrat"
                :class="nitrat_meta.dirty && !nitrat_meta.valid ? 'is-invalid' : ''">
            </div>
            <div class="col-md-6 mb-3">
              <label for="alkalinitas" class="form-label">Alkalinitas: </label>
              <input type="search" class="form-control" id="alkalinitas" placeholder="alkalinitas" v-model="alkalinitas"
                :class="alkalinitas_meta.dirty && !alkalinitas_meta.valid ? 'is-invalid' : ''">
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
        </Modal>
      </div>
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-hover table-borderless table-striped text-center text-dark">
            <thead class="align-middle">
              <tr>
                <th scope="col" rowspan="2" class="text-start">Tanggal Pengecekan</th>
                <th scope="col" rowspan="2">DOC</th>
                <th scope="col" rowspan="2" class="text-start">Waktu</th>
                <th scope="col" colspan="4" class="text-center">Parameter</th>
                <th scope="col" rowspan="2">Aksi</th>
              </tr>
              <tr>
                <th scope="col">Amonia</th>
                <th scope="col">Nitrit</th>
                <th scope="col">Nitrat</th>
                <th scope="col">Alkalinitas</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in result" :key="i">
                <td class="text-start">{{ item.date }}</td>
                <td>{{ item.doc }}</td>
                <td class="text-start">{{ item.time }}</td>
                <td>{{ item.amonia }}</td>
                <td>{{ item.nitrit }}</td>
                <td>{{ item.nitrat }}</td>
                <td>{{ item.alkalinitas }}</td>
                <td>
                  <button class="btn btn-info btn-sm mx-2" data-bs-toggle="modal" data-bs-target="#edit-kimia-modal"
                    @click="edit(item.id)">
                    <i class="bx bx-pencil"></i>
                  </button>
                  <button class="btn btn-danger btn-sm" @click="destroy(item.id)">
                    <i class="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="result.length === 0" class="bg-light">
                <td colspan="8" class="text-center">
                  <img src="/assets/images/not-found.svg" alt="empty" class="img-fluid" width="500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-12 mt-3" v-if="result.length > 0">
        <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage" :go-to="goToPage"
          :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage"
          :total-data="totalData">
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Modal from '../../components/Modal.vue';
import Pool from '../../components/Pool.vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import Pagination from '../../components/Pagination.vue';
import usePagination from '../../composables/pagination2';
import { usePond } from '../../stores/pond';
import useApi from '../../composables/api';
import Sweet from '../../helpers/sweetalert2';
import Notify from '../../helpers/notify';

const { meta } = useForm({
  validationSchema: yup.object({
    date: yup.string().required(),
    time: yup.string().required(),
    amonia: yup.string().required(),
    nitrit: yup.string().required(),
    nitrat: yup.string().required(),
    alkalinitas: yup.string().required(),
  }),
});

const { value: date, meta: date_meta } = useField<Date>('date');
const { value: time, meta: time_meta } = useField<string>('time');
const { value: amonia, meta: amonia_meta } = useField<string>('amonia');
const { value: nitrit, meta: nitrit_meta } = useField<string>('nitrit');
const { value: nitrat, meta: nitrat_meta } = useField<string>('nitrat');
const { value: alkalinitas, meta: alkalinitas_meta } = useField<string>('alkalinitas');

const save = async () => {
  if (pond.pool_id === 0) return Notify.error('Kolam belum dipilih');
  const data = {
    pool_id: pond.pool_id,
    date: (typeof date.value === 'string') ? date.value : date.value.toISOString().split('T')[0],
    time: time.value,
    amonia: amonia.value,
    nitrit: nitrit.value,
    nitrat: nitrat.value,
    alkalinitas: alkalinitas.value,
  };
  const response = await putResource('/kimia/' + id.value, data);
  if (response) {
    Notify.success('Berhasil menambahkan data kimia air');
    fetchData();
  }
};

const { getResource, putResource, deleteResource } = useApi();
const query = ref<string>("");
const path = ref<string>("/kimia/date/" + new Date().toISOString().split('T')[0]);
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

const pond = usePond();

watch(pond, async () => {
  if (pond.pool_id) {
    path.value = "/kimia/date/" + new Date().toISOString().split('T')[0] + `?pool_id=${pond.pool_id}`;
    fetchData();
  }
});

const id = ref<string>("");
const edit = async (v: string) => {
  const response = await getResource('/kimia/' + v);
  id.value = v;
  if (response) {
    date.value = new Date(response.data.date);
    time.value = response.data.time;
    amonia.value = response.data.amonia;
    nitrit.value = response.data.nitrit;
    nitrat.value = response.data.nitrat;
    alkalinitas.value = response.data.alkalinitas;
  }
};


const destroy = (v: string) => {
  Sweet.confirm('Data akan dihapus permanen!', async () => {
    const response = await deleteResource('/kimia/' + v);
    if (response) {
      Notify.success('Data berhasil dihapus!');
      fetchData();
    }
  });
};

</script>