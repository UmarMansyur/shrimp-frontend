<template>
  <Parent>
    <div class="row">
      <div class="col-12">
        <div class="alert alert-primary">
          <p class="mb-0 text-center">
            Untuk mengetahui laporan, silahkan isi beberapa paramter wajib yang dibutuhkan oleh sistem. Parameter tersebut
            terdapat pada tombol filter dibagian pojok kanan atas tabel.
          </p>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-2">
        <select name="pool" id="pool" class="form-select">
          <option value="">Tambak 1</option>
        </select>
      </div>
      <div class="col-md-2">
        <select name="pool" id="pool" class="form-select">
          <option value="">Semua</option>
        </select>
      </div>
      <div class="col-md-2"></div>
      <div class="col-md-6 mb-3 text-end">
        <button class="btn waves btn-success"><i class="bx bx-download"></i></button>
        <button class="btn waves btn-warning mx-1"><i class="bx bx-printer"></i></button>
        <button class="btn waves btn-outline-primary"><i class="bx bx-filter"></i> Filter</button>
      </div>

      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive table-card">
              <table class="table align-middle table-bordeless table-centered table-nowrap mb-0 text-center">
                <thead class="text-dark table-primary">
                  <tr class="text-center align-middle">
                    <th rowspan="2">Tanggal</th>
                    <th rowspan="2">DOC</th>
                    <th rowspan="2">Nama Kolam</th>
                    <th colspan="5">Kualitas Air</th>
                    <th colspan="3">Anco</th>
                    <th rowspan="2">Pakan(Kg)</th>
                    <th colspan="4">Kimia</th>
                  </tr>
                  <tr>
                    <th>pH</th>
                    <th>Salinitas</th>
                    <th>Suhu</th>
                    <th>DO</th>
                    <th>Warna Air</th>
                    <th>Waktu Mulai</th>
                    <th>Durasi(Menit)</th>
                    <th>Status</th>
                    <th>Amonia</th>
                    <th>Nitrit</th>
                    <th>Nitrat</th>
                    <th>Alkalinitas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      23/08/2023
                    </td>
                    <td>
                      1
                    </td>
                    <td>Kolam A1</td>
                    <td>90</td>
                    <td>90</td>
                    <td>90</td>
                    <td>90</td>
                    <td>Merah Kecoklatan</td>
                    <td>07:00</td>
                    <td>60</td>
                    <td>Habis</td>
                    <td>90</td>
                    <td>90</td>
                    <td>90</td>
                    <td>90</td>
                    <td>90</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-12 float-end">
            <Pagination></Pagination>
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