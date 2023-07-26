import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AtmMachine from '../atm/AtmMachine.vue';

describe('ATM Machine', () => {
  it('renders properly', () => {
    const wrapper = mount(AtmMachine, {});
    expect(wrapper.text()).toContain('Bankomat');
  });
});
