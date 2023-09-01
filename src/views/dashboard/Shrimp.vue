<template>
  <div class="page-title-box">
    <div class="row justify-content-between align-items-center mt-3">
      <div class="col-md-3 col-6">
        <select name="pond" id="pond" class="form-select" v-model="pondSelection">
        </select>
      </div>
      <div class="col-md-6 d-none d-md-block"></div>
      <div class="col-md-3 col-6">
        <div class="row align-item-center">
          <label class="col-sm-3 col-form-label col-form-label d-none d-lg-block">Bulan:</label>
          <div class="col-sm-9">
            <div class="input-group">
              <VueDatePicker month-picker light="true" v-model="month" auto-apply></VueDatePicker>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <span>Rombasan Pragaan Sumenep</span> <a href="" class="text-info">Lihat Daftar kolam</a>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-12 align-items-center">
        <StartSycle />
        <Feed />
        <Anco />
        <Water />
        <Kimia />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import StartSycle from './StartCycle.vue';
import Feed from './Feed.vue';
import Water from './Water.vue';
import Anco from './Anco.vue';
import Kimia from './Kimia.vue';
import useApi from '../../composables/api';
import { usePond } from '../../stores/pond';
import Sweet from '../../helpers/sweetalert2';
import router from '../../router';
const month = ref(new Date());
declare const Choices: any;


const { getResource } = useApi();
onMounted(async () => {
  await loadTambak();
});

const pondSelection = ref<string>('');
const loadTambak = async () => {
  const response = await getResource('/pond/list/me');
  if (response) {
    if(response.data.length === 0) {
      Sweet.error('Anda belum memiliki tambak. Tambahkan terlebih dahulu', ()=> {
        router.push('/pond/create');
      });
      return;
    }
    const select = new Choices('#pond', {
      choices: response.data.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      }),
      searchEnabled: true,
      shouldSort: false,
      allowHTML: true,
      itemSelectText: '',
    });
    select.setChoiceByValue(response.data[0].id);
    pondSelection.value = response.data[0].id;
    return;
  }
};
const { setPondId } = usePond();
watch(pondSelection, async () => {
  setPondId(Number(pondSelection.value));
});
</script>