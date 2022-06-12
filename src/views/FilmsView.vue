<script lang="ts">
import { storeToRefs } from "pinia";
import { computed, defineComponent, onMounted, ref } from "vue";
import Loader from "@/components/Loader.vue";
import FilmCard from "../components/FilmCard.vue";
import { useFilmsStore } from "@/stores/filmsStore";

export default defineComponent({
  name: "PeopleView",
  setup() {
    const input = ref("");

    const sortAscending = ref(true);
    const sortByID = ref(true);

    const filmsStore = useFilmsStore();
    const { fetchFilms } = filmsStore;

    const { loading, error } = storeToRefs(filmsStore);

    const films = computed(() => filmsStore.films);
    const resultCount = computed(() => (films.value ? films.value?.length : 0));

    const sortedFilms = computed(() =>
      films.value
        ? [...films.value].sort((a, b) => {
            if (sortByID.value) {
              if (+a.episode_id > +b.episode_id) {
                return sortAscending.value ? 1 : -1;
              }
            }
            if (!sortByID.value) {
              if (a.release_date > b.release_date) {
                return sortAscending.value ? 1 : -1;
              }
            }
            return sortAscending.value ? -1 : 1;
          })
        : null
    );

    const changeSortParams = (category: "id" | "date") => {
      if (category === "id") {
        if (sortByID.value) {
          sortAscending.value = !sortAscending.value;
        } else {
          sortByID.value = true;
          sortAscending.value = true;
        }
      }
      if (category === "date") {
        if (!sortByID.value) {
          sortAscending.value = !sortAscending.value;
        } else {
          sortByID.value = false;
          sortAscending.value = true;
        }
      }
    };

    onMounted(() => {
      fetchFilms();
    });
    return {
      sortedFilms,
      sortAscending,
      sortByID,
      changeSortParams,
      input,
      resultCount,
      error,
      loading,
      fetchFilms,
    };
  },
  components: { Loader, FilmCard },
});
</script>

<template>
  <div class="page">
    <div class="page__header">
      <button class="page__button" @click="changeSortParams('id')">
        Episode <span v-if="sortByID">{{ sortAscending ? "⇈" : "⇊" }}</span>
      </button>
      <button class="page__button" @click="changeSortParams('date')">
        Release Date
        <span v-if="!sortByID">{{ sortAscending ? "⇈" : "⇊" }}</span>
      </button>
    </div>

    <div class="list" v-if="sortedFilms">
      <div class="card" v-for="film in sortedFilms" :key="film.title">
        <FilmCard :film="film"></FilmCard>
      </div>
    </div>

    <div class="page__footer">
      <Loader v-if="loading"></Loader>
      <p v-if="error">{{ error }}</p>
      <p>Showing {{ resultCount }} results</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/dataPage.scss";
</style>
