<template>
  <div class="main__table-wrapper">
    <table class="main__table" v-if="data.length">
      <tr>
        <th>ФИО</th>
        <th>Группа</th>
        <th>Сила</th>
        <th>Красноречие</th>
        <th>Мудрость</th>
        <th>Лидерство</th>
        <th>Валюта</th>
      </tr>
      <tr v-for="user in data" :key="user.id">
        <td>{{ user.FIO }}</td>
        <td>{{ user.group }}</td>
        <td>{{ user.stats[0].value }}</td>
        <td>{{ user.stats[1].value }}</td>
        <td>{{ user.stats[2].value }}</td>
        <td>{{ user.stats[3].value }}</td>
        <td>{{ user.money }}</td>
        <td class="main__table-btn">
          <div @click="openPupap(user.id)">Добавить</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      reqire: true,
    },
  },
  emits:["openPopup"],
  methods:{
    openPupap(id){
      this.$emit("openPopup", id)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.main {
  &__subtitle {
    color: #fff;
  }
  &__table {
    width: 100%;
    background: $black;
    border-radius: 20px;
    color: #fff;
    border-collapse: collapse;
    tr {
      th {
        padding: 25px 0;
        border: 1px solid $grey;
      }
      td {
        text-align: center;
        padding: 20px 0;
        border: 1px solid $grey;
      }
    }
    &-btn div {
      color: $red;
      position: relative;
      overflow: hidden;
      display: inline-block;

      cursor: pointer;
      &::after {
        width: 100%;
        height: 2px;
        background: $red;
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        transition: transform 0.5s ease-out;
        transform: translateX(-100%);
      }
      &:hover::after {
        transition: transform 0.5s ease-in;
        transform: translateX(0);
      }
    }
  }
}
</style>
