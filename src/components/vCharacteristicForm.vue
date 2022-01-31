<template>
  <form class="form" @submit.prevent>
    <my-input
      class="form_input"
      label="Кол-во силы"
      v-model.num="strength"
    ></my-input>
    <my-input
      class="form_input"
      label="Кол-во красноречия"
      v-model.num="eloquence"
    ></my-input>
    <my-input
      class="form_input"
      label="Кол-во мудрости"
      v-model.num="wisdom"
    ></my-input>
    <my-input
      class="form_input"
      label="Кол-во лидерства"
      v-model.num="leadership"
    ></my-input>
    <my-input
      class="form_input"
      label="Кол-во валюты"
      v-model.num="money"
    ></my-input>
    <my-btn class="form_btn" @click="addStats">Выдать</my-btn>
  </form>
</template>

<script>
export default {
  data: () => ({
    strength: "0",
    eloquence: "0",
    wisdom: "0",
    leadership: "0",
    money: "0",
  }),
  emits: ["addstats"],
  methods: {
    addStats() {
      this.$emit("addstats", {
        strength: this.strength,
        eloquence: this.eloquence,
        wisdom: this.wisdom,
        leadership: this.leadership,
        money: this.money,
      });
    },
  },
  mounted() {
    this.strength = "0";
    this.eloquence = "0";
    this.wisdom = "0";
    this.leadership = "0";
    this.money = "0";
  },
};
</script>

<style lang="scss" scoped>
.form {
  &_input {
    margin-bottom: 10px;
  }
  &_btn {
    display: block;
    margin: 0 auto;
  }
}
</style>
