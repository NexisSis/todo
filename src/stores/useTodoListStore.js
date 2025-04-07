import { defineStore } from 'pinia'
import { createTodosStorage } from '../services/storage/todosStorage'

const createTodo = (todos, text) => ({
  id: getNextId(todos),
  text,
  completed: false
})

const findTodoById = (todos, id) => todos.find((todo) => todo.id === id)

const toggleTodoCompletion = (todo) => ({
  ...todo,
  completed: !todo.completed
})

const getNextId = (todos) => {
  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0)
  return maxId + 1
}

export const useTodoListStore = defineStore('todoList', {
  state: () => ({
    todos: [],
    storage: createTodosStorage()
  }),

  getters: {
    getNextId: () => (items) => getNextId(items)
  },

  actions: {
    async initialize() {
      try {
        console.log('Initializing store...')
        const savedTodos = await this.storage.load()
        console.log('Loaded todos:', savedTodos)
        this.todos = savedTodos
      } catch (error) {
        console.error('Error initializing store:', error)
        this.todos = []
      }
    },

    async addTodo(text) {
      try {
        console.log('Adding todo:', text)
        const newTodo = createTodo(this.todos, text)
        const updatedTodos = [...this.todos, newTodo]
        await this.storage.save(updatedTodos)
        this.todos = updatedTodos
        console.log('Todo added successfully')
      } catch (error) {
        console.error('Error adding todo:', error)
      }
    },

    async toggleTodo(id) {
      try {
        console.log('Toggling todo:', id)
        const todo = findTodoById(this.todos, id)

        if (!todo) {
          return
        }

        const updatedTodo = toggleTodoCompletion(todo)
        const updatedTodos = this.todos.map((t) => (t.id === id ? updatedTodo : t))

        await this.storage.save(updatedTodos)
        this.todos = updatedTodos
        console.log('Todo toggled successfully')
      } catch (error) {
        console.error('Error toggling todo:', error)
      }
    },

    async deleteTodo(id) {
      try {
        console.log('Deleting todo:', id)
        const todo = findTodoById(this.todos, id)

        if (!todo) {
          return
        }

        // Create the new todos array without the deleted todo
        const updatedTodos = this.todos.filter((todo) => todo.id !== id)

        // Update the store state first
        this.todos = updatedTodos

        // Then save to storage
        await this.storage.save(updatedTodos)
        console.log('Todo deleted successfully')
      } catch (error) {
        console.error('Error deleting todo:', error)
        // Revert the state if save fails
        this.todos = [...this.todos]
      }
    },

    async clearTodos() {
      try {
        console.log('Clearing all todos')
        await this.storage.clear()
        this.todos = []
        console.log('Todos cleared successfully')
      } catch (error) {
        console.error('Error clearing todos:', error)
        // Don't clear todos if storage operation fails
      }
    }
  }
})
