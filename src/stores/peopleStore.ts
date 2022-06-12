import { Person } from "@/models/personModel";
import axios from "axios";
import { defineStore } from "pinia";

export const usePeopleStore = defineStore("people", {
  state: () => ({
    people: null as null | Person[],
    count: 0,
    next: null as null | string,
    previous: null as null | string,
    error: "",
    loading: false,
  }),
  actions: {
    async fetchPeople(searchTerm: string, pageSwitch?: string | null) {
      try {
        this.loading = true;

        const fetchLink =
          // If pageSwitch given, switch pages, otherwise use searchTerm
          pageSwitch?.substring(axios.defaults.baseURL?.length || 0) ||
          `/people/?search=${searchTerm}`;
        const { data } = await axios.get(fetchLink);

        this.count = data.count;
        this.next = data.next;
        this.previous = data.previous;
        this.people = data.results;
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
