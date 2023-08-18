<template>
  <div class="row">
    <div class="col-xxl-12">
      <div class="card">
        <div class="card-body">
          <div class="row justify-content-end">
            <div class="col-md-3 col-xxl-2 my-2">
              <div class="input-group">
                <select name="kolam" id="kolam" class="form-select">
                  <option value="1">Kolam 1</option>
                  <option value="2">Kolam 2</option>
                  <option value="3">Kolam 3</option>
                  <option value="4">Kolam 4</option>
                  <option value="5">Kolam 5</option>
                </select>
                <button class="btn btn-primary btn-md">
                  <i class="ri-codepen-fill fs-5"></i>
                </button>
              </div>
            </div>
            <div class="col-md-5 col-xxl-7 my-2"></div>
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
            <div class="tab-pane" id="settings" role="tabpanel">
              <h6>Settings</h6>
              <p class="mb-0">
                Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                art party before they sold out master cleanse gluten-free squid
                scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                art party locavore wolf cliche high life echo park Austin. Cred
                vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                farm-to-table VHS.
              </p>
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