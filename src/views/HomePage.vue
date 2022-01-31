<template>
  <div class="main">
    <v-search
      v-model:sortText="sortText"
      @search="search"
      @resset="resset"
    ></v-search>
    <div class="main__wrapper">
      <transition-group name="card">
        <div v-for="card in card" :key="card.id">
          <v-card :card="card"></v-card>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import vCard from "../components/vCard.vue";
import VSearch from "../components/vSearch.vue";
export default {
  components: { vCard, VSearch },
  methods: {
    ...mapActions(["getCards"]),
    search() {
      this.card = this.cards;
      this.card = this.card.filter(item => {
        return this.sortText
          ? item.FIO.indexOf(this.sortText.toLowerCase()) !== -1
            ? true
            : false
          : true;
      });
    },
    resset() {
      this.sortText = "";
      this.card = this.cards;
    }
  },
  async mounted() {
    await this.getCards();
    this.search();
  },
  data() {
    return {
      sortText: "",
      card: null
    };
  },
  computed: {
    ...mapState({
      cards: state => state.homeCard.cards
    })
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.main {
  margin: 50px 80px 0;
  .search {
    margin-bottom: 20px;
    height: 43px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 190px;
    position: relative;
    &__input {
      border: none;
      outline: none;
      width: 100%;
      border-radius: 10px 0 0 10px;
      font-size: 20px;
      padding: 0 50px 0 20px;
    }
    &__btn {
      height: 100%;
      color: $white;
      background: #000;
      border: none;
      padding: 0 55px;
      text-transform: uppercase;
      font-size: 18px;
      cursor: pointer;
    }
    &__clear {
      position: absolute;
      width: 32px;
      height: 32px;
      cursor: pointer;
      top: 50%;
      transform: translateY(-50%);
      right: calc(190px + 10px);
    }
  }
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    color: $white;
    position: relative;
  }
  .card-enter-active,
  .card-leave-active,
  .clear-enter-active,
  .clear-leave-active {
    transition: all 1s;
  }
  .card-enter-from,
  .card-leave-to {
    opacity: 0;
  }
  .clear-enter-from,
  .clear-leave-to {
    opacity: 0;
  }
  .card-move {
    transition: transform 0.8s ease;
  }
}
</style>
