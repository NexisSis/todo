import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoInput from '../TodoInput.vue'

describe('TodoInput', () => {
  it('renders input and button', () => {
    const wrapper = mount(TodoInput)

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Add a new task...')
  })

  it('emits add-todo event with trimmed value when button is clicked', async () => {
    const wrapper = mount(TodoInput)
    const input = wrapper.find('input')

    await input.setValue('  New todo  ')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('add-todo')).toBeTruthy()
    expect(wrapper.emitted('add-todo')[0]).toEqual(['New todo'])
    expect(input.element.value).toBe('')
  })

  it('emits add-todo event with trimmed value when enter key is pressed', async () => {
    const wrapper = mount(TodoInput)
    const input = wrapper.find('input')

    await input.setValue('  New todo  ')
    await input.trigger('keyup.enter')

    expect(wrapper.emitted('add-todo')).toBeTruthy()
    expect(wrapper.emitted('add-todo')[0]).toEqual(['New todo'])
    expect(input.element.value).toBe('')
  })

  it('does not emit add-todo event when input is empty', async () => {
    const wrapper = mount(TodoInput)
    const input = wrapper.find('input')

    await input.setValue('   ')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('add-todo')).toBeFalsy()
  })
})
