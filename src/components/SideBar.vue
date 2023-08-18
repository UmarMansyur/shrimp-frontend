<template>
  <div id="scrollbar">
    <div class="container-fluid">
      <div id="two-column-menu">
      </div>
      <ul class="navbar-nav" id="navbar-nav">
        <li class="menu-title"><span data-key="t-menu">Menu</span></li>
        <li class="nav-item">
          <RouterLink to="/dashboard" class="nav-link menu-link" :class="{'active': $route.path.includes('dashboard')}">
            <i class="ri-home-4-line"></i> <span data-key="t-dashboards">Beranda</span>
          </RouterLink>
        </li>
        <li class="menu-title"><span data-key="t-menu">Budidaya</span></li>

        <li class="nav-item">
          <RouterLink to="/tambak" class="nav-link menu-link" :class="{'active': $route.path.includes('tambak')}">
            <i class="ri-layout-line"></i> <span data-key="t-ponds">Tambak</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/tambak" class="nav-link menu-link" :class="{'active': $route.path.includes('tambak')}">
            <i class="ri-codepen-fill"></i> <span data-key="t-ponds">Data Kolam</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/tambak" class="nav-link menu-link" :class="{'active': $route.path.includes('tambak')}">
            <i class="ri-file-copy-2-line"></i> <span data-key="t-ponds">Laporan</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/tambak" class="nav-link menu-link" :class="{'active': $route.path.includes('tambak')}">
            <i class="ri-links-fill"></i> <span data-key="t-ponds">Data Kelompok</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>