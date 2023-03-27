<template>
  <div :class="name">
    <!-- logo -->
    <template v-if="logo">
      <a :href="logo.url" :target="logo.target" :class="`${name}__logo`">
        <t-image v-if="logo.icon" :src="logo.icon" :class="`${name}__icon`" />
        <span v-if="logo.title" :class="`${name}__title`">
          {{ logo.title }}
        </span>
        <t-image v-if="logo.url" :src="logo.url" :class="`${name}__title-url`" />
      </a>
    </template>
    <!-- text -->
    <template v-else>
      <div v-if="links && links.length > 0" :class="`${name}__link-list`">
        <template v-for="(link, index) in links" :key="link.name">
          <a :href="link.url" :target="link.target" :class="`${name}__link-item`">
            {{ link.name }}
          </a>
          <div v-if="index !== links.length - 1" :class="`${name}__link-line`">|</div>
        </template>
      </div>
      <div :class="`${name}__text`">{{ text }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent } from 'vue';
import FooterProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-footer`;

export default defineComponent({
  name,
  props: FooterProps,
  setup(props) {
    return {
      name,
      ...toRefs(props),
    };
  },
});
</script>
