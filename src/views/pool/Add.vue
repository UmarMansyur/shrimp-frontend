<template>
  <template v-if="!loader">
    <Parent>
      <div class="row mb-3">
        <div class="col-12">
          <button class="btn btn-primary" @click="$router.go(-1)"><i class="bx bx-arrow-back"></i></button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="card-header align-items-center d-flex">
              <h4 class="card-title mb-0 flex-grow-1">Tambah Kolam</h4>
              <div class="flex-shrink-0">
                <div class="form-check form-switch form-switch-right form-switch-md">
                  <input class="form-check-input code-switcher" type="checkbox" id="shape" @click="isSircle()">
                  <label for="shape" class="form-label text-muted">Lingkaran</label>
                </div>
              </div>
            </div>
            <div class="card-body p-4">
              <form action="">
                <Select label="Tambak" id="pond" :options="ponds" @selected="getSelection" :class="pond_id_err ? 'is-invalid' : ''"></Select>
                <div class="row">
                  <div class="col-12 mb-3">
                    <label for="pool_name" class="form-label">Nama Kolam: </label>
                    <input type="text" name="pool_name" id="pool_name" class="form-control" placeholder="Nama Kolam"
                      :class="{ 'is-invalid': pool_name_err.dirty && !pool_name_err.valid }" v-model="pool_name">
  
                  </div>
                  <div class="col-12 mb-3">
                    <label for="pool_address" class="form-label">Lokasi: </label>
                    <Map id="pool" @location="getLocation"></Map>
                    <small class="mt-3">Harap aktifkan GPS terlebih dahulu, secara default. Mark yang ada dipeta mengikuti
                      posisi GPS anda.</small>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="address" class="form-label">Deskripsi Alamat: </label>
                    <textarea name="address" id="address" class="form-control" placeholder="Deskripsi Alamat"
                      :class="{ 'is-invalid': pool_address_err.dirty && !pool_address_err.valid }"
                      v-model="pool_address" rows="5"></textarea>
                  </div>
                  <div v-if="!circle" class="col-12">
                    <SquareWide @value="getValue" ></SquareWide>
                  </div>
                  <div class="col-12" v-else>
                    <CircleWide @value="getCircleValue" ></CircleWide>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="anco" class="form-label">Jumlah Anco: </label>
                    <input text="number" name="anco" id="anco" class="form-control" placeholder="4" v-model="anco"
                      :class="{ 'is-invalid': anco_err.dirty && !anco_err.valid }">
                  </div>
                  <div class="col-md-12 mt-3 text-center">
                    <button id="save-button" class="btn btn-success" type="button" @click="save()" :disabled="!meta.valid"><i class="bx bx-send"></i> Simpan
                      Kolam</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Parent>
  </template>
  <template v-else>
    <Parent>
      <PondSkeleton></PondSkeleton>
    </Parent>
  </template>
</template>


<script setup lang="ts">
import Parent from '../Parent.vue';
import Map from '../../components/Map.vue';
import { onMounted, ref } from 'vue';
import SquareWide from './SquareWide.vue';
import CircleWide from './CircleWide.vue';
import Select from '../../components/Select.vue';
import useApi from '../../composables/api';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import Sweet from '../../helpers/sweetalert2';
import router from '../../router';
import useSkeleton from '../../helpers/skeleton';
import PondSkeleton from '../../components/PondSkeleton.vue';
import Notify from '../../helpers/notify';
const { hideLoader, loader, showLoader } = useSkeleton();
const { getResource, postResource } = useApi();

const circle = ref<any>(false);
const isSircle = () => {
  circle.value = !circle.value;
};
const schema = yup.object().shape({
  pond_id: yup.string().required().min(1).max(255),
  pool_name: yup.string().required().min(2).max(255),
  pool_address: yup.string().required().min(10).max(255),
  pool_wide: yup.string().required().min(1).max(255),
  pool_height: yup.string().required().min(1).max(255),
  pool_width: yup.string().required().min(1).max(255),
  anco: yup.string().required().min(1).max(255),
  latitude: yup.number().required().min(-90).max(90),
  longitude: yup.number().required().min(-180).max(180),
  is_circle: yup.boolean().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    pond_id: '',
    pool_name: '',
    pool_address: '',
    pool_wide: '',
    pool_height: '',
    pool_width: '',
    anco: '',
    latitude: '',
    longitude: '',
    is_circle: circle.value,
  },
});

const { value: pond_id, meta: pond_id_err } = useField<string>('pond_id');
const { value: pool_name, meta: pool_name_err } = useField<string>('pool_name');
const { value: pool_address, meta: pool_address_err } = useField<string>('pool_address');
const { value: pool_wide } = useField<Number>('pool_wide');
const { value: pool_height } = useField<Number>('pool_height');
const { value: pool_width } = useField<Number>('pool_width');
const { value: anco, meta: anco_err } = useField<Number>('anco');
const { value: latitude } = useField<Number>('latitude');
const { value: longitude } = useField<Number>('longitude');
const { value: is_circle } = useField<boolean>('is_circle');

const getSelection = (value: any) => {
  pond_id.value = value;
};

const getLocation = (value: any) => {
  latitude.value = value.lat;
  longitude.value = value.lng;
};

const getValue = (value: any) => {
  is_circle.value = circle.value;
  pool_wide.value = value.pool_wide;
  pool_height.value = value.pool_length;
  pool_width.value = value.pool_width;
};

const getCircleValue = (value: any) => {
  is_circle.value = circle.value;
  pool_wide.value = value.pool_wide;
  pool_height.value = value.pool_length;
  pool_width.value = (value.pool_depth).toFixed(2);
};

const ponds = ref<any>([]);
const loadPonds = async () => {
  const response = await getResource('/pond/list/me');
  ponds.value = response.data.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  if (ponds.value.length < 1) {
    Sweet.error('Anda belum memiliki tambak, silahkan tambahkan tambak terlebih dahulu', () => {
      router.replace('/pond/create');
    });

  }
};

onMounted(async () => {
  await showLoader();
  await loadPonds();
  await hideLoader();
});

async function save() {
  const data = {
    pond_id: pond_id.value,
    name: pool_name.value,
    address: pool_address.value,
    wide: pool_wide.value,
    height: pool_height.value,
    width: pool_width.value,
    anco_amount: Number(anco.value),
    lat: latitude.value,
    long: longitude.value,
    is_circle: is_circle.value,
  };

  if(latitude.value === 0 || longitude.value === 0) {
    Notify.error('Harap aktifkan GPS terlebih dahulu');
    return;
  }

  showLoader();
  const response = await postResource('/pool', data);
  if (response) {
    Notify.success('Berhasil menambahkan kolam');
    clear();
  }
  hideLoader();
}

function clear() {
  pond_id.value = '';
  pool_name.value = '';
  pool_address.value = '';
  pool_wide.value = 0
  pool_height.value = 0;
  pool_width.value = 0;
  anco.value = 0;
  latitude.value = 0;
  longitude.value = 0;
  is_circle.value = false;
}

</script>