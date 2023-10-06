<template>
  <Parent>
    <div class="p-lg-5 p-4">
      <div>
        <h5 class="text-primary">Selamat Datang !</h5>
        <p class="text-muted">Masuk untuk melanjutkan.</p>
      </div>
      <div class="row justify-content-center d-flex mt-4 mb-0">
        <GoogleLogin :callback="callback" prompt />
      </div>
      <div class="mt-3">
        <form action="index.html">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control" id="email" placeholder="Email" v-model="email" />
          </div>

          <div class="mb-3">
            <div class="float-end">
              <a href="auth-pass-reset-cover.html" class="text-muted" tabindex="-1">Forgot password?</a>
            </div>
            <label class="form-label" for="password-input">Password</label>
            <div class="position-relative auth-pass-inputgroup mb-3">
              <input type="password" class="form-control pe-5 password-input" placeholder="Password" id="password-input"
                v-model="password" />
              <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                type="button" id="password-addon" @click="togglePassword">
                <i class="ri-eye-fill align-middle"></i>
              </button>
            </div>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="auth-remember-check" />
            <label class="form-check-label" for="auth-remember-check">Remember me</label>
          </div>

          <div class="mt-4">
            <button class="btn btn-success w-100" type="button" @click="tryLogin" :disabled="!meta.valid">
              <i class="bx bx-lock-open fs-16 align-middle me-2"></i> Masuk
            </button>

          </div>
        </form>
      </div>

      <div class="mt-5 text-center">
        <p class="mb-0">
          Apakah anda belum memiliki akun ?
          <RouterLink to="/register" class="fw-semibold text-primary text-decoration-underline">
            Registrasi</RouterLink>
        </p>
      </div>
    </div>
  </Parent>
</template>
<script setup lang="ts">
import axios from "axios";
import * as yup from "yup";
import { onMounted } from "vue";
import { carousels, togglePassword } from "../../helpers/handleEvent";
import { useForm, useField } from "vee-validate";
import useToken from "../../composables/token";
import Notify from "../../helpers/notify";
import router from "../../router";
import { GoogleLogin } from "vue3-google-login";
import { decodeCredential } from 'vue3-google-login';
import Parent from "./Parent.vue";


const { setToken } = useToken();

onMounted(() => {
  carousels("qoutescarouselIndicators");
});

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(3),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    password: "",
  },
});

const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const tryLogin = async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_API_SHRIMP + "/auth/login", {
      email: email.value,
      password: password.value,
    });
    if (response) {
      setToken(response.data.data.token_access);
      router.replace("/");
      return;
    }
  } catch (error: any) {
    Notify.error(error.response ? error.response.data.message : error.message);
  }
};
const callback = async (callback: any) => {
  if (!callback.credential) return;
  const userData: any = decodeCredential(callback.credential);
  if (!userData) return Notify.error("Gagal masuk");
  const data = {
    username: userData.name,
    email: userData.email,
    thumbnail: userData.picture,
    password: userData.sub,
  };
  const response = await axios.post(import.meta.env.VITE_API_SHRIMP + "/auth/login/google", data);
  if (response) {
    setToken(response.data.data.token_access);
    router.replace("/");
  }
};
</script>