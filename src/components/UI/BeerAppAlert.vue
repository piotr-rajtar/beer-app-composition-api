<template>
  <div :class="[style.alert, style[alertTypeClassName]]" role="alert">
    <p :class="style.paragraph">
      <slot />
    </p>
    <FontAwesomeIcon
      :class="style.icon"
      :icon="['fas', 'xmark']"
      @click="onCloseClick"
    />
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

.alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 800px;
  margin: 0 auto;

  padding: 0.75rem 1.25rem;
  border: 1px solid;
  border-radius: 0.25rem;

  font-size: fonts.$font-size-l;
  line-height: 1.5;
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
  margin: 0;
}

.icon {
  cursor: pointer;
}
</style>
