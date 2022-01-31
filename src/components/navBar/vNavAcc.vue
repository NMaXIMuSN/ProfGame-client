<template>
  <div class="header__bottom">
    <img
      @click="$router.push('/user/' + userId)"
      :src=" imgUrl || '@/assets/no-avatar-img.png'"
      alt="ava"
      class="header__logo"
    />
    <div @click="$router.push('/user/' + userId)" class="header__text">
      {{ family }}
    </div>
    <img @click="exit" src="@/assets/exit-icon.svg" alt="" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      userId: (state) => state.user.id,
      imgUrl: (state) => state.userInfo.imgUrl,
      family: (state) => state.userInfo['first-name'],
    }),
  },
  methods: {
    ...mapActions(["logout"]),
    exit(){
      this.logout();
      this.$router.push("/")
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  &__bottom {
    display: grid;
    width: 275px;
    grid-template-columns: 57px 1fr 24px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &__text {
    color: #fff;
    font-size: 18px;
  }
  &__logo {
    width: 57px;
    border-radius: 50%;
  }
}
</style>
