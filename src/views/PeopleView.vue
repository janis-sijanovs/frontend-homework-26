<script lang="ts">
import { usePeopleStore } from "@/stores/peopleStore";
import { storeToRefs } from "pinia";
import { computed, defineComponent, onMounted, ref } from "vue";
import Loader from "@/components/Loader.vue";
import PersonCard from "../components/PersonCard.vue";

export default defineComponent({
  name: "PeopleView",
  setup() {
    const input = ref("");
    const peopleStore = usePeopleStore();
    const { fetchPeople } = peopleStore;

    const {
      loading,
      error,
      next,
      previous,
      count: resultCount,
    } = storeToRefs(peopleStore);

    const people = computed(() => peopleStore.people);
    const currentCount = computed(() =>
      people.value ? people.value?.length : 0
    );

    const page = computed(() =>
      previous.value ? +previous.value.slice(-1) + 1 : "1"
    );

    const maxPage = computed(() => Math.ceil(resultCount.value / 10));

    onMounted(() => {
      fetchPeople(input.value);
    });
    return {
      people,
      input,
      currentCount,
      error,
      loading,
      next,
      previous,
      page,
      maxPage,
      resultCount,
      fetchPeople,
    };
  },
  components: { Loader, PersonCard },
});
</script>

<template>
  <div class="page">
    <div class="page__header">
      <label>Search by Name: </label>
      <input
        class="page__input"
        @input="fetchPeople(input)"
        v-model="input"
        type="text"
      />
    </div>

    <div class="list" v-if="people">
      <div class="card" v-for="person in people" :key="person.name">
        <PersonCard :person="person"></PersonCard>
      </div>
    </div>

    <div class="page__footer">
      <Loader v-if="loading"></Loader>
      <p v-if="error">{{ error }}</p>
      <p v-if="resultCount === 0">No Results</p>
      <div class="page__footer page__footer--inner" v-if="resultCount > 0">
        <p>
          Showing {{ currentCount }}
          <span v-if="resultCount !== currentCount"
            >out of {{ resultCount }}</span
          >
          <span>{{ resultCount > 1 ? " results" : " result" }}</span>
        </p>
        <div>
          <button
            class="page__button"
            @click="fetchPeople(input, previous)"
            v-if="previous"
          >
            &lt; Previous
          </button>
          &nbsp;
          <button
            class="page__button"
            @click="fetchPeople(input, next)"
            v-if="next"
          >
            Next >
          </button>
        </div>
        <p>Page {{ page }} out of {{ maxPage }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/dataPage.scss";
</style>
