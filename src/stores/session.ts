import { defineStore } from "pinia";
import { userType } from "../helpers/type";
import useToken from "../composables/token";
const { decodeToken } = useToken();
export const useSessionStore = defineStore({
  id: "session",
  state: () => <userType>({
    id: 0,
    name: '',
    email: '',
    role: '',
    thumbnail: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
    createdAt: '',
    prosentase: 0,
  }),
  getters: {
    getUser(state: userType) {
      return state;
    }
  },
  actions: {
    async setUser() {
      if(sessionStorage.getItem('token') == null) return;
      const response = await decodeToken();
      this.id = response.id;
      if(response.id) this.prosentase += 10;
      this.name = response.username;
      if(response.username) this.prosentase += 10;
      this.email = response.email;
      if(response.email) this.prosentase += 10;
      this.role = response.role;
      if(response.role) this.prosentase += 10;
      this.thumbnail = response.thumbnail;
      if(response.thumbnail) this.prosentase += 10;
      this.phone = response.phone;
      if(response.phone) this.prosentase += 10;
      this.gender = response.gender;
      if(response.gender) this.prosentase += 10;
      this.address = response.address;
      if(response.address) this.prosentase += 10;
      this.birthday = response.birthday;
      if(response.birthday) this.prosentase += 10;
      this.createdAt = response.created_at;
      if(response.created_at) this.prosentase += 10;
    },
    destroyUser() {
      this.id = 0;
      this.name = '';
      this.email = '';
      this.role = '';
      this.thumbnail = '';
      this.birthday = '';
      this.gender = '';
      this.address = '';
      this.phone = '';
      this.createdAt = '';
    },
  }
});
