<template>
  <div class="row">
    <div class="col-md-4 mb-3">
      <label for="diameter" class="form-label">Diameter: </label>
      <div class="input-group">
        <input type="number" name="diameter" id="diameter" class="form-control" placeholder="0">
        <div class="input-group-text">m</div>
      </div>

    </div>
    <div class="col-md-4 mb-3">
      <label for="pool_height" class="form-label">Kedalaman: </label>
      <div class="input-group">
        <input type="number" name="pool_height" id="pool_height" class="form-control" placeholder="0">
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