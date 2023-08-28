<template>
  <Parent>
    <template v-if="!loader">
      <div class="row justify-content-center">
        <div class="col-xl-9">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title mb-0">Form Tambah Tambak</h4>
            </div>
            <div class="card-body">
              <form action="#" class="form-steps" autocomplete="off">
                <div class="step-arrow-nav mb-4">
                  <ul class="nav nav-pills custom-nav nav-justified" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link active" id="steparrow-gen-info-tab" type="button" role="tab"
                        aria-controls="steparrow-gen-info" aria-selected="true" data-position="0">Langkah 1</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="steparrow-description-info-tab" type="button" role="tab"
                        aria-controls="steparrow-description-info" aria-selected="false" data-position="1"
                        tabindex="-1">Langkah 2</button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link" id="pills-experience-tab" type="button" role="tab"
                        aria-controls="pills-experience" aria-selected="false" data-position="2"
                        tabindex="-1">Konfirmasi</button>
                    </li>
                  </ul>
                </div>

                <div class="tab-content">
                  <div class="tab-pane fade active show" data-position="0" id="steparrow-gen-info" role="tabpanel"
                    aria-labelledby="steparrow-gen-info-tab">
                    <div>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label class="form-label" for="pond_name">Nama Tambak</label>
                            <input type="text" class="form-control" id="pond_name" placeholder="Nama Tambak"
                              v-model="pond_name">
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label class="form-label" for="provinsi">Provinsi: </label>
                            <select name="provinsi" id="provinsi" class="form-select" v-model="province">
                              <option value="">Provinsi</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label class="form-label" for="kabupaten">Kabupaten: </label>

                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label class="form-label" for="kecamatan">Kecamatan: </label>

                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="mb-3">
                            <label class="form-label" for="kelurahan">Kelurahan: </label>
                            <select name="kelurahan" id="kelurahan" class="form-select" v-model="kelurahan">
                              <option value="">Kelurahan</option>

                            </select>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div class="d-flex align-items-start gap-3 mt-4">
                      <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                        data-nexttab="steparrow-description-info-tab" @click="next()" :disabled="!meta.valid"><i
                          class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Selanjutnya</button>
                    </div>
                  </div>

                  <div class="tab-pane fade" data-position="1" id="steparrow-description-info" role="tabpanel"
                    aria-labelledby="steparrow-description-info-tab">
                    <div>
                      <div class="row">
                        <div class="col-lg-12 mb-3">
                          <label for="form-label" form="latitude">Alamat: </label>
                          <Map @location="getLocation"></Map>
                        </div>
                        <div class="col-lg-12 mb-3">
                          <label class="form-label" for="address">Alamat Lengkap: </label>
                          <textarea v-model="address" class="form-control" cols="10" rows="5" id="address"></textarea>
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label" for="wide">Luas: </label>
                          <input type="number" class="form-control" id="wide" placeholder="Luas" v-model="wide">
                        </div>
                        <div class="col-md-6 mb-3">
                          <label class="form-label" for="pond_amount">Jumlah Kolam: </label>
                          <input type="number" class="form-control" id="pond_amount" placeholder="Jumlah Kolam"
                            v-model="pond_amount">
                        </div>
                      </div>
                    </div>
                    <div class="d-flex align-items-start gap-3 mt-4">
                      <button type="button" class="btn btn-light btn-label previestab"
                        data-previous="steparrow-gen-info-tab" @click="prev()"><i
                          class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Sebelumnya</button>
                      <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                        data-nexttab="pills-experience-tab" @click="next()" v-if="!disabledButton"><i
                          class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Berikutnya</button>
                    </div>
                  </div>

                  <div class="tab-pane fade" data-position="2" id="pills-experience" role="tabpanel"
                    aria-labelledby="pills-experience-tab">
                    <div class="text-center">

                      <div class="avatar-md mt-5 mb-4 mx-auto">
                        <div class="avatar-title bg-light text-warning display-4 rounded-circle">
                          <i class="ri-alert-line"></i>
                        </div>
                      </div>
                      <h5>Konfirmasi</h5>
                      <p class="text-muted">Apakah anda yakin ingin menambahkan tambak ini? Jika iya, silahkan klik tombol
                        "Ya" dibawah ini.

                      </p>
                      <div class="mt-4">
                        <button type="button" class="btn btn-danger px-4  me-3" @click="prev()">Batal</button>
                        <button type="button" class="btn btn-success px-4" @click="save()">Ya</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <PondSkeleton></PondSkeleton>
    </template>
  </Parent>
</template>

<script lang="ts">
declare const Choices: any;
</script>

<script setup lang="ts">
import Parent from '../Parent.vue';
import PondSkeleton from '../../components/PondSkeleton.vue';
import { computed, onMounted, ref } from 'vue';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import Map from '../../components/Map.vue';
import useSkeleton from '../../helpers/skeleton';
import useApi from '../../composables/api';
import Notify from '../../helpers/notify';
import router from '../../router';
const { hideLoader, loader, showLoader } = useSkeleton();
const location = ref<any>({});

const getLocation = (value: any) => {
  location.value = value;
};

const schema = yup.object().shape({
  pond_name: yup.string().required(),
  provinsi: yup.string().required(),
  kabupaten: yup.string().required(),
  kecamatan: yup.string().required(),
  kelurahan: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    pond_name: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
  },
});

const { value: pond_name } = useField<any>('pond_name');
const { value: provinsi } = useField<any>('provinsi');
const { value: kabupaten } = useField<any>('kabupaten');
const { value: kecamatan } = useField<any>('kecamatan');
const { value: kelurahan } = useField<any>('kelurahan');

const pond_amount = ref<number>(0);
const wide = ref<number>(0);
const address = ref<string>('');

const disabledButton = computed(() => {
  if (pond_amount.value < 1 || location.value.lat == 0 || location.value.lng == 0 || wide.value < 1 || address.value == '') {
    return true;
  }
  return false;
});


function navActiveSelection(el: any, position: string, isNext?: boolean) {
  const tabActive: any = document.querySelector(el);
  const tabActivePosition = tabActive.getAttribute('data-position');
  const tabPosition: any = isNext ? parseInt(tabActivePosition) + 1 : parseInt(tabActivePosition) - 1;
  const tab: any = document.querySelector(position + `[data-position="${tabPosition}"]`);


  tabActive.classList.remove('active', 'done');
  tabActive.classList.add('done');
  tabActive.setAttribute('aria-selected', 'false');
  tabActive.setAttribute('tabindex', '-1');
  tab.classList.add('active', 'show');
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
}

const next = () => {
  navActiveSelection('button.nav-link.active', 'button', true);
  navActiveSelection('.tab-pane.fade.active.show', '.tab-pane.fade', true);
};
const prev = () => {
  navActiveSelection('button.nav-link.active', 'button', false);
  navActiveSelection('.tab-pane.fade.active.show', '.tab-pane.fade', false);
};
const { getResource } = useApi();

const province = ref<any>([]);
const loadProvince = async () => {
  const response = await getResource('/province');
  new Choices('#provinsi', {
    allowHTML: true,
    placeholder: true,
    placeholderValue: 'Provinsi',
    searchPlaceholderValue: 'Cari Provinsi',
    choices: response.data.map((item: any) => {
      return {
        value: item.id,
        label: item.name
      };
    }),
  });
};




onMounted(async () => {
  await showLoader();
  await hideLoader();
  await loadProvince();
});


const { postResource } = useApi();
const save = async () => {
  const data = {
    name: pond_name.value,
    province: provinsi.value,
    regency: kabupaten.value,
    subdistrict: kecamatan.value,
    village: kelurahan.value,
    long: location.value.lng,
    lat: location.value.lat,
    pool_amount: pond_amount.value,
    wide: wide.value,
    address: address.value
  };

  const response = await postResource('/pond', data);
  if (response) {
    Notify.success('Berhasil menambahkan tambak');
    router.replace('/pond');
  }
}



</script>