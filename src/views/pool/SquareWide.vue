<template>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label for="pool_length" class="form-label">Panjang: </label>
      <div class="input-group">
        <input type="number" name="pool_length" id="pool_length" class="form-control" placeholder="0">
        <div class="input-group-text">m</div>
      </div>

    </div>
    <div class="col-md-4 mb-3">
      <label for="pool_width" class="form-label">Lebar: </label>
      <div class="input-group">
        <input type="number" name="pool_width" id="pool_width" class="form-control" placeholder="0">
        <div class="input-group-text">m</div>
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="pool_wide" class="form-label">Luas: </label>
      <div class="input-group">
        <input type="number" name="pool_wide" id="pool_wide" class="form-control" placeholder="m²" readonly>
        <div class="input-group-text">m</div>
      </div>
    </div>
  </div>
</template>