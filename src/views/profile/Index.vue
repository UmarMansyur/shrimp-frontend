<template>
  <Parent>
    <div class="profile-foreground position-relative mx-n4 mt-n4">
      <div class="profile-wid-bg">
        <img src="/assets/images/profile-bg.jpg" alt="" class="profile-wid-img">
      </div>
    </div>
    <div class="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
      <div class="row g-4">
        <div class="col-auto">
          <div class="avatar-xl">
            <img :src="user.thumbnail" alt="user-img" class="rounded-circle avatar-xl img-thumbnail user-profile-image">
          </div>
        </div>
        <!--end col-->
        <div class="col">
          <div class="p-2">
            <h3 class="text-white mb-1">{{ user.name }}</h3>
            <p class="text-white text-opacity-75">{{ user.role }}</p>
            <div class="hstack text-white-50 gap-1">
              <div class="me-2"><i
                  class="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>{{ user.address }}</div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div>
          <div class="d-flex profile-wrapper">
            <!-- Nav tabs -->
            <ul class="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab" role="tab"
                  aria-selected="true">
                  <i class="ri-airplay-fill d-inline-block d-md-none"></i> <span
                    class="d-none d-md-inline-block">Biodata</span>
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link fs-14" data-bs-toggle="tab" href="#activities" role="tab" aria-selected="false"
                  tabindex="-1">
                  <i class="ri-list-unordered d-inline-block d-md-none"></i> <span
                    class="d-none d-md-inline-block">Akun</span>
                </a>
              </li>
            </ul>
            <div class="flex-shrink-0">
              <RouterLink to="/profile/edit" class="btn btn-success"><i class="ri-edit-box-line align-bottom"></i>
                Edit Profile</RouterLink>
            </div>
          </div>
          <!-- Tab panes -->
          <div class="tab-content pt-4 text-muted">
            <div class="tab-pane active show" id="overview-tab" role="tabpanel">
              <div class="row">
                <div class="col-xxl-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title mb-5">Lengkapi Profil Anda</h5>
                      <div class="progress animated-progress custom-progress progress-label">
                        <div class="progress-bar bg-danger" role="progressbar" :style="
                          'width: ' + user.prosentase + '%'
                        "
                           aria-valuenow="30"
                          aria-valuemin="0" aria-valuemax="100">
                          <div class="label">{{ user.prosentase }}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title mb-3">Informasi Pengguna: </h5>
                      <div class="table-responsive">
                        <table class="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <th class="ps-0" scope="row">Nama Lengkap :</th>
                              <td class="text-muted">{{ user.name }}</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">Jenis Kelamin :</th>
                              <td class="text-muted" style="text-transform: capitalize;">{{ user.gender }}</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">Tanggal Lahir:</th>
                              <td class="text-muted">{{ user.birthday }}</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">No.Hp :</th>
                              <td class="text-muted">{{ user.phone ? user.phone : '-' }}</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">E-mail :</th>
                              <td class="text-muted">{{ user.email }}</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">Alamat :</th>
                              <td class="text-muted">{{ user.address }}
                              </td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">Tanggal Mendaftar :</th>
                              <td class="text-muted">{{ user.createdAt ? user.createdAt.slice(0, 10) : '-' }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div><!-- end card body -->
                  </div><!-- end card -->
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="activities" role="tabpanel">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title mb-3">Akun</h5>
                  <div class="row">
                    <div class="col-md-12 mb-3">
                      <label for="email" class="form-label">Email: </label>
                      <input type="search" id="email" name="email" class="form-control" readonly autocomplete="false" :value="user.email">
                    </div>
                    <div class="col-md-12 mb-3">
                      <label for="username" class="form-label">Username: </label>
                      <input type="search" id="username" name="username" class="form-control" readonly autocomplete="false" :value="user.name">
                    </div>
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

<script setup lang="ts">
import { useSessionStore } from '../../stores/session';
import Parent from '../Parent.vue';
const user = useSessionStore();
</script>