import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { createPinia } from 'pinia';
import { createPahoMqttPlugin } from 'vue-paho-mqtt';

createApp(App)
.use(router)
.use(createPinia())
.component('VueDatePicker', VueDatePicker)
.mount('#app')
