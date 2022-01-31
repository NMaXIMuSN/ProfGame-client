<template>
  <button><slot></slot></button>
</template>

<script>
export default {
  name: "my-btn"
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
button {
  text-align: center;
  cursor: pointer;
  background: $red;
  padding: 8px 12px;
  font-size: 18px;
  line-height: 21px;
  border-radius: 10px;
  color: $white;
  border: none;
  outline: none;
  transition: 0.5s;
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
}
</style>
