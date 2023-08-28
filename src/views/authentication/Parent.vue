<template>
  <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
    <div class="bg-overlay"></div>
    <div class="auth-page-content overflow-hidden pt-lg-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="card overflow-hidden">
              <div class="row g-0">
                <div class="col-lg-6 d-none d-md-block">
                  <div class="p-lg-5 p-4 auth-one-bg h-100">
                    <div class="bg-overlay"></div>
                    <div class="position-relative h-100 d-flex flex-column">
                      <div class="mb-4">
                        <a href="index.html" class="d-block">
                          <img src="/assets/images/logo.svg" alt="" height="80">
                        </a>
                      </div>
                      <div class="mt-auto">
                        <div class="mb-3">
                          <i class="ri-double-quotes-l display-4 text-success"></i>
                        </div>

                        <div id="qoutescarouselIndicators" class="carousel slide" data-bs-ride="carousel">
                          <div class="carousel-indicators">
                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="0" class=""
                              aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="1"
                              aria-label="Slide 2" class="active" aria-current="true"></button>
                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="2"
                              aria-label="Slide 3"></button>
                          </div>
                          <div class="carousel-inner text-center text-white-50 pb-5">
                            <div class="carousel-item">
                              <p class="fs-15 fst-italic">" Udang adalah salah satu komoditas perikanan yang memiliki
                                nilai ekonomi tinggi. "</p>
                            </div>
                            <div class="carousel-item active">
                              <p class="fs-15 fst-italic">" Budidaya udang dapat dilakukan di lahan yang luas maupun
                                sempit. "</p>
                            </div>
                            <div class="carousel-item">
                              <p class="fs-15 fst-italic">" Bincang Budidaya Udang adalah aplikasi yang dapat membantu
                                petani udang dalam mengelola usahanya. "</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="p-lg-5 p-4">
                    <div>
                      <h5 class="text-primary">Selamat Datang !</h5>
                      <p class="text-muted">Masuk untuk melanjutkan.</p>
                    </div>

                    <div class="mt-4">
                      <form action="index.html">

                        <div class="mb-3">
                          <label for="email" class="form-label">Email</label>
                          <input type="text" class="form-control" id="email" placeholder="Email" v-model="email">
                        </div>

                        <div class="mb-3">
                          <div class="float-end">
                            <a href="auth-pass-reset-cover.html" class="text-muted">Forgot password?</a>
                          </div>
                          <label class="form-label" for="password-input">Password</label>
                          <div class="position-relative auth-pass-inputgroup mb-3">
                            <input type="password" class="form-control pe-5 password-input" placeholder="Password"
                              id="password-input" v-model="password">
                            <button
                              class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button" id="password-addon" @click="togglePassword"><i class="ri-eye-fill align-middle"></i></button>
                          </div>
                        </div>

                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="auth-remember-check">
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
                      <p class="mb-0">Apakah anda telah memiliki akun ? <a href="auth-signup-cover.html"
                          class="fw-semibold text-primary text-decoration-underline"> Registrasi</a> </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer mb-3">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0">©
                2023 Bincang Budidaya Udang. Crafted with <i class="mdi mdi-heart text-danger"></i> by ProJs Universitas
                Madura
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

import axios from 'axios';
import * as yup from 'yup';
import { onMounted } from 'vue';
import { carousels, togglePassword } from '../../helpers/handleEvent';
import { useForm, useField } from 'vee-validate';
import useToken from '../../composables/token';
import Notify from '../../helpers/notify';
import router from '../../router';

const { setToken } = useToken();

onMounted(() => {
  carousels('qoutescarouselIndicators');
});

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(6),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  }
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');


const tryLogin = async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_API_SHRIMP + '/auth/login', {
      email: email.value,
      password: password.value
    });
    console.log(response);
    if(response) {
      setToken(response.data.data.token_access);
      router.replace('/')
      return;
    }
  } catch (error: any) {
    Notify.error(error.response ? error.response.data.message: error.message);
  }
}



</script>