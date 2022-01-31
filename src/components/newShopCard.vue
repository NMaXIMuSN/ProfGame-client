<template>
  <div class="card">
    <img src="@/assets/camera-icon.svg" alt="" class="card__img" />
    <h3 class="card__title">Создать новую карточку</h3>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  width: 400px;
  cursor: pointer;
  height: 400px;
  border: 2px dashed #000000;
  border-radius: 20px;
  transition: 0.25s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__img {
    width: 171px;
  }
  &:hover {
    box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.5);
  }
}
</style>
