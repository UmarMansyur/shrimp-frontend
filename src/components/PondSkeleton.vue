<template>
  <div class="row justify-content-center">
    <div class="col-xl-9">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-0 placeholder rounded">Form Tambah Tambak</h4>
        </div>
        <div class="card-body">
          <div class="row mb-5 text-center justify-content-center">
            <div class="col-3 placeholder py-3 rounded"></div>
            <div class="col-3 placeholder py-3 rounded mx-3"></div>
            <div class="col-3 placeholder py-3 rounded"></div>
          </div>

          <div class="row mb-4" v-for="i in 5" :key="i">
            <div class="col-md-3 col-6 py-2 rounded placeholder mx-3">
            </div>
            <div class="col-6 col-md-9"></div>
            <div class="col-8 col-md-11 placeholder py-3 rounded mt-2 mx-3">
            </div>
            <div class="col-md-1 col-4"></div>
          </div>
          <div class="row mb-4">
            <div class="col-md-3 col-6 py-2 rounded placeholder mx-3">
            </div>
            <div class="col-6 col-md-9"></div>
            <div class="col-8 col-md-11 placeholder rounded mt-2 mx-3">
            </div>
            <div class="col-md-1 col-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>