<template>
  <Parent>
    <Cover>
      <div class="overlay-content">
        <div class="text-end p-3">
          <div class="p-0 ms-auto rounded-circle profile-photo-edit">
            <input id="profile-foreground-img-file-input" type="file" class="profile-foreground-img-file-input"
              accept="image/*">
            <label for="profile-foreground-img-file-input" class="profile-photo-edit btn btn-light">
              <i class="ri-image-edit-line align-bottom me-1"></i> Change Cover
            </label>
          </div>
        </div>
      </div>
    </Cover>
    <div class="row">
      <div class="col-12">
        <button class="d-none" id="btn-cropper" data-bs-toggle="modal" data-bs-target="#thumbnail-img-input"></button>
        <Modal modal-id="thumbnail-img-input" modal="modal-lg" title="Crop Image">
          <div class="row d-grid justify-content-center overflow-hidden">
            <div class="col-12 text-center">
              <div class="img-container">
                <img src="" alt="" id="profile-img-file-input-cropper" class="img-fluid">
              </div>
            </div>
            <div class="col-12 text-center mt-3">
              <button class="btn btn-primary" id="btn-crop" data-bs-dismiss="modal">
                <i class="ri-image-edit-line align-bottom me-1"></i> Crop
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div class="col-xxl-3">
        <div class="card mt-n5">
          <div class="card-body p-4">
            <div class="text-center">
              <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                <img :src="user.thumbnail" class="rounded-circle avatar-xl img-thumbnail user-profile-image"
                  alt="user-profile-image">
                <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                  <input id="profile-img-file-input" type="file" class="profile-img-file-input" @change="getThumbnail" accept="image/*" ref="profileUpload" @click="resetThumbnail">
                  <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                    <span class="avatar-title rounded-circle bg-light text-body">
                      <i class="ri-camera-fill"></i>
                    </span>
                  </label>
                </div>
              </div>
              <h5 class="fs-16 mb-1">{{ user.name }}</h5>
              <p class="text-muted mb-0">{{ user.role }}</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-5">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">Lengkapi Profile Anda</h5>
              </div>
            </div>
            <div class="progress animated-progress custom-progress progress-label">
              <div class="progress-bar bg-danger" role="progressbar" :style="`width: ${user.prosentase}%`"
                :aria-valuenow="user.prosentase" aria-valuemin="0" aria-valuemax="100">
                <div class="label">{{ user.prosentase }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xxl-9">
        <div class="card mt-xxl-n5">
          <div class="card-header">
            <ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab" aria-selected="true">
                  <i class="fas fa-home"></i> Biodata Pengguna
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" data-bs-toggle="tab" href="#account" role="tab" aria-selected="true">
                  <i class="fas fa-home"></i> Akun
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body p-4">
            <div class="tab-content">
              <div class="tab-pane active show" id="personalDetails" role="tabpanel">
                <form action="javascript:void(0);">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="fullname" class="form-label">Nama Lengkap: </label>
                        <input type="text" class="form-control" id="fullname" placeholder="Masukkan Nama Lengkap"
                          v-model="username" :class="{ 'is-invalid': !meta_username.valid && meta_username.dirty }"
                          autocomplete="false">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="email" class="form-label">Email: </label>
                        <input type="text" class="form-control" v-model="email" id="email"
                          :class="{ 'is-invalid': !meta_email.valid && meta_email.dirty }" placeholder="Masukkan Email">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="phonenumberInput" class="form-label">Nomer Hp: </label>
                        <input type="text" class="form-control" id="phonenumberInput" v-model="phone"
                          :class="{ 'is-invalid': !meta_phone.valid && meta_phone.dirty }"
                          placeholder="Maskkan Nomer Hp">
                      </div>
                    </div>
                    <div class="col-lg-6 mb-3">
                      <div class="form-label text-dark fw-medium">Jenis Kelamin: </div>
                      <div class="input-group">
                        <div class="mt-2">
                          <input class="form-check-input" v-model="gender" type="radio" value="male" name="gender"
                            id="male">
                          <label class="form-check-label ms-2" for="male"> Pria</label>
                        </div>
                        <div class="mt-2 mx-5 text-end">
                          <input class="form-check-input" v-model="gender" value="female" type="radio" name="gender"
                            id="female">
                          <label class="form-check-label ms-2" for="female"> Wanita</label>
                        </div>
                        <div class="mt-2 text-end">
                          <input class="form-check-input" value="other" type="radio" name="gender" id="other" v-model="gender">
                          <label class="form-check-label ms-2" for="other"> Lainnya</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="birth" class="form-label">Tanggal Lahir: </label>
                      <VueDatePicker auto-apply v-model="birthday"
                        :class="{ 'is-invalid': !meta_birthday.valid && meta_birthday.dirty }" format="yyy-MM-dd">
                      </VueDatePicker>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="role" class="form-label">Jabatan: </label>
                      <select id="role" name="role" disabled v-model="user.role" aria-readonly="true" class="form-select">
                        <option disabled value="">Pilih Jabatan</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Shrimp Farmer">Shrimp Farmer</option>
                      </select>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="address" class="form-label">Alamat: </label>
                      <textarea type="text" name="address" id="address" class="form-control" rows="10"
                        placeholder="Masukkan Alamat" v-model="address"
                        :class="{ 'is-invalid': !meta_address.valid && meta_address.dirty }"></textarea>
                    </div>
                    <div class="col-lg-12">
                      <div class="hstack gap-2 justify-content-end">
                        <button type="submit" class="btn btn-primary" :disabled="!meta.valid" @click="save"><i class="bx bx-send"></i> Simpan</button>
                        <RouterLink to="/profile" type="button" class="btn btn-outline-danger">Batal</RouterLink>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="tab-pane" id="account" role="tabpanel">
                <div class="row">
                  <div class="col-12">
                    <div class="alert bg-primary text-white">
                      Perubahan akun akan berpengaruh pada akun anda saat ini. Pastikan untuk memasukkan password yang benar. Jika anda lupa password, silahkan klik <a href="#" class="text-white">disini</a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-12">
                        <div class="mb-3">
                          <label for="old_password" class="form-label">Password Sebelumnya: </label>
                          <input type="password" class="form-control" id="old_password" placeholder="Masukkan Password"
                            autocomplete="false" v-model="old_password" :class="{ 'is-invalid': !meta_old_password.valid && meta_old_password.dirty }">
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label for="password" class="form-label">Password Baru: </label>
                          <input type="password" class="form-control" id="password" placeholder="Masukkan Password"
                            autocomplete="false" v-model="password" :class="{ 'is-invalid': !meta_password_err.valid && meta_password_err.dirty }">
                        </div>
                        <div class="mb-3">
                          <label for="password_confirmation" class="form-label">Konfirmasi Password Baru: </label>
                          <input type="password" class="form-control" id="password_confirmation" placeholder="Masukkan Password"
                            autocomplete="false" v-model="password_confirmation" :class="{ 'is-invalid': !meta_password_confirmation.valid && meta_password_confirmation.dirty }">
                        </div>
                        <div class="mt-4 text-center">
                          <button type="submit" class="btn btn-primary" :disabled="!meta_password.valid" @click="changePassword"><i class="bx bx-send"></i> Simpan</button>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                  <div class="col-md-6 text-end">
                    <img src="/assets/images/user_account.svg" alt="reset-img" class="img-fluid" width="400">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script lang="ts">
declare const Cropper: any;
</script>

<script setup lang="ts">
import Parent from '../Parent.vue';
import Cover from './Cover.vue';
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { onMounted, ref } from 'vue';
import useApi from '../../composables/api';
import { useSessionStore } from '../../stores/session';
import Modal from '../../components/Modal.vue';
import Notify from '../../helpers/notify';
const cropper = ref<any>(null);


const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  gender: yup.string().required(),
  birthday: yup.date().required(),
  address: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    username: '',
    email: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
  }
});

const { value: username, meta: meta_username } = useField<string>('username');
const { value: email, meta: meta_email } = useField<string>('email');
const { value: phone, meta: meta_phone } = useField<string>('phone');
const { value: gender } = useField<string>('gender');
const { value: birthday, meta: meta_birthday } = useField<Date>('birthday');
const { value: address, meta: meta_address } = useField<string>('address');

const { meta: meta_password } = useForm({
  validationSchema: yup.object().shape({
    old_password: yup.string().min(3).max(10).required(),
    password: yup.string().min(3).max(10).required(),
    password_confirmation: yup.string().min(3).max(10).required(),
  }),
  initialValues: {
    old_password: '',
    password: '',
    password_confirmation: '',
  }
});

const { value: old_password, meta: meta_old_password } = useField<string>('old_password');
const { value: password, meta: meta_password_err } = useField<string>('password');
const { value: password_confirmation, meta: meta_password_confirmation } = useField<string>('password_confirmation');

onMounted(() => {
  loadData();
});

const { getResource, postResourceFile, putResource } = useApi();
const user = useSessionStore();
const loadData = async () => {
  const response = await getResource('/user/' + user.id);
  if (response) {
    username.value = response.data.username;
    email.value = response.data.email;
    phone.value = response.data.phone;
    gender.value = response.data.gender;
    birthday.value = response.data.birthday;
    address.value = response.data.address;
  }
};

const thumbnail = ref<any>(null);

const getThumbnail = async (e: any) => {
  if (e.target.files.length === 0) {
    return;
  };
  thumbnail.value = e.target.files[0];
  const el = document.getElementById('profile-img-file-input-cropper');
  // paksa gambar cropper ke tengah
  const width = window.innerWidth;
  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  let minContainerHeight = width;
  let minContainerWidth = width;
  if (width > 798) {
    minContainerHeight = width / 2.2;
    minContainerWidth = width / 2.2;
  } else {
    minContainerHeight = width / 1.2;
    minContainerWidth = width / 1.2;
  }

  reader.onload = async () => {
    if (el) {
      el.setAttribute('src', reader.result as string);
      const btn = document.getElementById('btn-cropper');
      if (btn) {
        btn.click();
        await checkCropper();
        cropper.value = new Cropper(el, {
          aspectRatio: 1,
          viewMode: 1,
          dragMode: 'move',
          background: false,
          restore: false,
          guides: false,
          center: true,
          highlight: false,
          zoomable: false,
          minContainerWidth,
          minContainerHeight,
        });

        const btnCrop = document.getElementById('btn-crop');
        btnCrop?.addEventListener('click', async () => {
          const canvas = (el as any).cropper.getCroppedCanvas({
            width: 200,
            height: 200,
          });
          const dataURL = canvas.toDataURL('image/jpeg');
          const binaryImage = await fetch(dataURL).then((res) => res.blob() as any);
          const response = await postResourceFile('user/thumbnail/'+user.id, 'POST', {
            thumbnail: binaryImage,
          });
          if (response) {
            user.thumbnail = dataURL;
            const btnClose = document.getElementById('btn-close');
            btnClose?.click();
          }
        });
      }
    }
  };
};

async function checkCropper() {
  if (cropper.value != null) {
    cropper.value.destroy();
  }
}

const profileUpload = ref();
const resetThumbnail = () => {
  profileUpload.value.value = '';
}

const save = async () => {
  const data = {
    username: username.value,
    email: email.value,
    phone: phone.value,
    gender: gender.value,
    birthday: typeof birthday.value === 'string' ? birthday.value : birthday.value.toISOString().split('T')[0],
    address: address.value,
  }
  const response = await putResource('/user/' + user.id, data);
  if(response) {
    Notify.success('Berhasil mengubah data');
    await loadData();
  }
}

const changePassword = async () => {
  const data = {
    old_password: old_password.value,
    password: password.value,
  }
  if(password.value !== password_confirmation.value) {
    Notify.error('Password tidak sama');
    return;
  }
  const response = await putResource('/user/change-password/' + user.id, data);
  if(response) {
    Notify.success('Berhasil mengubah password');
    await loadData();
  }
}

</script>
