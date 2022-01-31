<template>
  <div class="card">
    <my-span top="30px" left="-50px" />
    <my-span top="170px" left="-100px" />
    <my-span top="300px" left="10px" />
    <my-span top="250px" left="-1-0px" />
    <h2 class="card__title">
      {{ card.FIO }}
      <span
        ><router-link :to="`/user/${card.id}`"
          ><img src="@/assets/arrow-icon.svg" alt="" /></router-link
      ></span>
    </h2>
    <div class="card__img--container">
      <img :src="card.imgUrl ? card.imgUrl : require('@/assets/no-avatar-img-card.png')" alt="" class="card__img" />
    </div>
    <div class="card__stat--wrapper">
      <div class="card__stat" v-for="(stat, index) in card.stats" :key="index">
        <img
          :src="require(`@/assets/${stat.icon}`)"
          alt="сила"
          class="card__stat--icon"
        />
        <div class="card__stat--text">
          {{ stat.name }} <span>{{ stat.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VUserImg from "./vUserImg.vue";
export default {
  components: {
    VUserImg,
  },
  props: {
    card: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.card {
  transition: 0.5s ease-in;
  z-index: 2;
  background: #000;
  border-radius: 29px;
  padding: 10px 25px 25px;
  position: relative;
  overflow: hidden;
  &__title {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    z-index: 10;
  }
  &__img {
    &--container {
      z-index: 10;
      width: 100%;
      height: 370px;
      overflow: hidden;
      position: relative;
      margin-bottom: 15px;
      border-radius: 20px;
    }
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  &__stat {
    display: flex;
    align-items: center;
    &--text {
      width: 100%;
      border-radius: 50px;
      background: $grey;
      padding: 7px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: $red;
        font-size: 22px;
        line-height: 20.7px;
      }
    }
    &--wrapper {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
  &:hover {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
    transform: translateY(-10px);
    transition: 0.5s ease-out;
  }
  &__row {
    width: 200px;
    height: 32px;
    transform: rotate(-45deg);
    background: $grey;
    border-radius: 50px;
    position: absolute;
    z-index: -1;
    animation: animationLine 1s linear infinite;
  }
}
@keyframes animationLine {
  0% {
    transform: rotate(-45deg) translateX(-200%) translateY(-200%);
  }
  100% {
    transform: rotate(-45deg) translateX(300%) translateY(300%);
  }
}
</style>
