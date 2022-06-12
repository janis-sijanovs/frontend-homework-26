<script lang="ts">
import { storeToRefs } from "pinia";
import { computed, defineComponent, onMounted, ref } from "vue";
import Loader from "@/components/Loader.vue";
import { usePlanetsStore } from "@/stores/planetsStore";
import PlanetCard from "@/components/PlanetCard.vue";

export default defineComponent({
  name: "PeopleView",
  setup() {
    const planetsStore = usePlanetsStore();
    const { fetchPlanets } = planetsStore;

    const isWookiee = ref(false);

    const changeWookiee = () => {
      isWookiee.value = !isWookiee.value;
      fetchPlanets("", isWookiee.value);
    };

    const {
      loading,
      error,
      next,
      previous,
      count: resultCount,
    } = storeToRefs(planetsStore);

    const planets = computed(() => planetsStore.planets);
    const currentCount = computed(() =>
      planets.value ? planets.value.length : 0
    );

    const page = computed(() =>
      previous.value ? +previous.value.slice(-1) + 1 : "1"
    );

    const maxPage = computed(() => Math.ceil(resultCount.value / 10));

    onMounted(() => {
      fetchPlanets("");
    });
    return {
      planets,
      changeWookiee,
      isWookiee,
      currentCount,
      error,
      loading,
      next,
      previous,
      page,
      maxPage,
      resultCount,
      fetchPlanets,
    };
  },
  components: { Loader, PlanetCard },
});
</script>

<template>
  <div class="page">
    <div class="page__header">
      <label class="page__switch">
        Wookiee:
        <span class="switch">
          <input
            @input="changeWookiee()"
            type="checkbox"
            :checked="isWookiee"
          />
          <span class="slider round"></span>
        </span>
      </label>
    </div>

    <div class="list" v-if="planets">
      <div class="card" v-for="planet in planets" :key="planet.name">
        <PlanetCard :planet="planet"></PlanetCard>
      </div>
    </div>

    <div class="page__footer">
      <Loader v-if="loading"></Loader>
      <p v-if="error">{{ error }}</p>
      <p v-if="resultCount === 0">No Results</p>
      <div v-if="resultCount > 0">
        <p>
          Showing {{ currentCount }}
          <span v-if="resultCount !== currentCount"
            >out of {{ resultCount }}</span
          >
          <span>{{ resultCount > 1 ? " results" : " result" }}</span>
        </p>
        <button
          class="page__button"
          @click="fetchPlanets(previous)"
          v-if="previous"
        >
          &lt; Previous
        </button>
        &nbsp;
        <button class="page__button" @click="fetchPlanets(next)" v-if="next">
          Next >
        </button>
        <p>Page {{ page }} out of {{ maxPage }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/dataPage.scss";
</style>
