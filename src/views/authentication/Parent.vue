<template>
  <div class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
    <div class="bg-overlay"></div>
    <div class="auth-page-content overflow-hidden pt-lg-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="card overflow-hidden">
              <div class="row g-0">
                <div class="col-lg-6 d-none d-md-block">
                  <div class="p-lg-5 p-4 auth-one-bg h-100">
                    <div class="bg-overlay"></div>
                    <div class="position-relative h-100 d-flex flex-column">
                      <div class="mb-4">
                        <div class="d-block">
                          <img src="/assets/images/logo.svg" alt="" height="100" />
                        </div>
                      </div>
                      <div class="mt-auto">
                        <div class="mb-3">
                          <i class="ri-double-quotes-l display-4 text-success"></i>
                        </div>

                        <div id="qoutescarouselIndicators" class="carousel slide" data-bs-ride="carousel">
                          <div class="carousel-indicators">
                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="0" class=""
                              aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="1"
                              aria-label="Slide 2" class="active" aria-current="true"></button>
                            <button type="button" data-bs-target="#qoutescarouselIndicators" data-bs-slide-to="2"
                              aria-label="Slide 3"></button>
                          </div>
                          <div class="carousel-inner text-center text-white-50 pb-5">
                            <div class="carousel-item">
                              <p class="fs-15 fst-italic">
                                " Udang adalah salah satu komoditas perikanan yang
                                memiliki nilai ekonomi tinggi. "
                              </p>
                            </div>
                            <div class="carousel-item active">
                              <p class="fs-15 fst-italic">
                                " Budidaya udang dapat dilakukan di lahan yang luas maupun
                                sempit. "
                              </p>
                            </div>
                            <div class="carousel-item">
                              <p class="fs-15 fst-italic">
                                " Gruvana adalah aplikasi yang dapat
                                membantu petani udang dalam mengelola usahanya. "
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer mb-3">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0">
                © 2023 Gruvana. Crafted with
                <i class="mdi mdi-heart text-danger"></i> by ProJs Universitas Madura
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>


