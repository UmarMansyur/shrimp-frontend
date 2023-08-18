<template>
  <div class="tab-pane active show" id="home" role="tabpanel">
    <h6 class="mb-0">Data Anco berikut adalah data hanco hari ini!</h6>
    <div class="row justify-content-between">
      <div class="col-xxl-2 col-md-3 border m-3 px-4 py-3">
        <div class="float-end">
          <button id="btnGroupVerticalDrop1" type="button" class="btn btn-waves btn-sm" data-bs-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <i class="ri-more-fill"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop1">
            <a class="dropdown-item" href="#">Edit</a>
            <a class="dropdown-item" href="#">Hapus</a>
          </div>
        </div>
        <h2 class="text-info">A1</h2>
        <div class="row text-dark">
          <div class="col-6 fw-bold">Waktu Mulai </div>
          <div class="col-6">: 09:00:00</div>
          <div class="col-6 fw-bold">Waktu Selesai </div>
          <div class="col-6">: 10:00:00</div>
          <div class="col-6 fw-bold">Durasi</div>
          <div class="col-6">: 60 Menit</div>
          <div class="col-6 fw-bold">Sisa</div>
          <div class="col-6">: Sisa banyak</div>
        </div>
      </div>
    </div>
  </div>
</template>