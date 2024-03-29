<template>
  <button
    :class="[
      style.button,
      style[buttonColorClassName],
      style[buttonSizeClassName],
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { ButtonColor, ButtonType } from '../../typings';

const props = withDefaults(
  defineProps<{
    color?: ButtonColor;
    disabled?: boolean;
    type?: ButtonType;
  }>(),
  {
    color: ButtonColor.DEFAULT,
    type: ButtonType.DEFAULT,
  }
);

const buttonColorClassName = computed(() => {
  const buttonColorClassName: { [key in ButtonColor]: string } = {
    [ButtonColor.DANGER]: 'button__color--danger',
    [ButtonColor.DEFAULT]: 'button__color--default',
  };

  return buttonColorClassName[props.color];
});

const buttonSizeClassName = computed(() => {
  const buttonSizeClassName: { [key in ButtonType]: string } = {
    [ButtonType.DEFAULT]: 'button__size--default',
    [ButtonType.PAGINATION]: 'button__size--pagination',
  };

  return buttonSizeClassName[props.type];
});
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/mixins.scss';
@use '@/styles/spacings.scss';

.button {
  border-radius: spacings.$spacing-unit;
  border: 0;
  outline: none;
  box-shadow: 7px 6px 28px 1px colors.$button-shadow;

  font-weight: fonts.$font-bold;
  line-height: 1.5em;

  transition: 0.2s all;

  cursor: pointer;

  &:hover {
    border: 1px solid colors.$black;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px colors.$button-shadow;
  }

  &:focus-within {
    outline: spacings.$border-width solid colors.$black;
    outline-offset: spacings.$border-width;
  }

  &:disabled {
    background: radial-gradient(colors.$gray-light-01, colors.$gray);

    color: colors.$black;

    cursor: not-allowed;
  }
}

.button__color--danger {
  background: radial-gradient(colors.$red-light-01, colors.$red-light-02);
}

.button__color--default {
  background: radial-gradient(colors.$yellow-light-02, colors.$yellow-dark);
}

.button__size--default {
  width: 200px;
  height: 60px;

  @include mixins.mobile {
    width: 100%;
  }
}

.button__size--pagination {
  width: 60px;
  height: 60px;
}
</style>
