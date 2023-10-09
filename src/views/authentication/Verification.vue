<template>
  <Parent>
    <div class="p-lg-5 p-4">
      <div class="mb-4">
        <div class="avatar-lg mx-auto">
          <div class="avatar-title bg-light text-primary display-5 rounded-circle">
            <i class="ri-mail-line"></i>
          </div>
        </div>
      </div>
      <div class="text-muted text-center mx-lg-3">
        <h4 class="">Verifikasi Akun Anda</h4>
        <p>Masukkan 6 digit kode yang dikirim ke <span class="fw-semibold">{{ email }}</span></p>
      </div>

      <div class="mt-4">
        <form autocomplete="off">
          <div class="row">
            <div class="col-2">
              <div class="mb-3">
                <label for="digit1-input" class="visually-hidden">Digit 1</label>
                <input type="text" class="form-control form-control-lg bg-light border-light text-center"
                  @keyup="handleEvent(0, $event)" maxlength="1" id="digit1-input" autofocus v-model="digit[0]">
              </div>
            </div><!-- end col -->

            <div class="col-2">
              <div class="mb-3">
                <label for="digit2-input" class="visually-hidden">Digit 2</label>
                <input type="text" class="form-control form-control-lg bg-light border-light text-center"
                  @keyup="handleEvent(1, $event)" maxlength="1" id="digit2-input" v-model="digit[1]">
              </div>
            </div><!-- end col -->

            <div class="col-2">
              <div class="mb-3">
                <label for="digit3-input" class="visually-hidden">Digit 3</label>
                <input type="text" class="form-control form-control-lg bg-light border-light text-center"
                  @keyup="handleEvent(2, $event)" maxlength="1" id="digit3-input" v-model="digit[2]">
              </div>
            </div><!-- end col -->

            <div class="col-2">
              <div class="mb-3">
                <label for="digit4-input" class="visually-hidden">Digit 4</label>
                <input type="text" class="form-control form-control-lg bg-light border-light text-center"
                  @keyup="handleEvent(3, $event)" maxlength="1" id="digit4-input" v-model="digit[3]">
              </div>
            </div><!-- end col -->
            <div class="col-2">
              <div class="mb-3">
                <label for="digit4-input" class="visually-hidden">Digit 5</label>
                <input type="text" class="form-control form-control-lg bg-light border-light text-center"
                  @keyup="handleEvent(4, $event)" maxlength="1" id="digit5-input" v-model="digit[4]">
              </div>
            </div><!-- end col -->
            <div class="col-2">
              <div class="mb-3">
                <label for="digit4-input" class="visually-hidden">Digit 6</label>
                <input type="text" class="form-control form-control-lg bg-light border-light text-center" maxlength="1"
                  id="digit6-input" v-model="digit[5]" @keyup="handleEvent(5, $event)">
              </div>
            </div><!-- end col -->
          </div>
          <div class="mt-3">
            <button type="button" class="btn btn-success w-100" :disabled="!meta.valid" @click="tryConfirm">
              <i class="bx bx-send fs-16 align-middle me-2"></i>Konfirmasi Kode</button>
          </div>
        </form>
      </div>

      <div class="mt-5 text-center">
        <p class="mb-0">Belum menerima kode ? <a href="" @click.prevent="resendCode"
            class="fw-semibold text-primary text-decoration-underline">Kirim Ulang</a> </p>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Parent from './Parent.vue';
import router from '../../router';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import Notify from '../../helpers/notify';
import axios from 'axios';

const email = ref<string>('');
onMounted(() => {
  email.value = localStorage.getItem('email') || '';
  if (email.value == '') {
    router.replace('/register');
  }
});

const schema = yup.object().shape({
  digit: yup.array().of(yup.string()).min(6).max(6).nullable(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    digit: ['', '', '', '', '', ''],
  },
});

const { value: digit } = useField<string[]>('digit');
const handleEvent = (index: number, event: KeyboardEvent) => {
  if (event.key == 'Backspace') {
    if (index > 0) {
      digit.value[index] = '';
      const input = document.getElementById(`digit${index}-input`);
      input?.focus();
    }
  }

  if (event.key == 'ArrowLeft') {
    if (index > 0) {
      const input = document.getElementById(`digit${index}-input`);
      input?.focus();
    }
    return;
  }

  if (event.key == 'ArrowRight') {
    if (index < 5) {
      const input = document.getElementById(`digit${index + 2}-input`);
      input?.focus();
    }
  }

  if (digit.value[index] != '' && digit.value[index + 1] == '') {
    const input = document.getElementById(`digit${index + 2}-input`);
    input?.focus();
  }

  if (digit.value[index] != '') {
    if (event.key >= '0' && event.key <= '9') {
      digit.value[index] = event.key;
    }
  }

};

const tryConfirm = async () => {
  try {
    if(digit.value.join('').length < 6) return Notify.error('Kode harus 6 digit');
    const code = digit.value.join('');
    document.getElementById("layer")?.classList.remove("d-none");
    const response = await axios.post(import.meta.env.VITE_API_SHRIMP + "/auth/verify", {
      email: email.value,
      verification_code: code,
    });
    document.getElementById("layer")?.classList.add("d-none");
    if (response.data.httpCode == 200) {
      localStorage.removeItem('email');
      Notify.success("Berhasil verifikasi");
      router.replace("/login");
    }
  } catch (error: any) {
    document.getElementById("layer")?.classList.add("d-none");
    Notify.error(error.response ? error.response.data.message : error.message);
  }
};

const resendCode = async () => {
  try {
    document.getElementById("layer")?.classList.remove("d-none");
    const response = await axios.post(import.meta.env.VITE_API_SHRIMP + "/auth/resend-verification-code", {
      email: email.value,
    });
    document.getElementById("layer")?.classList.add("d-none");

    if (response.data.httpCode == 200) {
      Notify.success("Berhasil mengirim ulang kode");
    }
  } catch (error: any) {
    document.getElementById("layer")?.classList.add("d-none");
    Notify.error(error.response ? error.response.data.message : error.message);
  }
}

</script>