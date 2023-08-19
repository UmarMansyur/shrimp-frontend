<template>
  <Parent>
    <div class="row justify-content-center">
      <div class="col-xl-9">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Form Tambah Tambak</h4>
          </div>
          <div class="card-body">
            <form action="#" class="form-steps" autocomplete="off">
              <div class="step-arrow-nav mb-4">

                <ul class="nav nav-pills custom-nav nav-justified" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="steparrow-gen-info-tab" type="button" role="tab" aria-controls="steparrow-gen-info"
                      aria-selected="true" data-position="0">Langkah 1</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="steparrow-description-info-tab" type="button" role="tab"
                      aria-controls="steparrow-description-info" aria-selected="false" data-position="1"
                      tabindex="-1">Langkah 2</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-experience-tab" type="button" role="tab" aria-controls="pills-experience"
                      aria-selected="false" data-position="2" tabindex="-1">Selesai</button>
                  </li>
                </ul>
              </div>

              <div class="tab-content">
                <div class="tab-pane fade active show" data-position="0" id="steparrow-gen-info" role="tabpanel"
                  aria-labelledby="steparrow-gen-info-tab">
                  <div>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="mb-3">
                          <label class="form-label" for="pond_name">Nama Tambak</label>
                          <input type="text" class="form-control" id="pond_name"
                            placeholder="Masukkan Nama Tambak">
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="mb-3">
                          <label class="form-label" for="provinsi">Provinsi: </label>
                          <select name="provinsi" id="provinsi" class="form-select" placeholder=""></select>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="mb-3">
                          <label class="form-label" for="kabupaten">Kabupaten: </label>
                          <select name="provinsi" id="kabupaten" class="form-select"></select>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="mb-3">
                          <label class="form-label" for="kecamatan">Kecamatan: </label>
                          <select name="provinsi" id="kecamatan" class="form-select"></select>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="mb-3">
                          <label class="form-label" for="kelurahan">Kelurahan: </label>
                          <select name="kelurahan" id="kelurahan" class="form-select"></select>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <label class="form-label" for="address">Alamat Lengkap: </label>

                        <textarea class="form-control" placeholder="Enter Description" id="address"
                          rows="3"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-start gap-3 mt-4">
                    <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                      data-nexttab="steparrow-description-info-tab" @click="next()"><i
                        class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go to more info</button>
                  </div>
                </div>

                <div class="tab-pane fade" data-position="1" id="steparrow-description-info" role="tabpanel"
                  aria-labelledby="steparrow-description-info-tab">
                  <div>
                    <div class="mb-3">
                      <label for="formFile" class="form-label">Upload Image</label>
                      <input class="form-control" type="file" id="formFile">
                    </div>
                    <div>
                      <label class="form-label" for="des-info-description-input">Description</label>
                      <textarea class="form-control" placeholder="Enter Description" id="des-info-description-input"
                        rows="3"></textarea>
                      <div class="invalid-feedback">Please enter a description</div>
                    </div>
                  </div>
                  <div class="d-flex align-items-start gap-3 mt-4">
                    <button type="button" class="btn btn-light btn-label previestab"
                      data-previous="steparrow-gen-info-tab" @click="prev()"><i
                        class="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i> Back to General</button>
                    <button type="button" class="btn btn-success btn-label right ms-auto nexttab nexttab"
                      data-nexttab="pills-experience-tab" @click="next()"><i
                        class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Submit</button>
                  </div>
                </div>

                <div class="tab-pane fade" data-position="2" id="pills-experience" role="tabpanel" aria-labelledby="pills-experience-tab">
                  <div class="text-center">

                    <div class="avatar-md mt-5 mb-4 mx-auto">
                      <div class="avatar-title bg-light text-success display-4 rounded-circle">
                        <i class="ri-checkbox-circle-fill"></i>
                      </div>
                    </div>
                    <h5>Well Done !</h5>
                    <p class="text-muted">You have Successfully Signed Up</p>
                    <RouterLink to="/dashboard" class="btn btn-primary">
                      Back To Main Menu
                    </RouterLink>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script lang="ts">

</script>

<script setup lang="ts">
import Parent from '../Parent.vue';
import { onMounted } from 'vue';
onMounted(() => {
  // formWizard();
})

const next = () => {
  const tabActive:any = document.querySelector('button.nav-link.active');
  const tabActivePosition = tabActive.getAttribute('data-position');
  const nextTabPosition = parseInt(tabActivePosition) + 1;
  const nextTab:any = document.querySelector(`button[data-position="${nextTabPosition}"]`);
  tabActive.classList.remove('active');
  tabActive.classList.add('done');
  tabActive.setAttribute('aria-selected', 'false');
  tabActive.setAttribute('tabindex', '-1');
  nextTab.classList.add('active');
  nextTab.setAttribute('aria-selected', 'true');
  nextTab.setAttribute('tabindex', '0');

  const tabContentActive:any = document.querySelector('.tab-pane.fade.active.show');
  const nextTabContentPosition:any = document.querySelector(`.tab-pane.fade[data-position="${nextTabPosition}"]`);
  tabContentActive.classList.remove('active');
  tabContentActive.classList.remove('show');
  tabContentActive.classList.add('done');
  tabContentActive.setAttribute('aria-selected', 'false');
  tabContentActive.setAttribute('tabindex', '-1');
  nextTabContentPosition.classList.add('active');
  nextTabContentPosition.classList.add('show');
  nextTabContentPosition.setAttribute('aria-selected', 'true');
  nextTabContentPosition.setAttribute('tabindex', '0');
}

const prev = () => {
  const tabActive:any = document.querySelector('button.nav-link.active');
  const tabActivePosition = parseInt(tabActive.getAttribute('data-position'));
  const prevTabPosition = tabActivePosition - 1;
  const prevTab:any = document.querySelector(`button[data-position="${prevTabPosition}"]`);

  tabActive.classList.remove('active');
  tabActive.classList.remove('done');
  tabActive.setAttribute('aria-selected', 'false');
  tabActive.setAttribute('tabindex', '-1');

  prevTab.classList.add('active');
  prevTab.setAttribute('aria-selected', 'true');
  prevTab.setAttribute('tabindex', '0');

  const tabContentActive:any = document.querySelector('.tab-pane.fade.active.show');
  const prevTabContentPosition:any = document.querySelector(`.tab-pane.fade[data-position="${prevTabPosition}"]`);

  tabContentActive.classList.remove('active', 'show');
  tabContentActive.classList.remove('done');
  tabContentActive.setAttribute('aria-selected', 'false');
  tabContentActive.setAttribute('tabindex', '-1');

  prevTabContentPosition.classList.add('active', 'show');
  prevTabContentPosition.setAttribute('aria-selected', 'true');
  prevTabContentPosition.setAttribute('tabindex', '0');
};
</script>