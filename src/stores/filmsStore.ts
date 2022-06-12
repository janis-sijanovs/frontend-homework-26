import { Film } from "@/models/filmModel";
import axios from "axios";
import { defineStore } from "pinia";

export const useFilmsStore = defineStore("films", {
  state: () => ({
    films: null as null | Film[],
    error: "",
    loading: false,
  }),
  actions: {
    async fetchFilms() {
      try {
        this.loading = true;

        const fetchLink = "/films";
        const { data } = await axios.get(fetchLink);
        this.films = data.results;
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
