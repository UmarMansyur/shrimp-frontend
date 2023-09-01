<template>
  <div class="row">
    <div class="col-xxl-12">
      <div class="card">
        <div class="card-body">
          <div class="row justify-content-end">
            <div class="col-md-3 col-xxl-3 my-2">
              <div class="input-group">
                <Pool></Pool>
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
            <FeedInformation />
            <KimiaInformation />
          </div>
        </div><!-- end card-body -->
      </div><!-- end card -->
    </div>
  </div>
</template>


<script setup lang="ts">
import Pool from "../../components/Pool.vue";
import AncoInformation from "./AncoInformation.vue";
import FeedInformation from "./FeedInformation.vue";
import KimiaInformation from "./KimiaInformation.vue";
import WaterQuality from "./WaterQuality.vue";
</script>