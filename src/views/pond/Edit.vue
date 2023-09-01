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
              <div class="step-arrow-nav mb-4">
                <ul class="nav nav-pills custom-nav nav-justified" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="steparrow-gen-info-tab" type="button" role="tab"
                      aria-controls="steparrow-gen-info" aria-selected="true" data-position="0">
                      Langkah 1
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="steparrow-description-info-tab" type="button" role="tab"
                      aria-controls="steparrow-description-info" aria-selected="false" data-position="1" tabindex="-1">
                      Langkah 2
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-experience-tab" type="button" role="tab"
                      aria-controls="pills-experience" aria-selected="false" data-position="2" tabindex="-1">
                      Konfirmasi
                    </button>
                  </li>
                </ul>
              </div>

              <div class="tab-content">
                <div class="tab-pane fade active show" data-position="0" id="steparrow-gen-info" role="tabpanel"
                  aria-labelledby="steparrow-gen-info-tab">
                  <div class="row mb-3">
                    <div class="col-12">
                      <label class="form-label" for="pond_name">Nama Tambak</label>
                      <input type="text" class="form-control" id="pond_name" placeholder="Nama Tambak"
                        v-model="pond_name" />
                    </div>
                  </div>
                  <Select id="provinsi" label="Provinsi" :options="province" @selected="getProvince"
                    :selected-default="provinsiDefault"></Select>
                  <Select id="kabupaten" label="Kabupaten" :options="districts" :selected-default="kabupatenDefault"
                    @selected="getDistricts"></Select>
                  <Select id="kecamatan" label="Kecamatan" :options="subDistricts" :selected-default="kecamatanDefault"
                    @selected="getSubDistricts"></Select>
                  <Select id="kelurahan" label="Kelurahan" :options="villages" @selected="getVillages"
                    :selected-default="kelurahanDefault"></Select>
                  <div class="">
                    <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                      data-nexttab="steparrow-description-info-tab" @click="next()" :disabled="!meta.valid">
                      <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Selanjutnya
                    </button>
                  </div>
                </div>
                <div class="tab-pane fade" data-position="1" id="steparrow-description-info" role="tabpanel"
                  aria-labelledby="steparrow-description-info-tab">
                  <div>
                    <div class="row">
                      <div class="col-lg-12 mb-3">
                        <span>Alamat</span>
                        <Map @location="getLocation" :set-location="loc"></Map>
                      </div>
                      <div class="col-lg-12 mb-3">
                        <label class="form-label" for="address">Alamat Lengkap: </label>
                        <textarea v-model="address" class="form-control" cols="10" rows="5" id="address"
                          autocomplete="false"></textarea>
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label" for="wide">Luas: </label>
                        <input type="number" class="form-control" id="wide" placeholder="Luas" v-model="wide" />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label class="form-label" for="pond_amount">Jumlah Kolam:
                        </label>
                        <input type="number" class="form-control" id="pond_amount" placeholder="Jumlah Kolam" readonly
                          v-model="pond_amount" />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-start gap-3 mt-4">
                    <button type="button" class="btn btn-light btn-label previestab"
                      data-previous="steparrow-gen-info-tab" @click="prev()">
                      <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                      Sebelumnya
                    </button>
                    <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                      data-nexttab="pills-experience-tab" @click="next()" v-if="!disabledButton">
                      <i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Berikutnya
                    </button>
                  </div>
                </div>

                <div class="tab-pane fade" data-position="2" id="pills-experience" role="tabpanel"
                  aria-labelledby="pills-experience-tab">
                  <div class="text-center">
                    <h5>Konfirmasi</h5>
                    <img src="/assets/images/convert.svg" alt="" class="img-fluid" width="200" />
                    <p class="mt-3">
                      Pastikan data yang anda inputkan sudah benar, Jika terdapat
                      kesalahan silahkan klik tombol kembali dan ulangi kembali.
                    </p>
                  </div>
                  <div class="mt-4">
                    <div class="d-flex align-items-start gap-3 mt-4">
                      <button type="button" class="btn btn-light btn-label previestab"
                        data-previous="steparrow-gen-info-tab" @click="prev()">
                        <i class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                        Sebelumnya
                      </button>
                      <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                        data-nexttab="pills-experience-tab" @click="save()">
                        <i class="bx bx-save label-icon align-middle fs-16 ms-2"></i>Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

<script setup lang="ts">
import Parent from "../Parent.vue";
import Select from "../../components/Select.vue";
import PondSkeleton from "../../components/PondSkeleton.vue";
import { computed, onMounted, ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import Map from "../../components/Map.vue";
import useSkeleton from "../../helpers/skeleton";
import useApi from "../../composables/api";
import Notify from "../../helpers/notify";
import { next, prev } from "../../helpers/handleEvent";
import Sweet from "../../helpers/sweetalert2";
import { decrypt } from "../../helpers/crypto";
import { useRoute } from "vue-router";


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
    pond_name: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kelurahan: "",
  },
});

const { value: pond_name } = useField<string>("pond_name");
const { value: provinsi } = useField<string>("provinsi");
const { value: kabupaten } = useField<string>("kabupaten");
const { value: kecamatan } = useField<string>("kecamatan");
const { value: kelurahan } = useField<string>("kelurahan");

const pond_amount = ref<number>(0);
const wide = ref<number>(0);
const address = ref<string>("");

const disabledButton = computed(() => {
  if (
    pond_amount.value < 1 ||
    location.value.lat == 0 ||
    location.value.lng == 0 ||
    wide.value < 1 ||
    address.value == ""
  ) {
    return true;
  }
  return false;
});

const { getResource } = useApi();

const province = ref<any>([]);
const loadLocation = async (endpoint: string) => {
  const response = await getResource(endpoint);
  return response.data.map((item: any) => {
    return {
      value: JSON.stringify(item),
      label: item.name,
    };
  });
};

const { params } = useRoute();
const provinsiDefault = ref<any>(null);
const kabupatenDefault = ref<any>(null);
const kecamatanDefault = ref<any>(null);
const kelurahanDefault = ref<any>(null);
const loc = ref<any>({});
const id = ref<string>("");
onMounted(async () => {
  await showLoader();
  if (params.id) {
    id.value = decrypt(params.id.toString());
    province.value = await loadLocation("/province");
    const { data } = await getResource("/pond/" + id.value);


    const getProvince = await setDefault(province.value, data.province);
    provinsiDefault.value = getProvince.value;
    provinsi.value = getProvince.label;

    districts.value = await loadLocation('/district/' + JSON.parse(getProvince.value).id);
    const getKabupaten = await setDefault(districts.value, data.regency);
    kabupatenDefault.value = getKabupaten.value;
    kabupaten.value = getKabupaten.label;


    subDistricts.value = await loadLocation('/subdistrict/' + JSON.parse(getKabupaten.value).id);
    const getKecamatan = await setDefault(subDistricts.value, data.subdistrict);
    kecamatanDefault.value = getKecamatan.value;
    kecamatan.value = getKecamatan.label;

    villages.value = await loadLocation('/villages/' + JSON.parse(getKecamatan.value).id);
    const getKelurahan = await setDefault(villages.value, data.village);
    kelurahanDefault.value = getKelurahan.value;
    kelurahan.value = getKelurahan.label;

    pond_name.value = data.name;
    address.value = data.address;
    pond_amount.value = data.pool_amount;
    wide.value = data.wide;
    loc.value = {
      lat: data.lat,
      lng: data.long,
    };
  }
  await hideLoader();
});

const setDefault = async (model: any, value: any) => {
  return model.find((item: any) => item.label == value);
};

const districts = ref<any>([]);
const getProvince = async (value: any) => {
  provinsi.value = JSON.parse(value).name;
  districts.value = await loadLocation("/district/" + JSON.parse(value).id);
};

const subDistricts = ref<any>([]);
const getDistricts = async (value: any) => {
  kabupaten.value = JSON.parse(value).name;
  subDistricts.value = await loadLocation("/subdistrict/" + JSON.parse(value).id);
};

const villages = ref<any>([]);
const getSubDistricts = async (value: any) => {
  kecamatan.value = JSON.parse(value).name;
  villages.value = await loadLocation("/villages/" + JSON.parse(value).id);
};

const getVillages = async (value: any) => {
  kelurahan.value = JSON.parse(value).name;
};

const { putResource } = useApi();
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
    address: address.value,
  };
  Sweet.confirm("Apakah anda yakin ingin menyimpan data ini?", async () => {
    showLoader();
    const response = await putResource("/pond/" + id.value, data);
    if (response) {
      Notify.success("Berhasil menambahkan tambak");
    }
    clearData();
    hideLoader();
  });
};

function clearData() {
  pond_amount.value = 0;
  wide.value = 0;
  address.value = "";
  location.value = {};
  pond_name.value = "";
  provinsi.value = "";
  kabupaten.value = "";
  kecamatan.value = "";
  kelurahan.value = "";
  villages.value = [];
  districts.value = [];
  subDistricts.value = [];
}
</script>