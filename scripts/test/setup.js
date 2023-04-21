import { config } from '@vue/test-utils';

const transitionStub = () => ({
  render() {
    return this.$options._renderChildren;
  },
});

config.global.stubs = {
  teleport: true,
  transition: transitionStub,
};
