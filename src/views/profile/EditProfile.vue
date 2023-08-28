<template>
  <Parent>
    <Cover>
      <div class="overlay-content">
        <div class="text-end p-3">
          <div class="p-0 ms-auto rounded-circle profile-photo-edit">
            <input id="profile-foreground-img-file-input" type="file" class="profile-foreground-img-file-input">
            <label for="profile-foreground-img-file-input" class="profile-photo-edit btn btn-light">
              <i class="ri-image-edit-line align-bottom me-1"></i> Change Cover
            </label>
          </div>
        </div>
      </div>
    </Cover>
    <div class="row">
      <div class="col-xxl-3">
        <div class="card mt-n5">
          <div class="card-body p-4">
            <div class="text-center">
              <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                <img src="/assets/images/users/avatar-1.jpg"
                  class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image">
                <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                  <input id="profile-img-file-input" type="file" class="profile-img-file-input">
                  <label for="profile-img-file-input" class="profile-photo-edit avatar-xs">
                    <span class="avatar-title rounded-circle bg-light text-body">
                      <i class="ri-camera-fill"></i>
                    </span>
                  </label>
                </div>
              </div>
              <h5 class="fs-16 mb-1">Anna Adame</h5>
              <p class="text-muted mb-0">Peternak Udang</p>
            </div>
          </div>
        </div>
        <!--end card-->
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-5">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">Lengkapi Profile Anda</h5>
              </div>
            </div>
            <div class="progress animated-progress custom-progress progress-label">
              <div class="progress-bar bg-danger" role="progressbar" style="width: 30%" aria-valuenow="30"
                aria-valuemin="0" aria-valuemax="100">
                <div class="label">30%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
      <div class="col-xxl-9">
        <div class="card mt-xxl-n5">
          <div class="card-header">
            <ul class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab" aria-selected="true">
                  <i class="fas fa-home"></i> Biodata Pengguna
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
                          autocomplete="false">
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="email" class="form-label">Email: </label>
                        <input type="text" class="form-control" id="email" placeholder="Masukkan Email">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label for="phonenumberInput" class="form-label">Nomer Hp: </label>
                        <input type="text" class="form-control" id="phonenumberInput" placeholder="Maskkan Nomer Hp">
                      </div>
                    </div>
                    <!--end col-->
                    <div class="col-lg-6 mb-3">
                      <div class="form-label text-dark fw-medium">Jenis Kelamin: </div>
                      <div class="input-group">
                        <div class="mt-2">
                          <input class="form-check-input" type="radio" name="gender" id="male">
                          <label class="form-check-label ms-2" for="male"> Pria</label>
                        </div>
                        <div class="mt-2 mx-5 text-end">
                          <input class="form-check-input" type="radio" name="gender" id="female">
                          <label class="form-check-label ms-2" for="female"> Wanita</label>
                        </div>
                        <div class="mt-2 text-end">
                          <input class="form-check-input" type="radio" name="gender" id="other">
                          <label class="form-check-label ms-2" for="other"> Lainnya</label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="birth" class="form-label">Tanggal Lahir: </label>
                      <VueDatePicker auto-apply format="YYY/MM/DD"></VueDatePicker>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="date_joined" class="form-label">Tanggal Mendaftar: </label>
                      <VueDatePicker auto-apply format="YYY/MM/DD"></VueDatePicker>
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="address" class="form-label">Alamat: </label>
                      <input type="text" name="address" id="address" class="form-control">
                    </div>
                    <div class="col-lg-12">
                      <div class="hstack gap-2 justify-content-end">
                        <button type="submit" class="btn btn-primary">Updates</button>
                        <button type="button" class="btn btn-soft-success">Cancel</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
    </div>
  </Parent>
</template>

<script setup lang="ts">
import Parent from '../Parent.vue';
import Cover from './Cover.vue';
</script>