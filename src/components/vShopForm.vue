<template>
  <form class="form" @submit.prevent>
    <my-input
      class="form__input"
      require
      label="Название предмета"
      v-model="newCardDate.name"
    />
    <my-input
      class="form__input"
      require
      label="Сила"
      v-model.num="newCardDate.stats[0]"
    />
    <my-input
      class="form__input"
      require
      label="Красноречие"
      v-model.num="newCardDate.stats[1]"
    />
    <my-input
      class="form__input"
      require
      label="Мудрость"
      v-model.num="newCardDate.stats[2]"
    />
    <my-input
      class="form__input"
      require
      label="Лидерство"
      v-model.num="newCardDate.stats[3]"
    />
    <my-input
      class="form__input"
      require
      label="Цена"
      v-model.num="newCardDate.price"
    />
    <label class="form__input-label">Загрузите фотографию предмета</label>
    <my-upload
      class="form__input form__input-file"
      v-model:file="newCardDate.fileFoto"
      v-model:fileName="newCardDate.fileFotoName"
    />
    <my-btn class="form__btn" :disabled="disableBtn" @click="addCard">Создать</my-btn>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      newCardDate: (state) => state.shop.newCardDate,
    }),
    disableBtn(){
      return !this.newCardDate.fileFoto || !this.newCardDate.price || !this.newCardDate.stats[3] || !this.newCardDate.stats[2] || !this.newCardDate.stats[1] || !this.newCardDate.stats[0] || !this.newCardDate.name
    }
  },
  methods:{
    ...mapActions(["createShopCard","getShop"]),
    async addCard(){
      await this.createShopCard(); 
      await this.getShop()
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  &__input {
    margin-bottom: 10px;
    &-file {
      margin: 20px 0;
      text-align: center;
    }
    &-label {
      font-size: 18px;
      color: #fff;
    }
  }
  &__btn {
    margin: 0 auto;
    display: block;
  }
}
</style>
