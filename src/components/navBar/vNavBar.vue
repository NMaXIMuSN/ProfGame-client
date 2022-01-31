<template>
  <header
    class="header"
    @mouseenter="active = true"
    @mouseleave="active = false"
  >
    <h1 class="header__title" @click="$router.push('/')">
      {{ titleFirstVisibl }}<span>{{ titleSeccongVisibl }}</span>
    </h1>
    <div class="header__nav">
      <div class="header__row" @click="$router.push('/')">
        <img class="header__row--icon" src="@/assets/home-icon.svg" alt="" />
        <div class="header__row--text">Главная</div>
        <img src="@/assets/arrow-icon.svg" alt="" class="header__row--arrow" />
      </div>
      <div class="header__row" @click="$router.push('/shop')">
        <img class="header__row--icon" src="@/assets/shop-icon.svg" alt="" />
        <div class="header__row--text">магазин</div>
        <img src="@/assets/arrow-icon.svg" alt="" class="header__row--arrow" />
      </div>
      <div class="header__row" @click="$router.push('/activationUsers')" v-if="$store.state?.userInfo?.role === 'admin'">
        <img class="header__row--icon" src="@/assets/activation-icon.svg" alt="" />
        <div class="header__row--text">Активация</div>
        <img src="@/assets/arrow-icon.svg" alt="" class="header__row--arrow" />
      </div>
      <div class="header__row" @click="$router.push('/Characteristic')" v-if="$store.state?.userInfo?.role === 'admin'">
        <img class="header__row--icon" src="@/assets/activation-icon.svg" alt="" />
        <div class="header__row--text">Характеристики</div>
        <img src="@/assets/arrow-icon.svg" alt="" class="header__row--arrow" />
      </div>
    </div>
    <div class="header__spacer"></div>
    <div class="header__buttons" v-if="!isAuth">
      <my-btn @click="$router.push('/login')">Войти</my-btn>
      <my-btn @click="$router.push('/registration')">Регистрация</my-btn>
    </div>
    <img
      v-if="!isAuth"
      class="header__login"
      :class="{ 'header__login--disable': active }"
      src="@/assets/login-icon.svg"
      alt=""
    />
    <vNavAcc v-if="isAuth"/>
  </header>
</template>

<script>
import vNavAcc from "./vNavAcc.vue"
import { mapState } from "vuex";
export default {
  components:{
    vNavAcc
  },
  data: () => ({
    active: false,
    titleFirst: "Prof",
    titleFirstVisibl: "P",
    titleSeccong: "Game",
    titleSeccongVisibl: "G",
  }),
  methods: {},
  computed: {
    ...mapState({
      isAuth: (state) => state.isAuth,
    }),
  },
  watch: {
    active() {
      if (this.active) {
        let i = 0;
        const letters = () => {
          if (i < this.titleFirst.length - 1) {
            i++;
            this.titleFirstVisibl += this.titleFirst[i];
            this.titleSeccongVisibl += this.titleSeccong[i];
            setTimeout(letters, 200);
          }
        };
        letters();
      } else {
        const letters = () => {
          if (1 <= this.titleFirstVisibl.length - 1) {
            this.titleFirstVisibl = this.titleFirstVisibl.slice(0, -1);
            this.titleSeccongVisibl = this.titleSeccongVisibl.slice(0, -1);
            setTimeout(letters, 200);
          }
        };
        letters();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.header {
  width: 88px;
  display: flex;
  flex-direction: column;
  position: fixed;
  border-radius: 0px 35px 35px 0px;
  background: #1a1a1d;
  padding: 30px 15px;
  text-align: center;
  height: 100vh;
  transition: width 0.5s;
  overflow: hidden;
  z-index: 1000;
  &__wrapper {
    display: grid;
  }
  &__spacer {
    height: 100%;
  }
  &__title {
    color: $white;
    font-size: 31px;
    line-height: 52px;
    cursor: pointer;
    margin-bottom: 80px;
    font-family: "Rammetto One", cursive;
    span {
      font-family: "Rammetto One", cursive;
      color: $red;
      text-transform: uppercase;
    }
    &--min {
      display: block;
    }
  }
  &__nav {
    display: grid;
    grid-gap: 30px;
  }
  &__row {
    display: grid;
    cursor: pointer;
    width: 275px;
    grid-template-columns: 57px 1fr 24px;
    justify-content: center;
    align-items: center;
    &--text {
      color: $white;
      text-transform: uppercase;
      font-size: 18px;
      line-height: 21px;
    }
    &--icon {
      transform: scale(0.8);
    }
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
    transition: 0.5s linear;
    width: 275px;
    transform: translateX(100px);
    button {
      text-transform: uppercase;
      border-radius: 5px;
    }
    &--wrapper {
      display: flex;
    }
  }
  &__login {
    position: absolute;
    width: 57px;
    height: 50px;
    bottom: 30px;
    transition: 0.5s linear;
    transform: scale(0.8);

    &--disable {
      transform: scale(0.8) translateX(-120px);
      transition: 0.5s linear;
    }
  }
  &:hover {
    width: 305px;
    transition: width 0.5s;
    .header__buttons {
      transition: 0.5s linear;

      transform: translateX(0);
    }
  }
}

.buttons-enter-active {
  transition: all 0.3s ease-out;
}

.buttons-leave-active {
  transition: all 0.8s ease-in;
}

.buttons-enter-from {
  transform: translateX(20px);
  // opacity: 0;
}
</style>
