<template>
  <Parent>
    <div class="row mb-3">
      <div class="col-5">
        <button class="btn btn-primary" @click="$router.push('/pool')">
          <i class="bx bx-arrow-back"></i> Kembali
        </button>
      </div>
      <div class="col-7 text-end">
        <RouterLink :to="`/pool/${$route.params.id}`" class="btn btn-outline-info me-1">
          <i class="bx bx-edit"></i>
          Edit Kolam</RouterLink>
          <button class="btn btn-outline-danger" @click="destroy()">
          <i class="bx bx-trash"></i>
          </button>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Peta Kolam</h4>
            <p class="card-text">Berikut merupakan peta dari kolam yang anda miliki. Untuk melihat lokasi dalam bentuk
              nyata klik tombol satelit.</p>
          </div>
          <div class="card-body">
            <div v-if="(pool.lat && pool.long) > 0">
              <Map id="pool" class="px-1 pt-1" height="50vh" :set-location="{
                lat: pool.lat,
                lng: pool.long,
              }"></Map>
            </div>
            <div v-else>
              <div class="alert bg-info py-5">
                <h4 class="alert-heading text-white">Tidak ada data!</h4>
                <p class="mb-0 text-white">Data lokasi kolam tidak ditemukan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Detail Kolam</h4>
            <p class="card-text">Berikut merupakan detail dari kolam yang anda miliki.</p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="card overflow-hidden shadow-none" style="border: none;">
                  <div class="card-body">
                    <div class="d-flex">
                      <div class="flex-grow-1">
                        <h6 class="mb-0"><b class="text-secondary">{{ pool.doc }}/100</b></h6>
                      </div>
                      <div class="flex-shrink-0">
                        <h6 class="mb-0">DOC</h6>
                      </div>
                    </div>
                  </div>
                  <div class="progress bg-secondary-subtle rounded-0">
                    <div class="progress-bar bg-secondary" role="progressbar" :style="`width:${pool.doc}%`"
                      :aria-value-now="{ width: pool.doc }" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="pond_name" class="form-label">Nama Tambak:</label>
                <input type="text" class="form-control" id="pond_name" disabled v-model="pool.pond_name">
              </div>
              <div class="col-md-6 mb-3">
                <label for="pool_name" class="form-label">Nama Kolam:</label>
                <input type="text" class="form-control" id="pool_name" disabled v-model="pool.pool_name">
              </div>
            </div>
            <div class="row">
              <div class="col-3 mb-3">
                <label for="height" class="form-label">Panjang:</label>
                <input type="text" class="form-control" id="height" disabled v-model="pool.height">
              </div>
              <div class="col-3 mb-3">
                <label for="width" class="form-label">{{ pool.label }}:</label>
                <input type="text" class="form-control" id="width" disabled v-model="pool.width">
              </div>
              <div class="col-3 mb-3">
                <label for="pool_type" class="form-label">Jenis Kolam:</label>
                <input type="text" class="form-control" id="pool_type" disabled v-model="pool.is_circle">
              </div>
              <div class="col-3 mb-3">
                <label for="width" class="form-label">Luas:</label>
                <input type="text" class="form-control" id="width" disabled v-model="pool.wide">
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-3">

              </div>
            </div>
            <div class="row mb-3">
              <div class="col-12">
                <label for="address" class="form-label">Alamat:</label>
                <textarea v-model="pool.address" class="form-control" id="address" rows="10" disabled></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 d-none d-md-block">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Informasi</h4>
            <p class="card-text">Informasi detail kolam</p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-6 mb-1">
                <span>Tanggal Tebar: </span>
              </div>
              <div class="col-6 text-end">
                <span>{{ pool.stock_date }}</span>
              </div>
              <div class="col-12">
                <div class="alert bg-primary border-primary text-white">
                  <div class="d-flex">
                    <div class="flex-grow-1">
                      <h6 class="mb-0"><b class="text-white">{{ pool.doc }}/100</b></h6>
                    </div>
                    <div class="flex-shrink-0">
                      <h6 class="mb-0 text-white">DOC</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 text-center mb-5">
                <h5 class="text-primary">Pantau DOC anda secara berkala dan lakukan perawatan sebagaimana mestinya.</h5>
              </div>
            </div>
            <img src="/assets/images/detail-pool.svg" alt="detail-pool" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Map from '../../components/Map.vue';
import Parent from '../Parent.vue';
import { decrypt } from '../../helpers/crypto';
import { useRoute } from 'vue-router';
import useApi from '../../composables/api';
import Sweet from '../../helpers/sweetalert2';
import router from '../../router';

const route = useRoute();
const id = ref<string>('');
const { getResource, deleteResource } = useApi();


onMounted(async () => {
  id.value = decrypt((route.params.id).toString());
  await loadMap();
});

const pool = ref<any>({});

const loadMap = async () => {
  const response = await getResource('/pool/' + id.value);
  pool.value = {
    pond_name: response.pond_name ? response.pond_name : 'Belum di set',
    pool_name: response.name ? response.name : 'Belum di set',
    lat: response.lat ? response.lat : 0,
    long: response.long ? response.long : 0,
    wide: response.wide ? response.wide : 0,
    width: response.width ? response.width : 0,
    address: response.address ? response.address : 'Belum di set',
    height: response.height ? response.height : 0,
    doc: response.doc ? response.doc : 0,
    stock_date: response.stock_date ? response.stock_date : 'Belum di set',
    is_circle: response.is_circle ? 'Lingkaran' : 'Persegi',
    label: response.is_circle ? 'Kedalaman' : 'Lebar',
  };
}

const destroy = () => {
  Sweet.confirm('Data terkait kolam ini akan hilang! ', async ()=> {
    const response = await deleteResource('/pool/' + id.value);
    if(response) {
      Sweet.success('Berhasil menghapus kolam!');
      router.push('/pond');
    }
  });
}

</script>