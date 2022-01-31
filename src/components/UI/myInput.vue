<template>
  <div class="custom__input">
    <label class="label" :class="{ label__error: error || errorEmail }">
      {{ label }}</label
    >
    <input
      :type="isType"
      class="input"
      :class="{ input__error: error || errorEmail }"
      :value="modelValue"
      @input="input"
      @blur="valid"
    />
    <img
      src="@/assets/password-visible-icon.svg"
      alt=""
      @click="passVisibl = !passVisibl"
      v-if="password"
    />
    <transition>
      <div class="input__text" v-if="error && require">обязательное поле</div>
    </transition>
    <transition>
      <div class="input__text" v-if="errorEmail && require">
        адрес электронной почты
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: {
      type: String,
    },
    password: {
      type: Boolean,
      default: false,
    },
    modelModifiers: {
      default: () => ({}),
    },
    focus: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    require: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: false,
      errorEmail: false,
      passVisibl: false,
    };
  },
  emit: ["update:modelValue"],
  methods: {
    valid(event) {
      if (this.modelModifiers.email) {
        const isEmail = /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/gm.test(
          event.target.value
        );
        if (isEmail) {
          this.errorEmail = false;
        } else this.errorEmail = true;
      } else if (event.target.value === "") this.error = true;
      else this.error = false;
    },
    input(event) {
      this.valid(event);
      let value = event.target.value;
      if (this.modelModifiers.num) {
        value = this.modelValue;
        if (/^[0-9]+$/gm.test(event.target.value)) {
          value = event.target.value;
        } else if (event.target.value === "") {
          value = "";
        } else event.target.value = this.modelValue;
      }
      this.$emit("update:modelValue", value);
    },
  },
  computed: {
    isType() {
      if (this.passVisibl) return "password";
      else return "text";
    },
  },
  mounted() {
    if (this.password) this.passVisibl = true;
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";
.custom__input {
  position: relative;
  img {
    position: absolute;
    right: 2px;

    top: 45%;
  }
}
.input {
  outline: none;
  padding: 5px 25px;
  width: 100%;
  background: transparent;
  border: none;
  color: #fff;
  border-bottom: 1px solid #fff;
  line-height: 1.2;
  font-size: 18px;
  transition: all 0.5s;

  &__error {
    border-bottom: 1px solid $red;
  }
  &__text {
    color: $red;
    font-size: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
  }
}
.label {
  font-size: 18px;
  color: $white;
  transition: color 0.5s;
  &__error {
    color: $red;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
