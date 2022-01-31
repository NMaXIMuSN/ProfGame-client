<template>
  <div class="img__wrapper">
    <div class="img__class">
      <img class="img" :src="imgUrl ? imgUrl : require('@/assets/no-avatar-img.png')" alt="" />
      <div class="img__blok" v-if="isMyFoto">
        <div class="img__li" @click="popup = !popup">Изменить фотографию</div>
      </div>
    </div>
    <popup v-model:popup="popup" >
      <template v-slot:title>Загрузга фотографии</template>
      <template v-slot:body
        ><div class="form__text">
          Вы можете загрузить изображение в формате JPG, GIF или PNG.
        </div>
        <form class="form">
          <input
            type="file"
            id="file"
            class="input-file"
            accept=".jpg, .jpeg, .png, .gif"
            @change="handleFileUpload"
          />
          <label for="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
            >
              <path
                fill="#fff"
                d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
              ></path>
            </svg>
            <span>{{ fileName || "Выберете файл" }}</span>
          </label>
          <my-btn @click="submitFile" class="form__btn">отправить </my-btn>
        </form></template
      >
    </popup>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  props: {
    imgUrl: {
      type: String
    },
    isMyFoto: false,
  },

  data: () => ({
    file: null,
    fileName: "",
    popup: false,
  }),
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    async submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      console.log(formData.getAll("file"));
      await api.post("/uploadAvar/" + this.$route.params.id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.img {
  width: 345px;
  height: 465px;
  background: rgba(#000, .5);
  &__class {
    width: 345px;
    height: 465px;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
  }
  &__blok {
    position: absolute;
    transform: translateY(100%);
    background: rgba($color: #000000, $alpha: 0.5);
    position: absolute;
    bottom: 0px;
    width: 100%;
    transition: transform 0.125s ease-in;
    text-align: center;
    padding: 15px;
  }
  &:hover + &__blok,
  &__blok:hover {
    transform: translateY(0);
  }

  &__li {
    cursor: pointer;
    display: inline-block;
  }
}

.input-file + label {
  color: #fff;
  background: $red;
  font-size: 1.25rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 0.625rem 1.25rem;
  max-width: 80%;
  margin-bottom: 30px;

  svg {
    color: #fff;
    margin-right: 0.25em;
  }
}

.form {
  text-align: center;
  &__btn {
    display: block;
    margin: 0 auto;
  }
  &__text {
    margin-bottom: 30px;
  }
}

.input-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
