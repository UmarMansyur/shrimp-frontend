<template>
  <Parent>
    <div class="row">
      <div class="col-md-2 mb-3">
        <select name="pond" id="pond" class="form-select" v-model="pondSelection">
        </select>
      </div>
      <div class="col-md-4"></div>
      <div class="col-md-6 mb-3 text-end">
        <RouterLink to="/pool/create" class="btn btn-outline-primary">Tambah Kolam</RouterLink>
      </div>
      <div class="col-12">
        <div class="row">
          <PoolMap :pond-id="(pondSelection).toString()"></PoolMap>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import PoolMap from '../../components/poolMap.vue';
import Parent from '../Parent.vue';
import Select from '../../components/Select.vue';
import useApi from '../../composables/api';
import { onMounted, ref } from 'vue';
import Sweet from '../../helpers/sweetalert2';
import router from '../../router';
declare const Choices: any;

const { getResource } = useApi();

onMounted(async ()=> {
  await loadTambak();
})

const pondSelection = ref<string>('');
const loadTambak = async () => {
  const response = await getResource('/pond/list/me');
  if(response) {
    const select = new Choices('#pond', {
      choices: response.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        }
      }),
      searchEnabled: false,
      shouldSort: false,
      allowHTML: true,
      itemSelectText: '',
    });
    if(response.data.length < 1) {
      Sweet.error('Anda belum memiliki tambak', ()=> {
        router.push('/pond/create');
      });
      return;
    }
    select.setChoiceByValue(response.data[0].id);
    pondSelection.value = response.data[0].id;
  }
};
</script>