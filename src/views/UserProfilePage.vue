<template>
  <div class="profile" v-if="!userInfo.message">
    <div class="profile__top">
      <v-user-img :imgUrl="returnImgSrs" :isMyFoto="isMyProfile"/>
      <div class="profile__info">
        <div class="profile__FIO">
          {{ userInfo["first-name"] }} {{ userInfo["midl-name"] }}
          {{ userInfo["last-name"] }} <span v-if="isMyProfile" class="profile__edit"><img src="@/assets/edit-icon.svg" alt=""></span>
        </div>
        <div class="profile__block">
          <div class="profile__block-title">Информация:</div>
          <div class="profile__block-wrapper">
            <div class="profile__block-row">
              Факульте: {{ userInfo.faculty }}
            </div>
            <div class="profile__block-row">Курс: {{ userInfo.cours }}</div>
            <div class="profile__block-row">Группа: {{ userInfo.group }}</div>
            <div class="profile__block-row">Деньги: {{ userInfo.money }}</div>
          </div>
        </div>
        <div class="profile__block">
          <div class="profile__block-title">Характеристики:</div>
          <div class="profile__block-wrapper">
            <div
              class="profile__block-row"
              v-for="stat in userInfo.stats"
              :key="stat.name"
            >
              {{ stat.name }}: <span>{{ stat.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import vUserImg from "../components/vUserImg.vue";
export default {
  components: { vUserImg },
  data:() => ({
    isMyProfile: false,
  }),
  computed: {
    ...mapState({
      userInfo: (state) => state.profile.userInfo,
      userId: (state) => state.userInfo.id
    }),
    returnImgSrs(){
      if (this.userInfo.imgUrl){
        return this.userInfo.imgUrl
      } else {
        return 
      }
    }
  },
  methods: {
    ...mapActions(["getUserInfo"]),
  },
  async mounted() {
    await this.getUserInfo(this.$route.params.id);
    this.isMyProfile = this.userInfo._id === this.userId
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.profile {
  margin: 60px 0 0 160px;
  color: #fff;
  &__top {
    display: flex;
    gap: 20px;
  }
  &__FIO {
    font-weight: bold;
    font-size: 36px;
    line-height: 41px;
    margin-bottom: 26px;
  }
  &__edit{
    cursor: pointer;
    vertical-align: middle;
  }

  &__img {
    width: 345px;
    height: 465px;
    border-radius: 20px;
    background: #000;
  }
  &__block {
    font-size: 21px;
    line-height: 24px;
    &-title {
      font-size: 26px;
      line-height: 30px;
      margin-bottom: 24px;
    }
    &-row {
      span {
        color: $red;
      }
    }
    &-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 24px;
      margin-bottom: 40px;
    }
  }
}
</style>
