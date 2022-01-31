<template>
  <transition name="popup">
    <div class="popup__wrapper" v-if="popup" @click="close">
      <div class="popup" @click.stop>
        <div class="popup__header">
          <h3 class="popup__title"><slot name="title"></slot></h3>
          <div class="popup__close">
            <img src="@/assets/close.svg" alt="" @click="close" />
          </div>
        </div>
        <div class="popup__body"><slot name="body"></slot></div>
        <div class="popup__footer"><slot name="footer"></slot></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "popup",
  props: {
    popup: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:popup", "close"],
  methods:{
      close(){
          this.$emit("update:popup", false)
          this.$emit("close")
      }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  background: #1a1a1a;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  border-radius: 20px;
  padding: 20px 30px 40px;
  &__wrapper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba($color: #1a1a1a, $alpha: 0.5);
    opacity: 1;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  &__title {
    font-size: 24px;
    color: #fff;
  }
  &__close img {
    width: 18px;
    cursor: pointer;
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.5s ease-out;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
