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
                      <small>Bincang Budidaya Udang</small>
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
                  <select class="form-select" aria-label="Default select example" id="pool" v-model="pool">
                    <option value="">Pilih Kolam</option>
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
              <select name="tool" id="tools" class="form-select">asdfsdf</select>
            </div>
          </div>
          <div class="card-header p-0 border-0 bg-light-subtle">
            <div class="row g-0 text-center">
              <div class="col-6 col-sm-3">
                <div class="p-3 border border-dashed border-start-0">
                  <h5 class="mb-1"><span class="counter-value" data-target="7585">7,585</span></h5>
                  <p class="text-muted mb-0">Orders</p>
                </div>
              </div>
              <div class="col-6 col-sm-3">
                <div class="p-3 border border-dashed border-start-0">
                  <h5 class="mb-1">$<span class="counter-value" data-target="22.89">22.89</span>k</h5>
                  <p class="text-muted mb-0">Earnings</p>
                </div>
              </div>
              <div class="col-6 col-sm-3">
                <div class="p-3 border border-dashed border-start-0">
                  <h5 class="mb-1"><span class="counter-value" data-target="367">367</span></h5>
                  <p class="text-muted mb-0">Refunds</p>
                </div>
              </div>
              <div class="col-6 col-sm-3">
                <div class="p-3 border border-dashed border-start-0 border-end-0">
                  <h5 class="mb-1 text-success"><span class="counter-value" data-target="18.92">18.92</span>%</h5>
                  <p class="text-muted mb-0">Conversation Ratio</p>
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
  </Parent>
</template>

<script lang="ts">
declare const Choices: any;
declare const ApexCharts: any;
</script>

<script setup lang="ts">
import Modal from '../../components/Modal.vue';
import { onMounted, ref } from 'vue';
import Parent from '../Parent.vue';
import * as mqtt from 'mqtt/dist/mqtt.min';

import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import useApi from '../../composables/api';

const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');
const chartStatus = ref<any>(null);

const { meta } = useForm({
  validationSchema: yup.object({
    id_perangkat: yup.string().required().min(19).max(19),
    pool_id: yup.string().required(),
  }),
  initialValues: {
    id_perangkat: '',
    pool_id: '',
  },
});

const { value: id_perangkat } = useField<string>('id_perangkat');
const { value: pool } = useField<string>('pool_id');

onMounted(async () => {
  client.on('connect', () => {
    client.subscribe('monitoring/tambak/udang/v1');
  });
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
  const response = await postResource('/tool/', data);
  if (response) {
    client.publish('monitoring/tambak/udang/v1/' + id_perangkat.value, 'test');
  }
}

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

const loadPool = async () => {
  const response = await getResource('/pool/list/me');
  if (response) {
    new Choices('#pool', {
      choices: response.data.map((item: any) => {
        return {
          value: item.id,
          label: item.pond_name + ' - ' + item.name
        };
      }),
      allowHTML: true,
      searchEnabled: true,
      shouldSort: false,
    });
  }
};

const loadTools = async () => {
  const response = await getResource('/tool/list/me');
  if (response) {
    new Choices('#tools', {
      choices: response.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      }),
      allowHTML: true,
      searchEnabled: true,
      shouldSort: false,
    });
  }
};
const pH = ref<any>([]);
const temperature = ref<any>([]);
const salinity = ref<any>([]);
const water_depth = ref<any>([]);
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
        name: 'Salinity',
        data: []
      },
      {
        name: 'Water Depth',
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
    stroke: {
      curve: 'straight',
    },
  };

  chartStatus.value = await new ApexCharts(document.querySelector('#chartRealtime'), options);
  chartStatus.value.render();
}

client.on('message', async (_topic: any, m: any) => {
  let message = m.toString();
  pH.value.push(Number(message));
  temperature.value.push(Number(message));
  salinity.value.push(Number(message));
  water_depth.value.push(Number(message));

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
      name: 'Salinity',
      data: salinity.value
    },
    {
      name: 'Water Depth',
      data: water_depth.value,
    },
  ]);

  console.log(pH.value, temperature.value, salinity.value, water_depth.value);

});


</script>