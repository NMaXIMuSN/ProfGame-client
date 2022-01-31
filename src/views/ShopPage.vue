<template>
  <div class="main">
    <vSelect
      v-if="cards.length > 0"
      class="main__sort"
      :visible="optionsVisibl"
      :sortingOptions="sortingOptions"
      :currentSort="currentSort"
      @updateCurrentSort="newCurrentSort"
      @click="optionsVisibl = !optionsVisibl"
    ></vSelect>
    <div class="main__wrapper">
      <transition-group name="card-list">
        <shopCard
          v-for="item in sortCardItems"
          :key="item._id"
          :object="item"
        />
      </transition-group>
      <new-shop-card @click="popupVisible = true" />
      <popup v-model:popup="popupVisible" @close="resetNewCard()">
        <template v-slot:title>
          Добавление карточки в магазин
        </template>
        <template v-slot:body>
          <v-shop-form />
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import shopCard from "@/components/vShopCard.vue";
import vSelect from "@/components/vSelect.vue";
import NewShopCard from "../components/newShopCard.vue";
import VShopForm from "../components/vShopForm.vue";
export default {
  components: {
    shopCard,
    vSelect,
    NewShopCard,
    VShopForm,
  },
  data: () => ({
    optionsVisibl: false,
    cards: [],
    popupVisible: false,
  }),
  methods: {
    ...mapActions(["getShop", "createShopCard"]),
    ...mapMutations(["setSort","resetNewCard"]),
    newCurrentSort(options) {
      this.setSort(this.sortingOptions.indexOf(options));
    },
  },
  computed: {
    ...mapState({
      schopCards: (state) => state.shop.shop,
      currentSort: (state) => state.shop.currentSort,
      sortingOptions: (state) => state.shop.sortingOptions,
    }),

    sortCardItems() {
      this.cards = [...this.schopCards];
      switch (this.currentSort) {
        case 1: // по силе
          return this.cards.sort(
            (item1, item2) =>
              parseInt(item2.stats[0].value) - parseInt(item1.stats[0].value)
          );
        case 2: // по красноречию
          return this.cards.sort(
            (item1, item2) =>
              parseInt(item2.stats[1].value) - parseInt(item1.stats[1].value)
          );
        case 3: // по мудрости
          return this.cards.sort(
            (item1, item2) =>
              parseInt(item2.stats[3].value) - parseInt(item1.stats[3].value)
          );
        case 4: // по лидерству
          return this.cards.sort(
            (item1, item2) =>
              parseInt(item2.stats[3].value) - parseInt(item1.stats[3].value)
          );
        case 5: // по возростанию
          return this.cards.sort((item1, item2) => item1.price - item2.price);
        case 6: // по убыванию
          return this.cards.sort((item1, item2) => item2.price - item1.price);

        default:
          return this.cards;
      }
    },
  },
  mounted() {
    this.getShop();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.main {
  &__wrapper {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  margin: 50px 46px;
  // position: relative;
  &__sort {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1;
  }
}
.card-list-move {
  transition: all 0.8s ease;
}
.card-list-leave-active,
.card-list-enter-active {
  transition: 0.5s ease-out;
}

.card-list-enter-from,
.card-list-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
