<template>
  <div class="login">
    <div class="login__wrapper">
      <h1 class="login__title">Вход</h1>
      <form @submit.prevent>
        <my-input
          require
          label="Почта"
          style="margin-bottom: 24px"
          v-model.email="email"
        ></my-input>
        <my-input
          require
          password
          style="margin-bottom: 50px"
          label="Пароль"
          v-model="password"
        ></my-input>
        <div class="login__bottom">
          <my-btn
            class="login__btn"
            :disabled="validate"
            @click="pushLogin"
            >войти</my-btn
          >
          <router-link class="login__link" to="/">Забыли пароль?</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  computed: {
    ...mapState({
      isAuth: (state) => state.isAuth,
      userId: (state) => state.user.id,
    }),
    validate() {
      if (
        !/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/gm.test(this.email) ||
        !this.password
      )
        return true;
      else return false;
    },
  },
  methods: {
    ...mapActions(["loginAPI"]),
    async pushLogin() {
      const res = await this.loginAPI({
        email: this.email,
        password: this.password,
      });
      if (this.isAuth) {
        this.$router.push(`/user/${this.userId}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  margin-left: 30px;
  align-items: center;
  &__wrapper {
    padding: 25px 20px;
    background: #000;
    color: #fff;
    border-radius: 20px;
  }
  &__title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 25px;
  }
  &__bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__btn {
    text-transform: uppercase;
    border-radius: 5px;
    
  }
  &__link {
    color: #fff;
    font-size: 14px;
  }
}
</style>
