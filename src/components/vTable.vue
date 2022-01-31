<template>
  <div class="main__table-wrapper" v-if="!loading">
    <div v-if="users.length">
      <table class="main__table">
        <tr>
          <th>ФИО</th>
          <th>Группа</th>
          <th>Курс</th>
          <th>Активация</th>
        </tr>
        <tbody>
          <tr v-for="user in pageTable" :key="user.id">
            <td>{{ user.FIO }}</td>
            <td>{{ user.group }}</td>
            <td>{{ user.cours }}</td>
            <td class="main__table-btn">
              <div @click="activation(user.id)">Активировать</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="main__page">
        <my-pagination
          v-model:page="page"
          :maxPage="maxPage"
          :countBlock="countBlock"
        ></my-pagination>
      </div>
    </div>
    <h2 class="main__subtitle" v-else>Все пользователи активированы</h2>
  </div>
  <div class="loading" v-else><vLoading ></vLoading></div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vLoading from "./vLoading.vue";
export default {
  components: { vLoading },
  data: () => ({
    page: 1,
    countBlock: 2,
    maxPage: 1,
    countRow: 5,
  }),

  computed: {
    ...mapState({
      users: (state) => state.activationUsers.users,
      loading: (state) => state.activationUsers.loading1,
    }),
    pageTable() {
      let start, end;
      switch (this.page) {
        case 1:
          start = 0;
          end =
            this.page * this.countRow <= this.users.length
              ? this.page * this.countRow - 1
              : this.users.length - 1;
          break;

        case this.maxPage:
          start = (this.page - 1) * this.countRow;
          end = this.users.length - 1;
          break;

        default:
          start = (this.page - 1) * this.countRow;
          end = this.page * this.countRow - 1;
          break;
      }
      return this.users.slice(start, end + 1);
    },
  },
  methods: {
    ...mapActions(["getNoActivationUsers", "activationUser"]),
    async activation(id) {
      await this.activationUser(id);
      await this.getNoActivationUsers();
    },
  },
  async mounted() {
    await this.getNoActivationUsers();
    this.maxPage = Math.ceil(this.users.length / this.countRow);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.main {
  &__subtitle {
    color: #fff;
  }
  &__table {
    position: relative;
    width: 100%;
    background: $black;
    border-radius: 10px;
    color: #fff;
    border-collapse: collapse;
    tr {
      th {
        padding: 10px 0;
        border: 1px solid $grey;
      }
      td {
        text-align: center;
        padding: 10px 0;
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

  &__page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

.loading{
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 100px;

}

</style>
