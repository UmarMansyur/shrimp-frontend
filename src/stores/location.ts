import { defineStore } from "pinia";

export const useLocationStore = defineStore({
  id: "location",
  state: () => ({
    location: {
      lat: '',
      lng: '',
    },
  }),
  getters: {
    getLocation(state) {
      return state.location;
    },
  },
  actions: {
    setLocation(location: any) {
      this.location = location;
    },
  },
});

export default useLocationStore;