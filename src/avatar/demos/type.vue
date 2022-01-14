<template>
  <div class="tdesign-demo-block">
    <t-avatar :image="image" :hide-on-load-failed="false"></t-avatar>
    <t-avatar :icon="userIconFunc"></t-avatar>
    <t-avatar>
      <template #icon>
        <user-icon />
      </template>
    </t-avatar>
    <t-avatar>U</t-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: { UserIcon },
  setup() {
    const image = 'https://tdesign.gtimg.com/site/avatar.jpg';
    const userIconFunc = () => UserIcon;
    return {
      image,
      userIconFunc,
    };
  },
});
</script>
