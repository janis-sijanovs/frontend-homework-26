<script lang="ts">
import { Person } from "@/models/personModel";
import { defineComponent } from "vue";
export default defineComponent({
  name: "PersonCard",
  props: {
    person: {
      type: Object as () => Person,
    },
  },
});
</script>

<template>
  <div class="card__content">
    <p class="card__title">{{ person?.name }}</p>
    <hr class="card__hr" />
    <p>H: {{ person?.height }} cm</p>
    <p>W: {{ person?.mass }} {{ person?.mass === "unknown" ? "" : "kg" }}</p>
    <p>Born: {{ person?.birth_year }}</p>
  </div>
</template>

<style lang="scss">
@import "../styles/card.scss";
</style>
