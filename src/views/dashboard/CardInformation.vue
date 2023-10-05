<template>
  <div class="row">
    <div class="col-xl-3 col-md-6">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 overflow-hidden">
              <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Suhu</p>
            </div>
            <div class="flex-shrink-0">
              <h5 class="text-primary fs-14 mb-0">
                {{ moment(new Date()).format('HH:mm:ss') }}
              </h5>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span>{{ datas.temperature ? datas.temperature : 0
               }}</span>&#8451; </h4>
              <span class="badge bg-primary">{{ moment(new Date()).format('YYYY-MM-DD / HH:mm:ss') }}</span>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-primary-subtle rounded fs-3">
                <i class="ri-temp-hot-line text-primary"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 overflow-hidden">
              <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Salinitas</p>
            </div>
            <div class="flex-shrink-0">
              <h5 class="text-success fs-14 mb-0">
                {{ moment(new Date()).format('HH:mm:ss') }}
              </h5>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span>{{ datas.salinity ? datas.salinity : 0
              }}</span> </h4>
              <span class="badge bg-success">{{ moment(new Date()).format('YYYY-MM-DD / HH:mm:ss') }}</span>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-success-subtle rounded fs-3">
                <i class="ri-shuffle-line text-success"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6">
      <!-- card -->
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 overflow-hidden">
              <p class="text-uppercase fw-medium text-muted text-truncate mb-0">ph</p>
            </div>
            <div class="flex-shrink-0">
              <h5 class="text-warning fs-14 mb-0">
                {{ moment(new Date()).format('HH:mm:ss') }}
              </h5>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span>{{ datas.ph ? datas.ph : 0 }}</span> </h4>
              <span class="badge bg-warning">{{ moment(new Date()).format('YYYY-MM-DD / HH:mm:ss') }}</span>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-warning-subtle rounded fs-3">
                <i class="ri-water-flash-line text-warning"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6">
      <!-- card -->
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 overflow-hidden">
              <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Ketinggian air</p>
            </div>
            <div class="flex-shrink-0">
              <h5 class="text-info fs-14 mb-0">
                {{ moment(new Date()).format('HH:mm:ss') }}
              </h5>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span>{{ datas.water_height ? datas.water_height : 0
               }}</span> </h4>
              <span class="badge bg-info">{{ moment(new Date()).format('YYYY-MM-DD / HH:mm:ss') }}</span>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-info-subtle rounded fs-3">
                <i class="bx bx-scatter-chart text-info"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import moment from 'moment-timezone';
moment.tz.setDefault('Asia/Jakarta');
import useApi from '../../composables/api';
import { usePond } from '../../stores/pond';
const { getResource } = useApi();
onMounted(() => {
  loadData();
});

const datas = ref<any>([]);
const pond = usePond();
const loadData = async () => {
  let path = pond.pool_id === 0 ? '/dashboard' : '/dashboard?id=' + pond.pool_id;
  const response = await getResource(path);

  if (response.data) {
    datas.value = response.data;
  }
};

watch(pond, () => {
  loadData();
});
</script>