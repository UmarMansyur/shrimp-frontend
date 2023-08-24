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
          <div class="avatar-lg">
            <img src="assets/images/users/avatar-1.jpg" alt="user-img" class="img-thumbnail rounded-circle">
          </div>
        </div>
        <!--end col-->
        <div class="col">
          <div class="p-2">
            <h3 class="text-white mb-1">Anna Adame</h3>
            <p class="text-white text-opacity-75">Owner &amp; Founder</p>
            <div class="hstack text-white-50 gap-1">
              <div class="me-2"><i
                  class="ri-map-pin-user-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>California, United
                States</div>
              <div>
                <i class="ri-building-line me-1 text-white text-opacity-75 fs-16 align-middle"></i>Themesbrand
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
              <a href="pages-profile-settings.html" class="btn btn-success"><i class="ri-edit-box-line align-bottom"></i>
                Edit Profile</a>
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
                        <div class="progress-bar bg-danger" role="progressbar" style="width: 30%" aria-valuenow="30"
                          aria-valuemin="0" aria-valuemax="100">
                          <div class="label">30%</div>
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
                              <td class="text-muted">Anna Adame</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">Jenis Kelamin :</th>
                              <td class="text-muted">Pria</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">No.Hp :</th>
                              <td class="text-muted">+(1) 987 6543</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">E-mail :</th>
                              <td class="text-muted">daveadame@velzon.com</td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">Alamat :</th>
                              <td class="text-muted">California, United States
                              </td>
                            </tr>
                            <tr>
                              <th class="ps-0" scope="row">Tanggal Mendaftar :</th>
                              <td class="text-muted">24 Nov 2021</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div><!-- end card body -->
                  </div><!-- end card -->
                </div>
              </div>
              <!--end row-->
            </div>
            <div class="tab-pane fade" id="activities" role="tabpanel">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title mb-3">Activities</h5>
                
                </div>
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
</script>