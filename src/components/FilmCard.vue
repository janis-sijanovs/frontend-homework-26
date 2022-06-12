<script lang="ts">
import { Film } from "@/models/filmModel";
import { defineComponent } from "vue";
export default defineComponent({
  name: "FilmCard",
  props: {
    film: {
      type: Object as () => Film,
    },
  },
});
</script>

<template>
  <div class="card__content">
    <p class="card__title">{{ film?.title }}</p>
    <hr class="card__hr" />
    <p>Episode: {{ film?.episode_id }}</p>
    <p>Released: {{ film?.release_date }}</p>
  </div>
</template>

<style lang="scss">
@import "../styles/card.scss";
</style>
