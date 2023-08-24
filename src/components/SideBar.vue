<template>
  <div id="scrollbar">
    <div class="container-fluid">
      <ul class="navbar-nav" id="navbar-nav">
        <li class="menu-title"><span data-key="t-menu">Menu</span></li>
        <li class="nav-item">
          <RouterLink to="/" class="nav-link menu-link" :class="{ 'active': $route.path == '/' }">
            <i class="ri-home-4-line"></i> <span data-key="t-dashboards">Beranda</span>
          </RouterLink>
        </li>
        <li class="menu-title"><span data-key="t-menu">Budidaya</span></li>

        <li class="nav-item">
          <a class="nav-link menu-link collapsed" :class="{ 'active': $route.path.includes('pond') }" href="#sidebarTables" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarTables">
            <i class="ri-layout-grid-line"></i> <span data-key="t-tables">Tambak</span>
          </a>
          <div class="menu-dropdown collapse" :class="{ 'show': $route.path.includes('pond') }" id="sidebarTables">
            <ul class="nav nav-sm flex-column">
              <li class="nav-item">
                <RouterLink to="/pond" class="nav-link menu-link" :class="{ 'active': $route.path == ('/pond') }">
                  <span data-key="t-ponds">Daftar Tambak</span>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/pond/create" class="nav-link" data-key="t-basic-tables" :class="{ 'active': $route.path == ('/pond/create') }">Tambah Tambak</RouterLink>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-item">
          <RouterLink to="/pool" class="nav-link menu-link" :class="{ 'active': $route.path.includes('pool') }">
            <i class="ri-codepen-fill"></i> <span data-key="t-ponds">Data Kolam</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/monitoring" class="nav-link menu-link" :class="{ 'active': $route.path.includes('/monitoring') }">
            <i class="ri-slideshow-line"></i> <span data-key="t-ponds">Monitoring <sup><i class="ri-magic-line text-warning" style="font-size: 14px;"></i></sup></span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/report" class="nav-link menu-link" :class="{ 'active': $route.path.includes('/report') }">
            <i class="ri-survey-line"></i> <span data-key="t-ponds">Laporan</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/group" class="nav-link menu-link" :class="{ 'active': $route.path.includes('/group') }">
            <i class="ri-links-fill"></i> <span data-key="t-ponds">Data Kelompok</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>