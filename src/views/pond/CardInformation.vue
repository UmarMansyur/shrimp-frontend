<template>
  <div class="row">
    <div class="col-xl-4 col-md-6">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 overflow-hidden">
              <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Jumlah Tambak</p>
            </div>
            <div class="flex-shrink-0">
              <h5 class="text-success fs-14 mb-0">
                {{ new Date().toLocaleTimeString() }}
              </h5>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span>30</span></h4>
              <span class="badge bg-success">{{ new Date().toDateString() }}</span>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-success-subtle rounded fs-3">
                <i class="ri-layout-line text-success"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-md-6">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 overflow-hidden">
              <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Jumlah Kolam</p>
            </div>
            <div class="flex-shrink-0">
              <h5 class="text-warning fs-14 mb-0">
                {{ new Date().toLocaleTimeString() }}
              </h5>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span>30</span> </h4>
              <span class="badge bg-warning">{{ new Date().toDateString() }}</span>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-warning-subtle rounded fs-3">
                <i class="ri-codepen-fill text-warning"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-4 col-md-6">
      <div class="card card-animate">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-grow-1 overflow-hidden">
              <p class="text-uppercase fw-medium text-muted text-truncate mb-0">Jumlah Anco</p>
            </div>
            <div class="flex-shrink-0">
              <h5 class="text-info fs-14 mb-0">
                {{ new Date().toLocaleTimeString() }}
              </h5>
            </div>
          </div>
          <div class="d-flex align-items-end justify-content-between mt-4">
            <div>
              <h4 class="fs-22 fw-semibold ff-secondary mb-4"><span>30</span> </h4>
              <span class="badge bg-info">{{ new Date().toDateString() }}</span>
            </div>
            <div class="avatar-sm flex-shrink-0">
              <span class="avatar-title bg-info-subtle rounded fs-3">
                <i class="ri-git-merge-line text-info"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>