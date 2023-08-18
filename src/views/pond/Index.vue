<template>
  <Parent>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Daftar Tambak</h4>
          </div>
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-md-3 mb-2">
                <div class="input-group">
                  <label class="mt-2 me-2" id="button-addon1">Tampilkan: </label>
                  <select name="limit" id="limit" class="form-select">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30" selected>30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
              <div class="col-md-5 mb-2"></div>
              <div class="col-md-4 mb-2">
                <div class="input-group">
                  <label class="mt-2 me-2" id="button-addon1">Cari:</label>
                  <input type="text" class="form-control" name="search" id="search" placeholder="Masukkan kata kunci ...">
                  <button class="btn btn-primary" type="button" id="button-addon2">
                    <i class="bx bx-search"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mt-4">
                <div class="table-responsive">
                  <table class="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Nama Tambak</th>
                        <th scope="col">Tanggal Tebar</th>
                        <th scope="col">Jumlah Kolam</th>
                        <th scope="col">Kelompok</th>
                        <th scope="col" class="text-center">Undang</th>
                        <th scope="col" class="text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tambak Ninu</td>
                        <td>12/09/2023</td>
                        <td>5</td>
                        <td>1</td>
                        <td class="text-center">
                          <button class="btn btn-primary btn-sm">
                            <i class="bx bx-user-plus"></i>
                          </button>
                        </td>
                        <td class="text-center">
                          <button class="btn btn-info btn-sm mx-2">
                            <i class="bx bx-pencil"></i>
                          </button>
                          <button class="btn btn-danger btn-sm">
                            <i class="bx bx-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="row">
            <div class="col-md-6">
              Menampilkan 1 dari 10 data
            </div>
              <div class="col-md-6">
                <Pagination />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import Pagination from '../../components/Pagination.vue';
import Parent from '../Parent.vue';
</script>
