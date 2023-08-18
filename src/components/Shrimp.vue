<template>
  <div class="page-title-box">
    <div class="row justify-content-between align-items-center mt-3">
      <div class="col-md-3 col-6">
        <select name="ponds" id="ponds" class="form-select">
          <option value="1" selected>Tambak 1</option>
        </select>
      </div>
      <div class="col-md-6 d-none d-md-block"></div>
      <div class="col-md-3 col-6">
        <div class="row align-item-center">
          <label class="col-sm-3 col-form-label col-form-label d-none d-lg-block">Batch:</label>
          <div class="col-sm-9">
            <div class="input-group">
              <input type="datetime" class="form-control" aria-label="Recipient's username with two button addons">
              <button class="btn btn-primary" type="button"><i class="bx bx-calendar"></i></button>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row mt-2">
      <div class="col-12">
        <span>Rombasan Pragaan Sumenep</span> <a href="" class="text-info">Lihat Daftar kolam</a>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <button class="btn btn-outline-primary btn-sm me-2">
          <i class="ri-git-merge-line align-middle"></i> Anco
        </button>
        <button class="btn btn-outline-info btn-sm me-2">
          <i class="ri-water-flash-line"></i> Air
        </button>
        <button class="btn btn-outline-warning btn-sm me-2">
          <i class="ri-dropbox-fill"></i> Pakan
        </button>
        <button class="btn btn-outline-success btn-sm me-2">
          <i class="ri-temp-hot-line"></i> Kimia
        </button>
      </div>
    </div>
  </div>
</template>