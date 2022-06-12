import { Planet } from "@/models/planetModel";
import axios from "axios";
import { defineStore } from "pinia";

export const usePlanetStore = defineStore("planet", {
  state: () => ({
    planet: null as null | Planet,
    next: null as null | string,
    previous: null as null | string,
    error: "",
    loading: false,
  }),
  actions: {
    clearStore() {
      this.error = "";
      this.planet = null;
    },
    async fetchPlanet(id: string) {
      try {
        this.loading = true;

        const fetchLink = `/planets/${id}`;
        const { data } = await axios.get(fetchLink);
        this.planet = data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            this.error = "No Data";
          } else {
            this.error = err.message;
          }
        } else {
          this.error = "Not Axios Error";
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
