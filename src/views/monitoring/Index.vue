<template>
  <Parent>
    <div class="row">
      <div class="col-12 mb-3 text-end">
        <button class="btn btn-outline-primary" data-bs-target="#modal-perangkat" data-bs-toggle="modal"
          @click="randomColors">Tambah
          Perangkat</button>
        <Modal modal-id="modal-perangkat" modal="modal-md" title="Form Koneksi Perangkat">
          <div class="row">
            <div class="col-md-12 mb-3 text-start">
              <div class="mx-auto" style="max-width: 350px">
                <div class="bg-gradient p-4 rounded-3 mb-3" :class="colors">
                  <div class="d-flex">
                    <div class="flex-grow-1">
                      <i class="bx bx-chip h1 text-warning"></i>
                    </div>
                    <div class="flex-shrink-0">
                      <small>Gruvana</small>
                    </div>
                  </div>
                  <div class="card-number fs-20" id="card-num-elem">
                    XXXX XXXX XXXX XXXX
                  </div>

                  <div class="row mt-4">
                    <div class="col-4">
                      <div class="expiry">
                        <div class="text-white-50">Tambak</div>
                        <div class="fw-medium fs-14">
                          <span id="expiry-month-elem">00</span>
                          /
                          <span id="expiry-year-elem">0000</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-4">
                      <div>
                        <div class="text-white-50">Kolam</div>
                        <div id="cvc-elem" class="fw-medium fs-14">---</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form id="custom-card-form" autocomplete="off">
                <div class="mb-3">
                  <label for="card-num-input" class="form-label">Id Perangkat</label>
                  <input id="card-num-input" class="form-control" maxlength="19" placeholder="0000 0000 0000 0000"
                    @keyup="splitDigit" v-model="id_perangkat">
                </div>

                <div class="mb-3">
                  <label for="card-holder-input" class="form-label">Kolam</label>
                  <select class="form-select" v-model="pool">
                    <option value="">Pilih Kolam</option>
                    <option v-for="item in kolams" :key="item.id" :value="item.id">{{ item.name }}</option>
                  </select>
                </div>
              </form>
            </div>

            <div class="col-6 text-start">
              <button class="btn btn-light" data-bs-dismiss="modal">Batal</button>
            </div>
            <div class="col-6 text-end">
              <button class="btn btn-success" @click="connect" data-bs-dismiss="modal"
                :disabled="!meta.valid">Koneksikan</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header border-0 align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Monitoring Tambak</h4>
            <div>
              <select name="tool" id="tools" class="form-select" v-model="id_perangkat" @change="getChoiced">
                <option value="">Pilih Perangkat</option>
                <option v-for="item in alats" :key="item.id" :value="item.tool_id">{{ item.name }}</option>
              </select>
            </div>
          </div>
          <div class="card-header p-0 border-0 bg-light-subtle">
            <div class="row g-0 text-center">
              <div class="col-6 col-sm-3">
                <div class="p-3 border border-dashed border-start-0">
                  <h5 class="mb-1"><span class="counter-value" data-target="7585">{{ ph }}</span></h5>
                  <p class="text-muted mb-0">Ph</p>
                </div>
              </div>
              <div class="col-6 col-sm-3">
                <div class="p-3 border border-dashed border-start-0">
                  <h5 class="mb-1"><span class="counter-value" data-target="22.89">{{ temperatures }}</span></h5>
                  <p class="text-muted mb-0">Suhu</p>
                </div>
              </div>
              <div class="col-6 col-sm-3">
                <div class="p-3 border border-dashed border-start-0">
                  <h5 class="mb-1"><span class="counter-value" data-target="367">{{ tds }}</span></h5>
                  <p class="text-muted mb-0">TDS</p>
                </div>
              </div>
              <div class="col-6 col-sm-3">
                <div class="p-3 border border-dashed border-start-0 border-end-0">
                  <h5 class="mb-1 text-success"><span class="counter-value" data-target="18.92">{{ DO }}</span></h5>
                  <p class="text-muted mb-0">DO</p>
                </div>
              </div>
              <div class="col-12">
                <div id="chartRealtime"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabel Data Monitoring Real-time -->
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Data Monitoring Real-time</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Waktu</th>
                    <th scope="col">ID Perangkat</th>
                    <th scope="col">pH</th>
                    <th scope="col">Suhu (°C)</th>
                    <th scope="col">TDS</th>
                    <th scope="col">DO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="dataTable.length === 0">
                    <td colspan="8" class="text-center text-muted py-4">
                      <i class="bx bx-info-circle fs-3"></i>
                      <p class="mb-0">Belum ada data. Pilih perangkat untuk mulai monitoring.</p>
                    </td>
                  </tr>
                  <tr v-for="(item, index) in dataTable" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ formatDate(item.timestamp) }}</td>
                    <td><span class="badge bg-primary">{{ item.id }}</span></td>
                    <td>{{ item.ph }}</td>
                    <td>{{ item.temperature }}</td>
                    <td>{{ item.tds }}</td>
                    <td>{{ item.do }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-3 text-muted small" v-if="dataTable.length > 0">
              Total data: {{ dataTable.length }} record
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h4 class="card-title mb-0 flex-grow-1">Grafik Data Monitoring Historis</h4>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div id="chartRealtime2"></div>
        </div>
      </div>
    </div>
    <!-- Tabel Data Monitoring dengan Pagination & Filter -->
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Data Monitoring</h4>
            <div class="flex-shrink-0">
              <button class="btn btn-sm btn-danger" @click="clearTable">
                <i class="bx bx-trash"></i> Clear Data
              </button>
            </div>
          </div>
          <div class="card-body">
            <!-- Filter Tanggal -->
            <div class="row mb-3">
              <div class="col-md-4">
                <label class="form-label">Tanggal Mulai</label>
                <input type="date" class="form-control" v-model="filterStartDate" @change="applyFilter">
              </div>
              <div class="col-md-4">
                <label class="form-label">Tanggal Akhir</label>
                <input type="date" class="form-control" v-model="filterEndDate" @change="applyFilter">
              </div>
              <div class="col-md-4 d-flex align-items-end">
                <button class="btn btn-primary w-100" @click="resetFilter">
                  <i class="bx bx-revision"></i> Reset Filter
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-striped table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Waktu</th>
                    <th scope="col">ID Perangkat</th>
                    <th scope="col">pH</th>
                    <th scope="col">Suhu (°C)</th>
                    <th scope="col">TDS</th>
                    <th scope="col">DO</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="paginatedData.length === 0">
                    <td colspan="8" class="text-center text-muted py-4">
                      <i class="bx bx-info-circle fs-3"></i>
                      <p class="mb-0">{{ filteredData2.length === 0 ? 'Belum ada data. Pilih perangkat untuk mulai monitoring.' : 'Tidak ada data yang sesuai dengan filter.' }}</p>
                    </td>
                  </tr>
                  <tr v-for="(item, index) in paginatedData" :key="index">
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td>{{ formatDate(item.timestamp) }}</td>
                    <td>
                      <span class="badge bg-primary">{{ item.id }}</span>
                    </td>
                    <td>
                      {{ item.ph }}
                      <span class="badge" :class="{'bg-danger': item.ph > 8.5, 'bg-success': item.ph < 8}">{{ item.ph > 8.5 ? 'Tinggi' : item.ph < 8 ? 'Rendah' : 'Normal' }}</span>
                    </td>
                    <td>
                      {{ item.temperature }}
                      <span class="badge" :class="{'bg-danger': item.temperature > 32, 'bg-success': item.temperature < 27}">{{ item.temperature > 32 ? 'Tinggi' : item.temperature < 27 ? 'Rendah' : 'Normal' }}</span>
                    </td>
                    <td>
                      {{ item.tds }}
                      <span class="badge" :class="{'bg-danger': item.tds > 1000, 'bg-success': item.tds < 200}">{{ item.tds > 1000 ? 'Tinggi' : item.tds < 200 ? 'Rendah' : 'Normal' }}</span>
                    </td>
                    <td>
                      {{ item.do }}
                      <span class="badge" :class="{'bg-danger': item.do < 5, 'bg-success': item.do > 7}">{{ item.do < 5 ? 'Tinggi' : item.do > 7 ? 'Rendah' : 'Normal' }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="row mt-3" v-if="filteredData2.length > 0">
              <div class="col-sm-12 col-md-5">
                <div class="text-muted">
                  Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} sampai 
                  {{ Math.min(currentPage * itemsPerPage, filteredData2.length) }} dari 
                  {{ filteredData2.length }} data
                </div>
              </div>
              <div class="col-sm-12 col-md-7">
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-end mb-0">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <a class="page-link" href="javascript:void(0)" @click="changePage(currentPage - 1)">
                        <i class="bx bx-chevron-left"></i>
                      </a>
                    </li>
                    
                    <li v-for="page in displayedPages" :key="page" 
                        class="page-item" 
                        :class="{ active: currentPage === page }">
                      <a class="page-link" href="javascript:void(0)" @click="changePage(page)">
                        {{ page }}
                      </a>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" href="javascript:void(0)" @click="changePage(currentPage + 1)">
                        <i class="bx bx-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <!-- Items per page selector -->
            <div class="row mt-2" v-if="filteredData2.length > 0">
              <div class="col-sm-12 col-md-6">
                <div class="d-flex align-items-center">
                  <label class="me-2 text-muted">Tampilkan:</label>
                  <select class="form-select form-select-sm" style="width: auto;" v-model="itemsPerPage" @change="changeItemsPerPage">
                    <option :value="10">10</option>
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                  </select>
                  <span class="ms-2 text-muted">data per halaman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script lang="ts">
declare const Choices: any;
declare const ApexCharts: any;
</script>

<script setup lang="ts">
import Modal from '../../components/Modal.vue';
import { onMounted, ref, computed } from 'vue';
import Parent from '../Parent.vue';
// @ts-ignore
import * as mqtt from 'mqtt/dist/mqtt.min';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import useApi from '../../composables/api';

const client = mqtt.connect('wss://broker.unira.ac.id/');
const chartStatus = ref<any>(null);

const { meta } = useForm({
  validationSchema: yup.object({
    id_perangkat: yup.string().required().min(1).max(19),
    pool_id: yup.string().required(),
  }),
  initialValues: {
    id_perangkat: '',
    pool_id: '',
  },
});

const { value: id_perangkat } = useField<string>('id_perangkat');
const { value: pool } = useField<string>('pool_id');

// Data untuk tabel
const dataTable = ref<any[]>([]);
const dataTable2 = ref<any[]>([]);

// Pagination variables
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Filter variables
const filterStartDate = ref('');
const filterEndDate = ref('');

onMounted(async () => {
  await loadPool();
  await loadTools();
  await initilizeChart();
});

const { getResource, postResource } = useApi();

async function connect() {
  const data = {
    tool_id: id_perangkat.value,
    pool_id: pool.value,
  };
  const response = await postResource('/tool', data);
  if (response) {
    client.subscribe('udang/water/monitor/data');
  }
  await loadPool();
}

const ph = ref<any>(0);
const temperatures = ref<any>(0);
const tds = ref<any>(0);
const DO = ref<any>(0);

async function synchronize(id: string) {
  client.subscribe('udang/water/monitor/data');
  client.on('message', async (_topic: any, m: any) => {
    let message = JSON.parse(m.toString());

    if(message.id == id) {

      ph.value = message.ph;
      temperatures.value = message.temperature;
      tds.value = message.tds;
      DO.value = message.do;
      
      pH.value.push(Number(message.ph));
      temperature.value.push(Number(message.temperature));
      salinity.value.push(Number(message.tds));
      water_depth.value.push(Number(message.ketinggian_air));

      dataTable.value.unshift({
        id: message.id,
        ph: message.ph,
        temperature: message.temperature,
        tds: message.tds,
        do: message.do,
        ketinggian_air: message.ketinggian_air,
        timestamp: new Date().toISOString()
      });

      // Batasi jumlah data di tabel (opsional, misal max 50 record)
      if (dataTable.value.length > 50) {
        dataTable.value = dataTable.value.slice(0, 50);
      }
    }

    chartStatus.value.updateSeries([
      {
        name: 'pH',
        data: pH.value
      },
      {
        name: 'Temperature',
        data: temperature.value
      },
      {
        name: 'TDS',
        data: salinity.value
      },
      {
        name: 'DO',
        data: water_depth.value,
      },
    ]);
  });
}

const getChoiced = async () => {
  // Clear data sebelumnya saat ganti perangkat
  dataTable.value = [];
  pH.value = [];
  temperature.value = [];
  salinity.value = [];
  water_depth.value = [];
  
  synchronize(id_perangkat.value);
  loadDataMonitoring();
};

const colors = ref<string>('bg-primary');

function randomColors() {
  const bgColors = ['text-bg-dark', 'text-bg-primary', 'text-bg-success', 'text-bg-danger', 'text-bg-info'];
  const random = Math.floor(Math.random() * bgColors.length);
  colors.value = bgColors[random];
}

const splitDigit = () => {
  id_perangkat.value = id_perangkat.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1-');
  if (id_perangkat.value.length > 19) {
    id_perangkat.value = id_perangkat.value.slice(0, 19);
  }
};

const kolams = ref<any>([]);

const loadPool = async () => {
  const response = await getResource('/pool/list/me');
  if (response) {
    kolams.value = response.data;
  }
};

const alats = ref<any>([]);
const loadTools = async () => {
  const response = await getResource('/tool/list/me');

  if (response) {
    alats.value = response.data;
  }
};

const pH = ref<any>([]);
const temperature = ref<any>([]);
const salinity = ref<any>([]);
const water_depth = ref<any>([]);
const chart2 = ref<any>(null);
const initilizeChart = async () => {
  const options = {
    series: [
      {
        name: 'pH',
        data: []
      },
      {
        name: 'Temperature',
        data: []
      },
      {
        name: 'TDS',
        data: []
      },
      {
        name: 'DO',
        data: [],
      },
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false
      }
    },
    stroke: {
      curve: 'straight',
    },
  };

  chartStatus.value = await new ApexCharts(document.querySelector('#chartRealtime'), options);
  chart2.value = await new ApexCharts(document.querySelector('#chartRealtime2'), options);
  chartStatus.value.render();
  chart2.value.render();
}

// Format tanggal untuk ditampilkan di tabel
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// Fungsi untuk clear data tabel
const clearTable = async () => {
  if (confirm('Apakah Anda yakin ingin menghapus semua data dari tabel?')) {
    dataTable.value = [];
  }
};

const loadDataMonitoring = async () => {

  const response = await fetch('https://api2.gruvana.my.id/data/' + id_perangkat.value, {
    method: 'GET'
  });
  const data = await response.json();
  dataTable2.value = data.data;
  // urutkan dari yang terbaru ke terlama
  dataTable2.value.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  chart2.value.updateSeries([
    {
      name: 'pH',
      data: dataTable2.value.map((item: any) => Number(item.ph)),
    },
    {
      name: 'Temperature',
      data: dataTable2.value.map((item: any) => Number(item.temperature)),
    },
    {
      name: 'TDS',
      data: dataTable2.value.map((item: any) => Number(item.tds)),
    },
    {
      name: 'DO',
      data: dataTable2.value.map((item: any) => Number(item.do)),
    },
  ]);
  currentPage.value = 1; // Reset ke halaman pertama
};

// Filter data berdasarkan tanggal
const filteredData2 = computed(() => {
  if (!filterStartDate.value && !filterEndDate.value) {
    return dataTable2.value;
  }

  return dataTable2.value.filter((item: any) => {
    const itemDate = new Date(item.timestamp);
    const startDate = filterStartDate.value ? new Date(filterStartDate.value) : null;
    const endDate = filterEndDate.value ? new Date(filterEndDate.value) : null;

    // Set waktu untuk perbandingan yang akurat
    if (startDate) {
      startDate.setHours(0, 0, 0, 0);
    }
    if (endDate) {
      endDate.setHours(23, 59, 59, 999);
    }

    if (startDate && endDate) {
      return itemDate >= startDate && itemDate <= endDate;
    } else if (startDate) {
      return itemDate >= startDate;
    } else if (endDate) {
      return itemDate <= endDate;
    }

    return true;
  });
});

// Hitung total halaman
const totalPages = computed(() => {
  return Math.ceil(filteredData2.value.length / itemsPerPage.value);
});

// Data yang ditampilkan per halaman
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData2.value.slice(start, end);
});

// Halaman yang ditampilkan di pagination
const displayedPages = computed(() => {
  const pages = [];
  const maxPages = 5; // Maksimal tombol halaman yang ditampilkan
  
  let startPage = Math.max(1, currentPage.value - Math.floor(maxPages / 2));
  let endPage = Math.min(totalPages.value, startPage + maxPages - 1);
  
  if (endPage - startPage < maxPages - 1) {
    startPage = Math.max(1, endPage - maxPages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});

// Fungsi untuk ganti halaman
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Fungsi untuk ganti jumlah item per halaman
const changeItemsPerPage = () => {
  currentPage.value = 1; // Reset ke halaman pertama
};

// Fungsi untuk apply filter
const applyFilter = () => {
  currentPage.value = 1; // Reset ke halaman pertama setelah filter
};

// Fungsi untuk reset filter
const resetFilter = () => {
  filterStartDate.value = '';
  filterEndDate.value = '';
  currentPage.value = 1;
};

</script>