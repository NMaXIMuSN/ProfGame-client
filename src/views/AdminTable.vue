<template>
  <div class="main">
    <h1 class="main__title">Характиристики пользователей</h1>
    <div v-if="!loading">
      <v-admin-table :data="users" @openPopup="popup"></v-admin-table>
      <div class="main__page">
        <my-pagination v-model:page="page" :maxPage="maxPage"></my-pagination>
      </div>
    </div>
    <div class="loading" v-else><v-loading/></div>
    <popup v-model:popup="visiblePopup" @close="ressetData">
      <template v-slot:title> Выдача характиристик и валюты </template>
      <template v-slot:body>
        <v-characteristic-form @addstats="addstats"></v-characteristic-form>
      </template>
    </popup>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import vAdminTable from "../components/vAdminTable.vue";
import VCharacteristicForm from "../components/vCharacteristicForm.vue";
import VLoading from '../components/vLoading.vue';
export default {
  data: () => ({
    page: 1,
    userId: null,
    visiblePopup: false,
  }),
  components: { vAdminTable, VCharacteristicForm, VLoading },
  methods: {
    ...mapActions(["getUsersCharacteristic", "addStats"]),
    popup(value) {
      this.userId = value;
      this.visiblePopup = true;
    },
    ressetData() {
      this.userId = null;
    },
    async addstats(stats) {
      const data = {
        id: this.userId,
        stats,
      };
      await this.addStats(data);
      this.visiblePopup = false;
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.characteristicUsers.users,
      maxPage: (state) => state.characteristicUsers.maxPage,
      loading: (state) => state.characteristicUsers.loadingTable,
    }),
  },
  watch:{
    async page(value,){
      await this.getUsersCharacteristic(value);
    }
  },
  async mounted() {
    await this.getUsersCharacteristic(this.page);
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin: 50px 80px;
  &__title {
    color: #fff;
    margin-bottom: 20px;
  }
  &__page {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}

.loading{
  width: 100px;
  height: 100px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
