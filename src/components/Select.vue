<template>
  <div class="row mb-3">
    <div class="col-12">
      <label class="form-label" :for="id">{{ label }}: </label>
      <select :name="id" :id="id" class="form-select" v-model="selected" :class="class"></select>
    </div>
  </div>
</template>

<script setup lang="ts">
declare const Choices: any;
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  id: {
    type: String,
    required: true,
    default: "",
  },
  selectedDefault: {
    required: false,
    default: "",
  },
  class: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["selected"]);
const selected = ref<any>({});

const choices = ref<any>(null);

onMounted(async () => {
  await initializeChoices(props.options);
});

const initializeChoices = async (options: any) => {
  choices.value = new Choices("#" + props.id, {
    searchEnabled: true,
    shouldSort: false,
    choices: [
      {
        value: "",
        label: "Pilih " + props.label,
      },
      ...options,
    ],
    allowHTML: true,
    searchFields: ["label"],
    searchResultLimit: 5,
    noResultsText: "Data tidak ditemukan",
    noChoicesText: "Data tidak ditemukan",
    placeholder: true,
    placeholderValue: "Pilih " + props.label,
    itemSelectText: "Press to select",
  });

  if (props.selectedDefault) {
    choices.value.setChoiceByValue(props.selectedDefault);
    selected.value = props.selectedDefault;
  }
};
watch(selected, (value) => {
  if (value) {
    emit("selected", value);
  }
});

watch(
  () => props.options,
  (value) => {
    if (choices.value) {
      choices.value.destroy();
    }
    initializeChoices(value);
  },
  { deep: true }
);
</script>
