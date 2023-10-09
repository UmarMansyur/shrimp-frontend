<template>
  <Parent>
    <div class="p-lg-5 p-4">
      <h5 class="text-primary">Forgot Password?</h5>
      <p class="text-muted">Reset kata sandi anda.</p>

      <div class="mt-2 text-center">
        <lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" class="avatar-xl">
        </lord-icon>
      </div>

      <div class="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
        Masukkan email anda untuk mendapatkan link reset password.
      </div>
      <div class="p-2">
        <form>
          <div class="mb-4">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Masukkan alamat email" v-model="email" />
          </div>

          <div class="text-center mt-4">
            <button class="btn btn-success w-100" type="button" :disabled="!meta.valid" @click="sendResetPassword">
              <i class="bx bx-lock-open fs-16 align-middle me-2"></i>
              Reset Password</button>
          </div>
        </form><!-- end form -->
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
import { useField, useForm } from 'vee-validate';
import Notify from '../../helpers/notify';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { onMounted } from 'vue';
import axios from 'axios';
onMounted(() => {
  defineElement(lottie.loadAnimation);
});

const schema = yup.object().shape({
  email: yup.string().required().email(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
  },
});

const { value: email } = useField<string>('email');

const sendResetPassword = async () => {
  try {
    document.getElementById('layer')?.classList.remove('d-none');
    const response = await axios.post(import.meta.env.VITE_API_SHRIMP + '/auth/forgot-password', {
      email: email.value,
    });
    document.getElementById('layer')?.classList.add('d-none');
    if (response.data.httpCode === 200) {
      Notify.success(response.data.message);
    }
  } catch (error: any) {
    document.getElementById('layer')?.classList.add('d-none');
    Notify.error(error.response ? error.response.data.message : error.message);
  }
}

</script>