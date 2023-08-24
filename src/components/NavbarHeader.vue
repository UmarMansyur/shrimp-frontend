<template>
  <div class="navbar-header">
    <div class="d-flex">
      <button type="button" class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
        @click="toggleMenu()" id="topnav-hamburger-icon">
        <span class="hamburger-icon" v-if="!isSm">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span class="hamburger-icon open" v-else>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
    <div class="d-flex align-items-center">
      <div class="ms-1 header-item d-none d-sm-flex">
        <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" @click="makeFullScreen()"
          v-if="isFullScreen">
          <i class='bx bx-fullscreen fs-22'></i>
        </button>
        <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" @click="exitFullScreen()"
          v-else>
          <i class='bx bx-exit-fullscreen fs-22'></i>
        </button>
      </div>
      <div class="ms-1 header-item d-none d-sm-flex">
        <button type="button" class="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
          @click="handleTheme">
          <i class='bx bx-moon fs-22'></i>
        </button>
      </div>
      <div class="dropdown ms-sm-3 header-item topbar-user">
        <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
          aria-expanded="false">
          <span class="d-flex align-items-center">
            <img class="rounded-circle header-profile-user" src="/assets/images/users/avatar-1.jpg" alt="Header Avatar">
            <span class="text-start ms-xl-2">
              <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                Anna Adame</span>
              <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">Founder</span>
            </span>
          </span>
        </button>
        <div class="dropdown-menu dropdown-menu-end">
          <h6 class="dropdown-header">Welcome Anna!</h6>
          <RouterLink to="/profile" class="dropdown-item">
            <i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span class="align-middle">Profile</span>
          </RouterLink>
          <a class="dropdown-item" href="auth-logout-basic.html">
            <i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
            <span class="align-middle" data-key="t-logout">Logout</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {
  isSm,
  toggleMenu,
  isFullScreen,
  makeFullScreen,
  exitFullScreen,
  handleTheme
} from '../helpers/handleEvent.ts';
onMounted(() => {
  if (window.innerWidth < 794) {
    document.body.classList.add('twocolumn-panel');
    document.body.classList.remove('vertical-sidebar-enable');
  }
});

</script>