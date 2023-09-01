<template>
  <div class="tab-pane" id="product1" role="tabpanel">
    <h6>Kualitas Air</h6>
    <div class="row">
      <div class="col-md-12">
        <ChartWater />
        <Modal modal-id="edit-water-modal" modal="modal-md" title="Edit Kualitas Air">
          <div class="row">
            <div class="col-12 mb-3">
              <label for="kolam" class="form-label">Kolam: </label>
              <Pool disabled></Pool>
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
              <label for="pH" class="form-label">pH: </label>
              <input type="search" class="form-control" id="pH" placeholder="pH" v-model="ph"
                :class="ph_meta.dirty && !ph_meta.valid ? 'is-invalid' : ''">
            </div>
            <div class="col-md-6 mb-3">
              <label for="salinitas" class="form-label">Salinitas: </label>
              <input type="search" class="form-control" id="salinitas" placeholder="salinitas" v-model="salinitas"
                :class="salinitas_meta.dirty && !salinitas_meta.valid ? 'is-invalid' : ''">
            </div>
            <div class="col-md-6 mb-3">
              <label for="temperature" class="form-label">Suhu: </label>
              <input type="search" class="form-control" id="temperature" placeholder="temperature" v-model="temperature"
                :class="temperature_meta.dirty && !temperature_meta.valid ? 'is-invalid' : ''">
            </div>
            <div class="col-md-6 mb-3">
              <label for="do" class="form-label">DO: </label>
              <input type="search" class="form-control" id="Do" placeholder="do" v-model="Do"
                :class="Do_meta.dirty && !Do_meta.valid ? 'is-invalid' : ''">
            </div>
            <div class="col-md-6 mb-3">
              <label for="water-color" class="form-label">Warna Air: </label>
              <select class="form-select" aria-label="Default select example" v-model="waterColor" id="edit-water-color"
                :class="waterColor_meta.dirty && !waterColor_meta.valid ? 'is-invalid' : ''">
                <option value="" disabled> --- Warna Air --- </option>
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
              <input type="search" class="form-control" id="brightness" placeholder="brightness" v-model="brightness"
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
        </Modal>
      </div>
      <div class="col-md-12 mt-5 text-dark">
        <div class="table-responsive">
          <table class="table table-hover table-bordered text-center" aria-describedby="water-quality">
            <thead class="align-middle">
              <tr>
                <th scope="col" rowspan="2">No</th>
                <th scope="col" rowspan="2">pH</th>
                <th scope="col" rowspan="2">Salinitas</th>
                <th scope="col" rowspan="2">Suhu</th>
                <th scope="col" rowspan="2">DO</th>
                <th scope="col" rowspan="2">Warna Air</th>
                <th scope="col" rowspan="2">Kecerahan</th>
                <th scope="col" colspan="2">Aksi</th>
              </tr>
              <tr>
                <th scope="col">Edit</th>
                <th scope="col">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in result" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item.ph }}</td>
                <td>{{ item.salinity }}</td>
                <td>{{ item.temperature }}</td>
                <td>{{ item.DO }}</td>
                <td>{{ item.brightness }}</td>
                <td>{{ item.water_color }}</td>
                <td>
                  <button class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#edit-water-modal"
                    @click="edit(item.id)">
                    <i class="bx bx-pencil"></i>
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="destroy(item.id)">
                    <i class="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="result.length === 0" class="bg-light">
                <td colspan="9" class="text-center">
                  <img src="/assets/images/notfound.svg" alt="empty" class="img-fluid" width="500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-md-12 mt-3">
        <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage" :go-to="goToPage"
          :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage"
          :total-data="totalData">
        </Pagination>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
declare const Choices: any;

import { onMounted, ref, watch } from "vue";
import Pagination from "../../components/Pagination.vue";
import usePagination from "../../composables/pagination2";
import ChartWater from "./ChartWater.vue";
import Modal from "../../components/Modal.vue";
import Pool from "../../components/Pool.vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { convertMinutes } from "../../helpers/convertMinutes";
import Notify from "../../helpers/notify";
import useApi from "../../composables/api";
import { usePond } from "../../stores/pond";
import Sweet from "../../helpers/sweetalert2";
const query = ref<string>("");
const path = ref<string>("/water/date/" + new Date().toISOString().split('T')[0]);
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

const select = ref<any>(null);
onMounted(() => {
  select.value = new Choices('#edit-water-color', {
    searchEnabled: true,
    itemSelectText: '',
    allowHTML: true,
  });
});


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

const pond = usePond();
watch(pond, () => {
  if (pond.pool_id === 0) return;
  path.value = path.value + '?pool_id=' + pond.pool_id;
  fetchData();
});
const { putResource, getResource, deleteResource } = useApi();
const save = async () => {
  if (pond.pool_id === 0) return Notify.error('Kolam belum dipilih');
  const data = {
    pool_id: pond.pool_id,
    date: (typeof date.value === 'string') ? date.value : date.value.toISOString().split('T')[0],
    time: convertMinutes(time.value),
    pH: ph.value,
    salinity: salinitas.value,
    temperature: temperature.value,
    DO: Do.value,
    water_color: waterColor.value,
    brightness: brightness.value,
    water_height: 0,
  };
  const response = await putResource('/water/' + id.value, data);
  if (response) {
    Notify.success('Berhasil menyimpan data');
  }
};

const id = ref<string>('');
const edit = async (v: number) => {
  const response = await getResource('/water/' + v);
  id.value = response.data.id;
  if (response) {
    date.value = response.data.date;
    time.value = response.data.time;
    ph.value = response.data.ph;
    salinitas.value = response.data.salinity;
    temperature.value = response.data.temperature;
    Do.value = response.data.DO;
    waterColor.value = response.data.water_color;
    select.value.setChoiceByValue(response.data.water_color);
    brightness.value = response.data.brightness;
  }
};

const destroy = (i: string) => {
  Sweet.confirm('Apakah anda yakin ingin menghapus data ini?', async () => {
    const response = await deleteResource('/water/' + i);
    if (response) {
      Notify.success('Berhasil menghapus data');
      fetchData();
    }
  });
}
</script>
