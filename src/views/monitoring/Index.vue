<template>
  <Parent>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            Monitoring Alat
          </div>
          <div class="card-body">
            
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import Parent from '../Parent.vue';
import * as mqtt from 'mqtt/dist/mqtt.min';
import Sweet from '../../helpers/sweetalert2';

const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

onMounted(() => {
  client.on('connect', () => {
    console.log('connected');
    client.subscribe('monitoring/tambak/udang/v1');
  });

})

client.on('message', (topic: any, m: any) => {
  let message = m.toString();
  Sweet.success(message);
});
</script>