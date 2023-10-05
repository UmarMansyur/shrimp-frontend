import { defineStore } from "pinia"
import useApi from "../composables/api";
const { getResource } = useApi();
export const usePond = defineStore({
  id: "pond",
  state: () => ({
    id: 0,
    pool: [],
    is_start: false,
    pool_id: 0,
  }),
  getters: {
    getPond(state) {
      return state.id;
    }
  },
  actions: {
    async setPondId(id: number) {
      const response = await getResource('/pool/list/me/'+ id);
      this.pool = response.data;
      this.id = id;
    },
  }
});