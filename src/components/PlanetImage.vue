<script lang="ts">
import { Planet } from "@/models/planetModel";
import { computed, defineComponent } from "vue";
import { surfaceColor } from "../models/colorData";
export default defineComponent({
  name: "PlanetImage",
  props: {
    planet: {
      type: Object as () => Planet,
    },
  },
  setup(props) {
    const planetColor = computed(() => {
      if (props.planet?.terrain) {
        const targetTerrain: any = props.planet?.terrain.split(", ");
        if (targetTerrain.length === 1) {
          const searchIndex: (keyof typeof surfaceColor)[] = targetTerrain;
          const color = surfaceColor[searchIndex[0]];
          console.log(color);
          return color;
        } else {
          const target: keyof typeof surfaceColor =
            targetTerrain[Math.floor(Math.random() * targetTerrain.length)];
          const color = surfaceColor[target];
          console.log(targetTerrain);
          console.log(target);
          console.log(color);
          return color;
        }
      }
      return "green";
    });

    const planetSize = computed(() => {
      const diameter = props.planet?.diameter;
      if (!diameter || diameter === "0" || diameter === "unknown") {
        return 1;
      }
      return +diameter / 10000;
    });
    return { planetColor, planetSize };
  },
});
</script>

<template>
  <div
    class="planet"
    :style="{
      backgroundColor: planetColor,
      width: (300 * planetSize).toFixed(2) + 'px',
      height: (300 * planetSize).toFixed(2) + 'px',
    }"
  ></div>
</template>

<style lang="scss" scoped>
@import "../styles/planet.scss";
</style>
