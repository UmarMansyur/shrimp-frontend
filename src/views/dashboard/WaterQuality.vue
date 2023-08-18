<template>
  <div class="tab-pane" id="product1" role="tabpanel">
    <h6>Kualitas Air</h6>
    <div class="row">
      <div class="col-md-12">
        <ChartWater/>
      </div>
      <div class="col-md-12 mt-5 text-dark">
        <div class="table-responsive">
          <table class="table table-hover table-bordered text-center" aria-describedby="water-quality">
            <thead class="align-middle">
              <tr>
                <th  scope="col" rowspan="2" >No</th>
                <th  scope="col" rowspan="2">pH</th>
                <th  scope="col" rowspan="2">Salinitas</th>
                <th  scope="col" rowspan="2">Suhu</th>
                <th  scope="col" rowspan="2">DO</th>
                <th  scope="col" rowspan="2">Warna Air</th>
                <th scope="col" colspan="2">Aksi</th>
              </tr>
              <tr>
                <th scope="col">Edit</th>
                <th scope="col">Hapus</th>
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
        <Pagination/>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import Pagination from "../../components/Pagination.vue";
import ChartWater from "./ChartWater.vue";
</script>
