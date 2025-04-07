import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoButton from '../TodoButton.vue'

describe('TodoButton', () => {
  it('renders with default type', () => {
    const wrapper = mount(TodoButton, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('renders with delete type', () => {
    const wrapper = mount(TodoButton, {
      props: {
        type: 'delete'
      },
      slots: {
        default: '×'
      }
    })

    expect(wrapper.text()).toBe('×')
    expect(wrapper.classes()).toContain('bg-transparent')
    expect(wrapper.classes()).toContain('text-danger')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(TodoButton, {
      slots: {
        default: 'Click me'
      }
    })

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
