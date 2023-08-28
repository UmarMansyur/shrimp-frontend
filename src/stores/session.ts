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
      this.name = response.username;
      this.email = response.email;
      this.role = response.role;
      this.thumbnail = response.thumbnail;
      this.phone = response.phone;
      this.gender = response.gender;
      this.address = response.address;
      this.birthday = response.birthday;
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
    },
  }
});
