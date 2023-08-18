<template>
  <div class="tab-pane" id="product1" role="tabpanel">
    <h6>Kualitas Air</h6>
    <div class="row">
      <div class="col-md-12">
        <ChartWater/>
      </div>
      <div class="col-md-12 mt-5 text-dark">
        <div class="table-responsive">
          <table class="table table-hover table-bordered text-center">
            <thead class="align-middle">
              <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">pH</th>
                <th rowspan="2">Salinitas</th>
                <th rowspan="2">Suhu</th>
                <th rowspan="2">DO</th>
                <th rowspan="2">Warna Air</th>
                <th colspan="2">Aksi</th>
              </tr>
              <tr>
                <th>Edit</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>12</td>
                <td>12</td>
                <td>12</td>
                <td>12</td>
                <td>12</td>
                <td>
                  <button class="btn btn-info btn-sm">
                    <i class="bx bx-pencil"></i>
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger btn-sm">
                    <i class="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav aria-label="..." class="float-end">
          <ul class="pagination pagination-sm">
            <li class="page-item disabled">
              <span class="page-link"><i class="mdi mdi-chevron-left"></i></span>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active">
              <span class="page-link">
                2
                <span class="sr-only">(current)</span>
              </span>
            </li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#"><i class="mdi mdi-chevron-right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import ChartWater from "./ChartWater.vue";
</script>
