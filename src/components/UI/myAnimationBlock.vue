<template>
    <span
      class="card__row"
      :style="{
        top: top,
        left: left,
        right: right,
        bot: bot,
        'animation-duration': `${Math.random() * (10 - 5) + 5}s`,
      }"
    ></span>
</template>

<script>
export default {
  name: "my-span",
  props: {
    top: {
      type: String,
    },
    bot: {
      type: String,
    },
    right: {
      type: String,
    },
    left: {
      type: String,
    },
  },
  computed: {
    style() {
      return {
        top: this.top || "",
        left: this.left || "",
        right: this.right || "",
        bot: this.bot || "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.card__row {
  width: 200px;
  height: 32px;
  transform: rotate(-45deg);
  background: $grey;
  border-radius: 50px;
  position: absolute;
  z-index: -1;
  animation: animationLine 1s linear infinite;
}
@keyframes animationLine {
  0% {
    transform: rotate(-45deg) translateX(-200%) translateY(-200%);
  }
  100% {
    transform: rotate(-45deg) translateX(300%) translateY(300%);
  }
}
</style>
