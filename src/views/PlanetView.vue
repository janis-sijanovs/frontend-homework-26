<script lang="ts">
import { storeToRefs } from "pinia";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
} from "vue";
import Loader from "@/components/Loader.vue";
import PlanetImage from "@/components/PlanetImage.vue";
import { usePlanetStore } from "@/stores/planetStore";
import router from "@/router";

export default defineComponent({
  name: "PlanetView",
  props: ["id"],
  setup(props) {
    const showPlanet = ref(false);
    const planetStore = usePlanetStore();
    const { fetchPlanet, clearStore } = planetStore;

    const { loading, error } = storeToRefs(planetStore);

    const planet = computed(() => planetStore.planet);

    watch(
      () => props.id,
      (id) => {
        showPlanet.value = false;
        fetchPlanet(id);
      }
    );

    onMounted(() => {
      fetchPlanet(props.id);
    });

    onUpdated(() => {
      if (error.value) {
        clearStore();
        router.back();
      }
    });

    onUnmounted(() => {
      clearStore();
    });
    return {
      planet,
      error,
      loading,
      showPlanet,
    };
  },
  components: { Loader, PlanetImage },
});
</script>

<template>
  <div class="page">
    <div class="page__header">
      <button
        class="page__button"
        v-if="+id > 1"
        @click="$router.push(`/planets/${+id - 1}`)"
      >
        &lt; Previous
      </button>
      <button class="page__button" @click="$router.push(`/planets/${+id + 1}`)">
        Next >
      </button>
    </div>

    <div class="data" v-if="planet">
      <p class="data__title">{{ planet.name }}</p>
      <div class="data__hr-container">
        <hr class="data__hr" />
      </div>
      <div class="data__image-frame" v-if="showPlanet">
        <PlanetImage :planet="planet" />
      </div>
      <button
        class="page__button page__button--red"
        @click="
          () => {
            showPlanet = true;
          }
        "
      >
        Generate Image
      </button>
      <p>
        <span class="data__label">Rotation period: </span
        >{{ planet.rotation_period }} days
      </p>
      <p>
        <span class="data__label">Orbital period: </span
        >{{ planet.orbital_period }} days
      </p>
      <p><span class="data__label">Diameter: </span>{{ planet.diameter }} km</p>
      <p><span class="data__label">Climate: </span>{{ planet.climate }}</p>
      <p><span class="data__label">Gravity: </span>{{ planet.gravity }}</p>
      <p><span class="data__label">Terrain: </span>{{ planet.terrain }}</p>
      <p>
        <span class="data__label">Water Temperature: </span
        >{{ planet.surface_water }}°C
      </p>
      <p>
        <span class="data__label">Population: </span>{{ planet.population }}
        <span
          v-if="planet.population.length > 6 && planet.population !== 'unknown'"
          >({{ planet.population.slice(0, -6) }} million)</span
        >
      </p>
    </div>

    <div class="page__footer">
      <Loader v-if="loading"></Loader>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/planet.scss";
@import "../styles/dataPage.scss";
</style>
