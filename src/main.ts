import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { createPinia } from 'pinia';
import vue3GoogleLogin from 'vue3-google-login';

createApp(App)
.use(router)
.use(createPinia())
.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
})
.component('VueDatePicker', VueDatePicker)
.mount('#app')
