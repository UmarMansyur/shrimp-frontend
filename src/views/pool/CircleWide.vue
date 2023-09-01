<template>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label for="pool_length" class="form-label">Diameter: </label>
      <div class="input-group">
        <input type="number" name="pool_length" id="pool_length" class="form-control" placeholder="0" autofocus
          v-model="pool_length" :class="{ 'is-invalid': pool_length_meta.dirty && !pool_length_meta.valid }">
        <div class="input-group-text">m</div>
      </div>

    </div>
    <div class="col-md-4 mb-3">
      <label for="pool_depth" class="form-label">Kedalaman: </label>
      <div class="input-group">
        <input type="number" name="pool_depth" id="pool_depth" class="form-control" placeholder="0" v-model="pool_depth" :class="{ 'is-invalid': pool_depth_meta.dirty && !pool_depth_meta.valid }">
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
    pool_depth: yup.number().required().min(1),
    pool_wide: yup.number().required().min(1),
  }),
  initialValues: {
    pool_length: '',
    pool_depth: '',
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
  pool_depth.value = props.defaultValue.pool_depth;
  pool_wide.value = props.defaultValue.pool_wide;
});

const { value: pool_length, meta: pool_length_meta } = useField<Number>('pool_length');
const { value: pool_depth, meta: pool_depth_meta } = useField<Number>('pool_depth');
const { value: pool_wide, meta: pool_wide_meta } = useField<Number>('pool_wide');

const emit = defineEmits(['value']);

watch([pool_length, pool_depth], () => {
  const radius = Number(pool_length.value) / 2;
  const wide = Math.PI * radius * radius;
  pool_wide.value = wide;
  emit('value', {
    pool_length: pool_length.value,
    pool_depth: pool_depth.value,
    pool_wide: pool_wide.value,
  });
});
</script>