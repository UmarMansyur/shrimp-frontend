<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-0 placeholder rounded">Daftar Tambak</h4>
        </div>
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-md-3 mb-2">
              <div class="input-group">
                <label class="mt-2 me-2 placeholder rounded" id="button-addon1">Tampilkan: </label>
                <select name="limit" id="limit" class="form-select placeholder rounded">
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
                <label class="mt-2 me-2 placeholder rounded" id="button-addon1">Cari:</label>
                <input type="text" class="form-control placeholder rounded" name="search" id="search">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mt-4">
              <div class="table-responsive">
                <table class="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <td v-for="i in column">
                        <div class="d-grid placeholder rounded py-3 rounded">{{ i }}</div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="a in row">
                      <td v-for="i in column">
                        <div class="d-grid placeholder rounded py-2 rounded">{{ a}} {{ i }}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  column: number;
  row: number;

}>();
</script>