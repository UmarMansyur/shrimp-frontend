<template>
  <div class="row justify-content-end">
    <div class="col-md-12">
      <nav aria-label="..." class="float-end">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: props.currentPage == 1 }">
            <button class="page-link" @click="prevPage()">
              <i class="mdi mdi-chevron-left"></i>
            </button>
          </li>
          <li
            class="page-item"
            v-for="i in props.pageList"
            :class="{ active: i == currentPage }"
          >
            <button @click="goTo(i)" class="page-link">{{ i }}</button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: props.currentPage == props.totalPage }"
          >
            <button class="page-link" @click="nextPage()">
              <i class="mdi mdi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  nextPage: Function;
  prevPage: Function;
  totalPage: number;
  pageList: number[];
  currentPage: number;
  goTo: Function;
  isFirstPage: Boolean;
  isLastPage: Boolean;
  totalData: any;
}>();
</script>