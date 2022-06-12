<script lang="ts">
import { Planet } from "@/models/planetModel";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PlanetCard",
  props: {
    planet: {
      type: Object as () => Planet,
    },
  },
});
</script>

<template>
  <div class="card__content">
    <p class="card__title">{{ planet?.name }}</p>
    <hr class="card__hr" />
    <p>
      Population:
      {{
        planet &&
        planet?.population.length > 6 &&
        planet?.population !== "unknown"
          ? planet?.population.slice(0, -6) + " million"
          : planet?.population
      }}
    </p>
    <p>Terrain: {{ planet?.terrain }}</p>
    <button
      class="card__more-button"
      @click="$router.push(`/planets/${planet?.url.split('/')[5]}`)"
    >
      more..
    </button>
  </div>
</template>

<style lang="scss">
@import "../styles/card.scss";
</style>
