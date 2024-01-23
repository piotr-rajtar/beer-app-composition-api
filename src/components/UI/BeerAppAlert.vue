<template>
  <div :class="[style.alert, style[alertTypeClassName]]" role="alert">
    <p :class="style.paragraph" test-id="alertParagraph">
      <slot></slot>
    </p>
    <div :class="style.iconContainer" test-id="closeIcon" @click="onCloseClick">
      <FontAwesomeIcon :icon="['fas', 'xmark']" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { AlertType } from '../../typings';

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const props = defineProps<{
  type: AlertType;
}>();

const alertTypeClassName = computed(() => {
  const alertTypeClassName: { [key in AlertType]: string } = {
    [AlertType.ERROR]: 'alert__type-error',
    [AlertType.WARNING]: 'alert__type-warning',
  };

  return alertTypeClassName[props.type];
});

const onCloseClick = () => emit('close');
</script>

<style lang="scss" module="style">
@use '@/styles/colors.scss';
@use '@/styles/fonts.scss';
@use '@/styles/spacings.scss';

.alert {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;

  margin: 0 auto;
  padding: 2 * spacings.$spacing-unit 4 * spacings.$spacing-unit;
  border: 1px solid;
  border-radius: spacings.$spacing-unit;

  font-size: fonts.$font-size-l;
  line-height: 1.5em;
}

.alert__type-error {
  background: colors.$alert-error-background;
  border-color: colors.$alert-error-border;
  color: colors.$alert-error-font-color;
}
.alert__type-warning {
  background: colors.$alert-warning-background;
  border-color: colors.$alert-warning-border;
  color: colors.$alert-warning-font-color;
}

.paragraph {
  margin: 0 6 * spacings.$spacing-unit 0 0;
}

.iconContainer {
  position: absolute;
  top: 2 * spacings.$spacing-unit;
  right: 4 * spacings.$spacing-unit;

  cursor: pointer;
}
</style>
