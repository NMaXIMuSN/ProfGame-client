<template>
  <div class="main">
    <h1 class="main__title">Активация пользователей</h1>
    <v-table/>
  </div>
</template>

<script>
import vTable from '../components/vTable.vue';
export default {
  components: { vTable },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.main {
  margin: 50px 80px;
  &__title {
    color: #fff;
    margin-bottom: 20px;
  }
}
</style>
