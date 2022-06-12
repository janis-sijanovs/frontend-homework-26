import { Planet, WookiePlanet } from "@/models/planetModel";
import axios from "axios";
import { defineStore } from "pinia";

export const usePlanetsStore = defineStore("planets", {
  state: () => ({
    planets: null as null | Planet[],
    count: 0,
    next: null as null | string,
    previous: null as null | string,
    error: "",
    loading: false,
  }),
  actions: {
    async fetchPlanets(pageSwitch?: string | null, isWookiee?: boolean) {
      try {
        this.loading = true;

        let fetchLink =
          // If pageSwitch given, switch pages, otherwise use searchTerm
          pageSwitch?.substring(axios.defaults.baseURL?.length || 0) ||
          `/planets`;
        fetchLink += isWookiee ? "/?format=wookiee" : "";
        let { data } = await axios.get(fetchLink);

        if (isWookiee) {
          data = JSON.parse(data.replace("whhuanan", '"whhuanan"'));
          this.count = data.oaoohuwhao;
          this.planets = data.rcwochuanaoc.map(
            (planet: WookiePlanet): Planet => ({
              name: planet.whrascwo,
              rotation_period: planet.rcooaoraaoahoowh_akworcahoowa,
              orbital_period: planet.oorcrhahaoraan_akworcahoowa,
              diameter: planet.waahrascwoaoworc,
              climate: planet.oaanahscraaowo,
              gravity: planet.rrrcrahoahaoro,
              terrain: planet.aoworcrcraahwh,
              surface_water: planet.churcwwraoawo_ohraaoworc,
              population: planet.akooakhuanraaoahoowh,
              residents: planet.rcwocahwawowhaoc,
              films: planet.wwahanscc,
              created: planet.oarcworaaowowa,
              edited: planet.wowaahaowowa,
              url: planet.hurcan,
            })
          );
        } else {
          this.count = data.count;
          this.next = data.next;
          this.previous = data.previous;
          this.planets = data.results;
        }
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
