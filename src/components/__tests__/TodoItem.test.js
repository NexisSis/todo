import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoItem from '../TodoItem.vue'

describe('TodoItem', () => {
  const defaultProps = {
    id: 1,
    text: 'Test todo',
    completed: false
  }

  it('renders todo text and checkbox', () => {
    const wrapper = mount(TodoItem, {
      props: defaultProps
    })

    expect(wrapper.text()).toContain('Test todo')
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('applies completed styles when todo is completed', () => {
    const wrapper = mount(TodoItem, {
      props: {
        ...defaultProps,
        completed: true
      }
    })

    const textSpan = wrapper.find('span')
    expect(textSpan.classes()).toContain('line-through')
    expect(textSpan.classes()).toContain('text-gray-500')
  })

  it('emits toggle-todo event when checkbox is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: defaultProps
    })

    await wrapper.find('input[type="checkbox"]').trigger('change')
    expect(wrapper.emitted('toggle-todo')).toBeTruthy()
    expect(wrapper.emitted('toggle-todo')[0]).toEqual([1])
  })

  it('emits remove-todo event when delete button is clicked', async () => {
    const wrapper = mount(TodoItem, {
      props: defaultProps
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('remove-todo')).toBeTruthy()
    expect(wrapper.emitted('remove-todo')[0]).toEqual([1])
  })
})
