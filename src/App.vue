<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { usePlanetStore } from "./stores/planetStore";
export default defineComponent({
  name: "App",
  setup() {
    const { planet } = storeToRefs(usePlanetStore());
    return { planet };
  },
});
</script>

<template>
  <div class="app">
    <nav class="navigation">
      <router-link to="/people">People</router-link> |
      <router-link to="/films">Films</router-link> |
      <router-link to="/planets">Planets</router-link>
      <span v-if="planet">
        | <span class="highlighted-planet">{{ planet.name }}</span></span
      >
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/default.scss";
@import "./styles/app.scss";
</style>
