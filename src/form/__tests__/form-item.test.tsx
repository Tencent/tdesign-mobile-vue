import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { CheckCircleFilledIcon } from 'tdesign-icons-vue-next';
import { FormItem, Form } from '../index.ts';
import type { TdFormItemProps } from '../type';
import Input from '../../input';
import config from '../../config';

const { prefix } = config;

const name = `${prefix}-form`;

describe('FormItem', () => {
  describe('props', () => {
    it('help[string]', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" help="help text">
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find(`.${name}__item-help`).text()).toBe('help text');
    });

    it('help[function]', () => {
      const wrapper = mount({
        setup() {
          const renderHelp = () => <CheckCircleFilledIcon />;

          return () => (
            <Form>
              <FormItem label="label" name="name" help={renderHelp}>
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.findComponent(CheckCircleFilledIcon).exists()).toBeTruthy();
    });

    it('labelAlign[left/right/top]', () => {
      const labelAlignList: TdFormItemProps['labelAlign'][] = ['left', 'right', 'top'];

      labelAlignList.forEach((labelAlign) => {
        const wrapper = mount({
          setup() {
            return () => (
              <Form label-align="right">
                <FormItem label="label" name="name" labelAlign={labelAlign}>
                  <Input id="name" />
                </FormItem>
              </Form>
            );
          },
        });
        if (labelAlign) {
          expect(wrapper.find(`.${name}__label`).classes(`${name}__label--${labelAlign}`)).toBeTruthy();
        }
      });
    });
  });

  describe('slots', () => {
    it('help', () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Form>
              <FormItem label="label" name="name" v-slots={{ help: () => 'slot: help text ' }}>
                <Input id="name" />
              </FormItem>
            </Form>
          );
        },
      });

      expect(wrapper.find(`.${name}__item-help`).text()).toBe('slot: help text');
    });
  });
});
