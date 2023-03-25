<template>
  <button :class="style.button">
    <slot />
  </button>
</template>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/spacings.scss';

.button {
  background: radial-gradient(colors.$yellow-light, colors.$yellow-dark);
  width: 200px;
  height: 60px;
  border-radius: spacings.$spacing-unit;
  border: 0;
  outline: none;
  box-shadow: 7px 6px 28px 1px colors.$button-shadow;
  font-weight: fonts.$font-bold;
  cursor: pointer;
  transition: 0.2s all;
  line-height: 1.5em;
            
  &:hover {
    border: 1px solid colors.$black;
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px colors.$button-shadow;
  }
}
</style>
