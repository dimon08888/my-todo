import React, { useState, useEffect, useRef } from 'react'

import './App.css'

type Todos = {
  id: string
  text: string
  completed: boolean
  edit: boolean
}

enum FilterButtons {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

function App() {
  const [todos, setTodos] = useState<Todos[]>([])
  const [filterTodos, setFilterTodos] = useState<Todos[]>([])
  const [text, setText] = useState('')
  const [changeTodo, setChangeTodo] = useState('')
  const [active, setActive] = useState(FilterButtons.All)

  useEffect(() => {
    setFilterTodos(todos)
  }, [todos])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (text.trim().length) {
      setTodos([
        ...todos,
        { id: new Date().toISOString(), text, completed: false, edit: false },
      ])
      setText('')
    }
  }

  function onDelete(id: string) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function ontoggleChecked(id: string) {
    setTodos(
      todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    )
  }

  function handleAllFilter() {
    setFilterTodos(todos)
    setActive(FilterButtons.All)
  }

  function handleActiveFilter() {
    const newArr = [...todos].filter(todo => !todo.completed)
    setFilterTodos(newArr)
    setActive(FilterButtons.Active)
  }

  function handleCompletedFilter() {
    const newArr = [...todos].filter(todo => todo.completed)
    setFilterTodos(newArr)
    setActive(FilterButtons.Completed)
  }

  function handleMarkAll() {
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: true,
      }))
    )
  }

  function handleClearCompleted() {
    setTodos(todos.filter(todo => !todo.completed))
  }

  function handleEditTodo(todoId: string) {
    setTodos(
      todos.map(todo => {
        if (todo.id !== todoId) {
          return {
            ...todo,
            edit: false,
          }
          // return todo
        }
        return {
          ...todo,
          edit: !todo.edit,
        }
      })
    )
  }

  function onChangeTodo(todoId: string) {
    if (changeTodo.length) {
      setTodos(
        todos.map(todo => {
          if (todo.id !== todoId) return todo
          return {
            ...todo,
            text: changeTodo,
            edit: false,
          }
        })
      )
    }
    setChangeTodo('')
  }

  function onChangeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <div className='App'>
      <h1>What needs to be done?</h1>

      <form onSubmit={onSubmit}>
        <label>
          <input
            className='todo-input'
            type='text'
            placeholder='Enter your todo here'
            onChange={e => setText(e.target.value)}
            value={text}
          />
        </label>
        <button className='todo-button'>Add № {todos.length + 1}</button>
      </form>

      <div className='filters'>
        <button
          className={active === 'All' ? 'action-filter' : 'not-action-filter'}
          onClick={() => handleAllFilter()}
        >
          All
        </button>
        <button
          className={active === 'Active' ? 'action-filter' : 'not-action-filter'}
          onClick={() => handleActiveFilter()}
        >
          Active
        </button>
        <button
          className={active === 'Completed' ? 'action-filter' : 'not-action-filter'}
          onClick={() => handleCompletedFilter()}
        >
          Completed
        </button>
      </div>

      <div className='remaining-info'>
        {todos.length} {todos.length === 1 ? 'task to remaining' : 'tasks to remaining'}
      </div>

      <ul>
        {filterTodos.map(todo => (
          <li className='todo-li' key={todo.id}>
            <input
              className='checkbox'
              type='checkbox'
              checked={todo.completed}
              onChange={() => ontoggleChecked(todo.id)}
            />
            {todo.edit ? (
              <form onSubmit={e => onChangeSubmit(e)}>
                <input
                  className='todo-input-edit'
                  defaultValue={todo.text}
                  type='text'
                  autoFocus
                  onChange={e => setChangeTodo(e.target.value)}
                />
                <button
                  className='todo-button-change'
                  onClick={() => onChangeTodo(todo.id)}
                >
                  Change
                </button>
              </form>
            ) : (
              <span className='todo-list'>{todo.text}</span>
            )}
            <button className='todo-button-edit' onClick={() => handleEditTodo(todo.id)}>
              {todo.edit ? 'Exit' : 'Edit'}
            </button>
            <button className='todo-button-delete' onClick={() => onDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2>Actions</h2>
      <div className='footer-filter'>
        <button className='footer-action-button' onClick={handleMarkAll}>
          Mark All Completed
        </button>
        <button className='footer-action-button' onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
    </div>
  )
}

export default App
