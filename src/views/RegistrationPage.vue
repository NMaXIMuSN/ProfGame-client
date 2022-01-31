<template>
  <div class="regist">
    <div class="regist__wrapper">
      <h1 class="regist__title">Регистрация</h1>
      <form @submit.prevent class="regist__form">
        <my-input
          require
          label="Почта*"
          style="margin-bottom: 24px"
          v-model.email="email"
        ></my-input>
        <my-input
          require
          label="ФИО*"
          style="margin-bottom: 24px"
          v-model="FIO"
        ></my-input>
        <my-input
          require
          label="Группа*"
          style="margin-bottom: 24px"
          v-model="group"
        ></my-input>
        <my-input
          require
          label="Курс*"
          style="margin-bottom: 24px"
          v-model="cours"
        ></my-input>
        <my-input
          require
          label="Факультет*"
          style="margin-bottom: 24px"
          v-model="faculty"
        ></my-input>
        <my-input
          require
          label="Пароль*"
          password
          style="margin-bottom: 50px"
          v-model="password"
        ></my-input>
        <my-btn class="regist__btn" :disabled="validate" @click="registrationAPI"
          >Зарегистрироваться</my-btn
        >
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex"
export default {
  data: () => ({
    email: "",
    FIO: "",
    group: "",
    cours: "",
    faculty: "",
    password: "",
  }),
  methods: {
    ...mapActions(["registration"]),
    async registrationAPI() {
      const first = this.FIO.split(" ")[1] || " ";
      const last = this.FIO.split(" ")[0] || " ";
      const midl = this.FIO.split(" ")[2] || " ";
      const respons = await this.registration({
        email: this.email,
        password: this.password,
        first,
        last,
        midl,
        group: this.group,
        cours: this.cours,
        faculty: this.faculty,
      });
      if (respons.id) {
        this.$router.push("/user/" + respons.id);
      }
    },
  },
  computed: {
    ...mapState({
    }),
    validate() {
      if (
        !/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/gm.test(this.email) ||
        !this.password ||
        !this.FIO ||
        !this.group ||
        !this.cours ||
        !this.faculty
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.regist {
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
    text-align: center;
    margin-bottom: 25px;
    font-size: 30px;
  }
  &__btn {
    text-transform: uppercase;
    border-radius: 5px;
    transition: 0.5s;
    display: block;
    margin: 0 auto;
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
}
</style>
