<template>
  <template v-if="!loader">
    <div class="col-xl-3" v-for="(pool) in result">
      <div class="card explore-box card-animate rounded">
        <div class="explore-place-bid-img" v-if="pool.lat && pool.long">
          <Map :id="`pool-${pool.id}`" :set-location="{
            lat: pool.lat,
            lng: pool.long,
          }"></Map>
        </div>

        <div class="explore-place-bid-img" v-else>
          <div class="alert text-white bg-primary" role="alert">
            <img src="/assets/images/logo.svg" alt="" class="img-fluid" style="height: 257px;">
          </div>
        </div>

        <div class="card-body">
          <p class="fw-medium mb-0 float-end"></p>
          <h5 class="mb-1"><a href="apps-nft-item-details.html">{{ pool.name ? pool.name : 'Belum di set' }}</a></h5>
          <p class="text-muted mb-0">{{ pool.pond_name }}</p>
        </div>
        <div class="card-footer border-top border-top-dashed">
          <div class="d-grid">
            <RouterLink :to="`/pool/detail/${encrypt(pool.id)}`" class="btn btn-success">Selengkapnya</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12">
      <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage" :go-to="goToPage"
        :next-page="nextPage" :page-list="pageList" :total-page="totalPage" :prev-page="prevPage" :total-data="totalData">
      </Pagination>
    </div>
  </template>
  <template v-else>
    <div class="col-xl-3" v-for="i in 8" :key="i">
      <div class="card" aria-hidden="true">
        <div class="card-img-top img-placeholder px-3 mt-3">
          <span class="placeholder col-12" style="height: 200px;"></span>
        </div>
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
          </p>
          <div class="text-center">
            <a href="#" tabindex="-1" class="btn btn-dark disabled placeholder col-12"></a>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import Map from './Map.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { encrypt } from '../helpers/crypto';
import useSkeleton from '../helpers/skeleton';
import Pagination from './Pagination2.vue';
import usePagination from '../composables/pagination2';

const props = defineProps({
  pondId: {
    type: String,
    required: true,
    default: ''
  }
});

const path = ref<string>('/pool/list/me' + props.pondId);
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
  limitPage
} = usePagination(path, "", '');
limitPage.value = 8;
const { loader, showLoader, hideLoader } = useSkeleton();


const computedProps = computed(() => {
  return {
    pondId: props.pondId,
  };
});

async function loadData() {
 await fetchData();
}

onMounted(async () => {
  await showLoader();
  await loadData();
  await hideLoader();
});


watch(computedProps, async () => {
  await showLoader();
  path.value = '/pool/list/me/' + props.pondId;
  await loadData();
  await hideLoader();
});


</script>

