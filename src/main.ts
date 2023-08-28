import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { createPinia } from 'pinia';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

createApp(App)
.use(router)
.component('v-select', vSelect)
.use(createPinia())
.component('VueDatePicker', VueDatePicker)
.mount('#app')
