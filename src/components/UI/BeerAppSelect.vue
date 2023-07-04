<template>
  <div :class="[style.container, style[selectOrientationClass]]">
    <label :class="style.label" :for="id">
      {{ t(label) }}
    </label>
    <div :class="style.selectContainer">
      <select
        :id="id"
        v-model="activeItem"
        :class="style.select"
        @change="onSelect"
      >
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.value"
        >
          {{ getTranslatedOptionLabel(option.label) }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useCssModule } from 'vue';
import type { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { SelectOrientation } from '../../typings/global.types';
import type { SelectOption } from '../../typings/global.types';

const props = defineProps<{
  id: string;
  defaultValue: unknown;
  label: string;
  options: SelectOption[];
  orientation: SelectOrientation;
}>();

interface SelectEmits {
  (event: 'select', activeItem: unknown): void;
}

const emit = defineEmits<SelectEmits>();

const style = useCssModule('style');
const { t } = useI18n();

const activeItem: Ref<unknown> = ref(props.defaultValue);

const getTranslatedOptionLabel = (
  optionLabel: string | number
): string | number => {
  return typeof optionLabel === 'string' ? t(optionLabel) : optionLabel;
};

const selectOrientationClass = computed(() => {
  const selectOrientationClass: { [key in SelectOrientation]: string } = {
    [SelectOrientation.HORIZONTAL]: 'horizontal',
    [SelectOrientation.VERTICAL]: 'vertical',
  };

  return selectOrientationClass[props.orientation];
});

const onSelect = (): void => {
  emit('select', activeItem.value);
};
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/spacings.scss';

.container {
  display: flex;
  gap: 2 * spacings.$spacing-unit;

  font-size: fonts.$font-size-l;
}

.horizontal {
  align-items: center;
}

.vertical {
  flex-direction: column;
}

.label {
  text-align: center;
}

.selectContainer {
  background: linear-gradient(to top, colors.$white-dark, colors.$white 33%);

  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  min-width: 150px;

  padding: spacings.$spacing-unit 2 * spacings.$spacing-unit;

  border: spacings.$border-width solid colors.$black;
  border-radius: spacings.$spacing-unit;

  &::after {
    grid-area: select;
    justify-self: end;

    content: '';
    background-color: colors.$black;

    width: 1.2em;
    height: 0.6em;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  &:focus-within {
    outline: spacings.$border-width solid colors.$black;
    outline-offset: spacings.$border-width;
  }
}

.select {
  background-color: transparent;

  grid-area: select;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;

  margin: 0;
  padding: 0 1.2em 0 0;

  border: none;
  outline: none;

  cursor: pointer;
}
</style>
