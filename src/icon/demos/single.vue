<template>
  <div class="t-demo-iconfont">
    <div class="t-demo-row">
      <letters-t-icon @click="onIconClick" />
      <letters-d-icon />
      <letters-e-icon />
      <letters-s-icon />
      <letters-i-icon />
      <letters-g-icon />
      <letters-n-icon />
    </div>
    <br />
    <div class="t-demo-row">
      <component-checkbox-icon />
      <component-breadcrumb-icon />
      <component-input-icon />
      <component-switch-icon />
      <component-dropdown-icon />
      <component-radio-icon />
      <component-steps-icon />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LettersTIcon,
  LettersDIcon,
  LettersSIcon,
  LettersEIcon,
  LettersIIcon,
  LettersNIcon,
  LettersGIcon,
  ComponentCheckboxIcon,
  ComponentInputIcon,
  ComponentSwitchIcon,
  ComponentBreadcrumbIcon,
  ComponentDropdownIcon,
  ComponentRadioIcon,
  ComponentStepsIcon,
} from 'tdesign-icons-vue-next';

const onIconClick = () => {
  console.log('icon was clicked.');
};
</script>
