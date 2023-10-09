<template>
  <Parent>
    <div class="p-lg-5 p-4">
      <h5 class="text-primary">Tambahkan Password Baru</h5>
      <p class="text-muted">Password yang anda masukkan harus berbeda dengan password sebelumnya.</p>

      <div class="p-2">
        <form action="">
          <div class="mb-3">
            <label class="form-label" for="password-input">Password <span class="text-danger">*</span></label>
            <div class="position-relative auth-pass-inputgroup mb-3">
              <input type="password" class="form-control pe-5 password-input" placeholder="Password" id="password-input"
                v-model="password" />
              <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                type="button" id="password-addon" @click="togglePassword">
                <i class="ri-eye-fill align-middle"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="password-input">Konfirmasi Password <span class="text-danger">*</span></label>
            <div class="position-relative auth-pass-inputgroup mb-3">
              <input type="password" class="form-control pe-5 password-input" placeholder="Konfirmasi Password"
                id="confirm-password-input" v-model="confirmPassword" />
              <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                type="button" id="password-addon" @click="toggleConfirmPassword">
                <i class="ri-eye-fill align-middle"></i>
              </button>
            </div>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="auth-remember-check">
            <label class="form-check-label" for="auth-remember-check">Remember me</label>
          </div>

          <div class="mt-4">
            <button class="btn btn-success w-100" type="button" :disabled="!meta.valid" @click="changedPassword">
              <i class="bx bx-lock-open fs-16 align-middle me-2"></i>Reset Password</button>
          </div>

        </form>
      </div>

      <div class="mt-5 text-center">
        <p class="mb-0">Tunggu, saya ingat password saya ... <RouterLink to="/login"
            class="fw-semibold text-primary text-decoration-underline"> Klik disini! </RouterLink>
        </p>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import Parent from './Parent.vue';
import * as yup from 'yup';
import { togglePassword, toggleConfirmPassword } from '../../helpers/handleEvent';
import { useForm, useField } from 'vee-validate';
import Notify from '../../helpers/notify';
import router from '../../router';
import axios from 'axios';

const schema = yup.object().shape({
  password: yup.string().required().min(3),
  confirmPassword: yup.string().required().min(3),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
    confirmPassword: '',
  },
});

const { value: password } = useField<string>('password');
const { value: confirmPassword } = useField<string>('confirmPassword');


const changedPassword = async () => {
  if (password.value !== confirmPassword.value) {
    Notify.error('Password is not match');
    return;
  }
  document.getElementById('layer')?.classList.remove('d-none');
  const response = await axios.patch(import.meta.env.VITE_API_SHRIMP + '/auth/reset-password', {
    password: password.value,
  }, {
    headers: {
      Authorization: `Bearer ${router.currentRoute.value.query.token}`,
    },
  });
  document.getElementById('layer')?.classList.add('d-none');
  if (response) {
    Notify.success(response.data.message);
    router.replace('/login');
  }

}

</script>