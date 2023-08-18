<template>
  <div class="layout-wrapper">
    <header id="page-topbar">
      <div class="layout-width">
        <NavbarHeader />
      </div>
    </header>
    <div class="app-menu navbar-menu">
      <Brand />
      <SideBar />
    </div>
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <PageContent />
          <slot></slot>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Brand, Footer, NavbarHeader, PageContent, SideBar } from '../helpers/components';
</script>