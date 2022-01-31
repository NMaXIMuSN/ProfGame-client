<template>
  <div class="sort__wrapper">
    <div class="select">
      {{ sortingOptions[currentSort] }}
      <img src="@/assets/sort-arrow-icon.svg" alt="" />
    </div>
    <transition name="select">
      <div class="select__option-wrapper" v-if="visible">
        <div
          class="select__option"
          v-for="option in sortingOptions"
          :key="option"
          @click="$emit('updateCurrentSort', option)"
        >
          <div v-if="option !== sortingOptions[currentSort]">
            {{ option }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "my-select",
  emits: ["updateCurrentSort"],
  props: {
    sortingOptions: {
      type: Array
    },
    currentSort: {
      type: Number
    },
    visible: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.sort {
  &__wrapper {
    position: absolute;
  }
}
.select {
  padding: 20px 45px 20px 10px;
  background: $red;
  text-align: center;
  border-radius: 20px;
  font-size: 25px;
  color: $white;
  text-transform: uppercase;
  transition: all 0.5s;
  width: 320px;
  cursor: pointer;
  img {
    position: absolute;
    right: 20px;
  }
  &__option {
    text-transform: uppercase;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    &-wrapper {
      left: 10%;
      position: absolute;
      width: 80%;
      padding: 10px 0 8px;
      text-align: center;
      background: #fff;
      bottom: 60px;
      z-index: -1;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.75);
      border-radius: 20px 20px 0px 0px;
    }
  }
}

.select-enter-active,
.select-leave-active {
  transition: opacity 0.5s linear;
}

.select-leave-to,
.select-enter-from {
  opacity: 0;
}
</style>
