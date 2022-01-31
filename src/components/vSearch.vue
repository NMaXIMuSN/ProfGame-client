<template>
  <form class="search" @change.prevent>
    <input
      type="text"
      :value="sortText"
      @input="$emit('update:sortText', $event.target.value)"
      placeholder="Найти по ФИО"
      class="search__input"
    />
    <transition name="clear">
      <img
        src="@/assets/close-icon.svg"
        alt=""
        v-if="sortText"
        @click="$emit('resset')"
        class="search__clear"
      />
    </transition>
    <button class="search__btn" @click.prevent="$emit('search')">найти</button>
  </form>
</template>

<script>
export default {
  props: {
    sortText: {
      type: String,
      required: true
    }
  },
  emits: ["update:sortText", "search", "resset"]
};
</script>

<style lang="scss" scoped>
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
    color: #fff;
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
.clear-enter-active,
.clear-leave-active {
  transition: all 1s;
}
.clear-enter-from,
.clear-leave-to {
  opacity: 0;
}
</style>
