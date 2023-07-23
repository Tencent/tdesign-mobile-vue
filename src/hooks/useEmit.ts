import { ComponentInternalInstance, getCurrentInstance } from 'vue';
import camelCase from 'lodash/camelCase';

export function getPropsApiByEvent(eventName: string) {
  return camelCase(`on-${eventName}`);
}

const useEmit = () => {
  const vm = getCurrentInstance() as ComponentInternalInstance;
  const { emit: customEmit, props } = vm;
  const emit = (eventName: string, ...args: any[]) => {
    customEmit(eventName, ...args);
    const name = getPropsApiByEvent(eventName);
    if (typeof props[name] === 'function') {
      (props[name] as Function)(...args);
    }
  };
  return { emit };
};

export default useEmit;
