<template>
  <div id="nav" v-if="!loading">
    <div><vNavBar /></div>
    <main>
      <router-view></router-view>
    </main>
  </div>
  <v-loading class="loadind" v-else />
</template>

<script>
import { mapActions, mapState } from "vuex";
import vNavBar from "@/components/navBar/vNavBar.vue";
import VLoading from "./components/vLoading.vue";
export default {
  components: {
    vNavBar,
    VLoading,
  },
  methods: {
    ...mapActions(["checAuth"]),
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
    }),
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      await this.checAuth();
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/style.scss";
* {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#nav {
  background: $grey;
  display: grid;
  grid-template-columns: 88px 1fr;
  min-height: 100vh;
}
main {
  min-width: 80vw;
  min-height: 60vh;
}
.loadind {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
