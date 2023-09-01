<template>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label for="pool_length" class="form-label">Panjang: </label>
      <div class="input-group">
        <input type="number" name="pool_length" id="pool_length" class="form-control" placeholder="0" autofocus
          v-model="pool_length" :class="{ 'is-invalid': pool_length_meta.dirty && !pool_length_meta.valid }">
        <div class="input-group-text">m</div>
      </div>

    </div>
    <div class="col-md-4 mb-3">
      <label for="pool_width" class="form-label">Lebar: </label>
      <div class="input-group">
        <input type="number" name="pool_width" id="pool_width" class="form-control" placeholder="0" v-model="pool_width" :class="{ 'is-invalid': pool_width_meta.dirty && !pool_width_meta.valid }">
        <div class="input-group-text">m</div>
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="pool_wide" class="form-label">Luas: </label>
      <div class="input-group">
        <input type="number" name="pool_wide" id="pool_wide" class="form-control" placeholder="m²" readonly
          v-model="pool_wide" :class="{ 'is-invalid': pool_wide_meta.dirty && !pool_wide_meta.valid }">
        <div class="input-group-text">m</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

useForm({
  validationSchema: yup.object().shape({
    pool_length: yup.number().required().min(1),
    pool_width: yup.number().required().min(1),
    pool_wide: yup.number().required().min(1),
  }),
  initialValues: {
    pool_length: '',
    pool_width: '',
    pool_wide: '',
  },
});

const props = defineProps({
  defaultValue: {
    type: Object,
    default: {
      pool_length: '',
      pool_width: '',
      pool_wide: '',
    }
  },
});

onMounted(() => {
  pool_length.value = props.defaultValue.pool_length;
  pool_width.value = props.defaultValue.pool_width;
  pool_wide.value = props.defaultValue.pool_wide;
});

const { value: pool_length, meta: pool_length_meta } = useField<Number>('pool_length');
const { value: pool_width, meta: pool_width_meta } = useField<Number>('pool_width');
const { value: pool_wide, meta: pool_wide_meta } = useField<Number>('pool_wide');

const emit = defineEmits(['value']);

watch([pool_length, pool_width], () => {
  pool_wide.value = (Number(pool_length.value) * Number(pool_width.value));
  emit('value', {
    pool_length: pool_length.value,
    pool_width: pool_width.value,
    pool_wide: pool_wide.value,
  });
});
</script>