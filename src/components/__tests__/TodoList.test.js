import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TodoList from '../TodoList.vue'

describe('TodoList', () => {
  const todos = [
    { id: 1, text: 'First todo', completed: false },
    { id: 2, text: 'Second todo', completed: true }
  ]

  it('renders list of todos', () => {
    const wrapper = mount(TodoList, {
      props: { todos }
    })

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(2)
    expect(items[0].text()).toContain('First todo')
    expect(items[1].text()).toContain('Second todo')
  })

  it('emits toggle-todo event when a todo is toggled', async () => {
    const wrapper = mount(TodoList, {
      props: { todos }
    })

    const firstTodo = wrapper.find('li')
    await firstTodo.find('input[type="checkbox"]').trigger('change')

    expect(wrapper.emitted('toggle-todo')).toBeTruthy()
    expect(wrapper.emitted('toggle-todo')[0]).toEqual([1])
  })

  it('emits remove-todo event when a todo is removed', async () => {
    const wrapper = mount(TodoList, {
      props: { todos }
    })

    const firstTodo = wrapper.find('li')
    await firstTodo.find('button').trigger('click')

    expect(wrapper.emitted('remove-todo')).toBeTruthy()
    expect(wrapper.emitted('remove-todo')[0]).toEqual([1])
  })

  it('renders empty list when no todos are provided', () => {
    const wrapper = mount(TodoList, {
      props: { todos: [] }
    })

    expect(wrapper.findAll('li')).toHaveLength(0)
  })
})
