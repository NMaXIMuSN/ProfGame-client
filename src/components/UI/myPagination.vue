<template>
  <div class="pagination">
    <img
      @click="page != 1 ? updatePage(page - 1) : updatePage(page)"
      :class="{ 'pagination__arrow-disabled': page == 1 }"
      class="pagination__arrow pagination__arrow-right"
      src="@/assets/sort-arrow-icon-pagination.svg"
      alt=""
    />

    <div
      @click="updatePage(1)"
      class="pagination__block"
      :class="{ 'pagination__block-active': page == 1 }"
    >
      <span>1</span>
    </div>

    <div class="pagination__circl-wrapper" v-if="pageBlockLeft[0] > 2">
      <div class="pagination__circl"></div>
      <div class="pagination__circl"></div>
    </div>

    <div
      v-for="block in pageBlockLeft"
      :key="block"
      @click="updatePage(block)"
      class="pagination__block"
    >
      <span>{{ block }}</span>
    </div>

    <div
      v-if="page >= 2"
      class="pagination__block"
      :class="{ 'pagination__block-active': page }"
    >
      <span>{{ page }}</span>
    </div>

    <div
      v-for="block in pageBlockRight"
      :key="block"
      @click="updatePage(block)"
      class="pagination__block"
    >
      <span>{{ block }}</span>
    </div>

    <div
      class="pagination__circl-wrapper"
      v-if="[...pageBlockRight].pop() < maxPage - 1"
    >
      <div class="pagination__circl"></div>
      <div class="pagination__circl"></div>
    </div>

    <div
      @click="updatePage(maxPage)"
      v-if="page + 1 <= maxPage"
      class="pagination__block"
    >
      <span>{{ maxPage }}</span>
    </div>

    <img
      :class="{ 'pagination__arrow-disabled': page == maxPage }"
      class="pagination__arrow pagination__arrow-left"
      src="@/assets/sort-arrow-icon-pagination.svg"
      alt=""
      @click="page != maxPage ? updatePage(page + 1) : updatePage(page)"
    />
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props: {
    page: {
      type: Number,
      require: true,
    },
    countBlock: {
      type: Number,
      default: 2,
    },
    maxPage: {
      type: Number,
      require: true,
    },
  },
  computed: {
    maxBlock() {
      return this.countBlock * 2 + 3;
    },
    pageBlockLeft() {
      const blocksLeft = [];
      let start =
        this.maxPage - this.page <= this.countBlock
          ? this.maxPage - this.maxBlock + this.countBlock
          : this.page - this.countBlock;
      for (let i = start; i < this.page; i++) {
        if (i > 1) {
          blocksLeft.push(i);
        }
      }
      return blocksLeft;
    },
    pageBlockRight() {
      const blocksight = [];
      let start = this.page + 1;
      let end =
        this.page + this.countBlock < this.maxBlock
          ? this.maxBlock - this.countBlock + 1
          : this.page + this.countBlock + 1;
      for (let i = start; i < end; i++) {
        if (i < this.maxPage) {
          blocksight.push(i);
        }
      }
      return blocksight;
    },
  },
  emits: ["update:page"],
  methods: {
    updatePage(newPage) {
      this.$emit("update:page", newPage);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.pagination {
  display: flex;
  gap: 10px;
  &__block {
    cursor: pointer;
    background: $black;
    width: 32px;
    height: 37px;
    border-radius: 7px;
    font-size: 16px;
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    &-active {
      box-shadow: 0px 0px 6px #c3073f;
    }
  }
  &__circl {
    background: #1a1a1d;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    &-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  &__arrow {
    color: $black;
    cursor: pointer;

    &-right {
      transform: rotate(180deg);
    }

    &-disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>
