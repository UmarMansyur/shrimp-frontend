<template>
  <div class="row">
    <div class="col-xxl-12">
      <div class="card">
        <div class="card-body">
          <div class="row justify-content-end">
            <div class="col-md-3 col-xxl-3 my-2">
              <div class="input-group">
                <select name="kolam" id="kolam" class="form-select">
                  <option value="1">Kolam 1</option>
                  <option value="2">Kolam 2</option>
                  <option value="3">Kolam 3</option>
                  <option value="4">Kolam 4</option>
                  <option value="5">Kolam 5</option>
                </select>
                <div class="input-group-text bg-primary border-primary text-white">
                  <i class="ri-codepen-fill"></i>
                </div>
              </div>
            </div>
            <div class="col-md-5 col-xxl-6 my-2"></div>
            <div class="col-md-4 col-xxl-3 my-2">
              <ul class="nav nav-tabs mb-3 justify-content-end" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" data-bs-toggle="tab" href="#home" role="tab" aria-selected="true">
                    Anco
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#product1" role="tab" aria-selected="false"
                    tabindex="-1">
                    Air
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#messages" role="tab" aria-selected="false"
                    tabindex="-1">
                    Pakan
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#settings" role="tab" aria-selected="false"
                    tabindex="-1">
                    Kimia
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- Tab panes -->
          <div class="tab-content text-muted overflow-hidden">
            <AncoInformation />
            <WaterQuality />
            <div class="tab-pane" id="messages" role="tabpanel">
              <h6>Pakan</h6>
              <div class="table-responsive">
                <table class="table table-hover table-bordered text-center">
                  <thead class="align-middle">
                    <tr>
                      <th scope="col" rowspan="2">Tanggal Tebar</th>
                      <th scope="col" rowspan="2">DOC</th>
                      <th scope="col" rowspan="2" class="text-start">Waktu</th>
                      <th scope="col" rowspan="2" style="width: 10%;">Jumlah(Kg)</th>
                      <th scope="col" rowspan="2">Catatan</th>
                      <th scope="col" colspan="2" rowspan="2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>asdf</td>
                      <td>2</td>
                      <td class="text-start">adf</td>
                      <td>adfadf</td>
                      <td>
                        <button class="btn btn-primary btn-sm">
                          <i class="bx bx-message"></i> Lihat
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-info btn-sm">
                          <i class="bx bx-pencil"></i> Edit
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-danger btn-sm">
                          <i class="bx bx-trash"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane" id="settings" role="tabpanel">
              <h6>Kimia</h6>
              <div class="table-responsive">
                <table class="table table-hover table-borderless table-striped text-center text-dark">
                  <thead class="align-middle">
                    <tr>
                      <th scope="col" rowspan="2" class="text-start">Tanggal Tebar</th>
                      <th scope="col" rowspan="2">DOC</th>
                      <th scope="col" rowspan="2" class="text-start">Waktu</th>
                      <th scope="col" colspan="4" class="text-center">Parameter</th>
                      <th scope="col" rowspan="2">Aksi</th>
                    </tr>
                    <tr>
                      <th scope="col">Amonia</th>
                      <th scope="col">Nitrit</th>
                      <th scope="col">Nitrat</th>
                      <th scope="col">Alkalinitas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-start">asdf</td>
                      <td>2</td>
                      <td class="text-start">adf</td>
                      <td>adfadf</td>
                      <td>
                        <button class="btn btn-primary btn-sm">
                          <i class="bx bx-message"></i> Catatan
                        </button>
                      </td>
                      <td>adf
                      </td>
                      <td>asdf</td>
                      <td>
                        <button class="btn btn-info btn-sm mx-2">
                          <i class="bx bx-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm">
                          <i class="bx bx-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div><!-- end card-body -->
      </div><!-- end card -->
    </div>
  </div>
</template>


<script setup lang="ts">
import AncoInformation from "./AncoInformation.vue";
import WaterQuality from "./WaterQuality.vue";
</script>