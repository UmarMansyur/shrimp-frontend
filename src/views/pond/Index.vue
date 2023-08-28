<template>
  <Parent>
    <template v-if="loader">
      <TableSkeleton :column="4" :row="10"></TableSkeleton>
    </template>

    <template v-else>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title mb-0">Daftar Tambak</h4>
            </div>
            <div class="card-body">
              <div class="row mb-2">
                <Limit @limit="getLimit"></Limit>
                <div class="col-md-5 mb-2"></div>
                <div class="col-md-4 mb-2">
                  <div class="input-group">
                    <label class="mt-2 me-2" id="button-addon1">Cari:</label>
                    <input type="text" class="form-control" name="search" id="search" v-model="query"
                      placeholder="Masukkan kata kunci ..." @change="searching()">
                    <button class="btn btn-primary" type="button" id="button-addon2" @click="searching()">
                      <i class="bx bx-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 mt-4">
                  <div class="table-responsive">
                    <table class="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Nama Tambak</th>
                          <th scope="col" class="text-center">Luas Tambak</th>
                          <th scope="col" class="text-center">Jumlah Kolam</th>
                          <th scope="col">Alamat</th>
                          <th scope="col" class="text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="result.length === 0" class="bg-light">
                          <td colspan="5" class="text-center">
                            <img src="/assets/images/notfound.svg" alt="empty" class="img-fluid" width="500">
                          </td>
                        </tr>
                        <tr v-for="(item, index) in result" :key="index">
                          <td>{{ item.name }}</td>
                          <td class="text-center">{{ item.wide }} m<sup>2</sup></td>
                          <td class="text-center">{{ item.pool_amount }}</td>
                          <td>{{ item.address }}</td>
                          <td class="text-center">
                            <button class="btn btn-info btn-sm mx-2" @click="edit(item.id)">
                              <i class="bx bx-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" @click="destroy(item.id)">
                              <i class="bx bx-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="row" v-if="result.length > 0">
                <Pagination :current-page="currentPage" :is-first-page="isFirstPage" :is-last-page="isLastPage"
                  :go-to="goToPage" :next-page="nextPage" :page-list="pageList" :total-page="totalPage"
                  :prev-page="prevPage" :total-data="totalData">
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>

    </template>
  </Parent>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Pagination from '../../components/Pagination.vue';
import usePagination from '../../composables/pagination';
import Parent from '../Parent.vue';
import useSkeleton from '../../helpers/skeleton';
import TableSkeleton from '../../components/TableSkeleton.vue';
import Limit from '../../components/Limit.vue';
import Sweet from '../../helpers/sweetalert2';
import useApi from '../../composables/api';
import _default from '@vuepic/vue-datepicker';
import router from '../../router';
const { loader, hideLoader, showLoader } = useSkeleton();
const query = ref<string>('');
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
  search,
  changeLimit,
  goToPage,
  fetchData,
} = usePagination("/pond/list/me", "", query);

onMounted(async () => {
  showLoader();
  await fetchData();
  hideLoader();
});

const getLimit = async (limit: number) => {
  showLoader();
  await changeLimit(limit);
  hideLoader();
};

const searching = async () => {
  showLoader();
  await search();
  hideLoader();
};

const { deleteResource } = useApi();
const destroy = async (id: string) => {
  Sweet.confirm('Apakah anda yakin ingin menghapus data ini ?', async () => {
    showLoader();
    const response = await deleteResource('/pond/' + id);
    if(response) {
      Sweet.success('Berhasil menghapus data');
    }
    await fetchData();
    hideLoader();
  });
};

const edit = (id: string) => {
  router.push({ name: 'Edit Tambak', params: { id } });
};
</script>
