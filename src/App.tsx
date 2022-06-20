import React, { useState, useEffect } from 'react'

import './App.css'

type Todos = {
  id: string
  text: string
  completed: boolean
  edit: boolean
  isChange: boolean
  changeTime: string
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
  const [totalActive, setTotalActive] = useState<Todos[]>([])
  const [totalCompleted, setTotalCompleted] = useState<Todos[]>([])
  const [time, setTime] = useState('')

  useEffect(() => {
    setFilterTodos(todos)
  }, [todos])

  useEffect(() => {
    setTotalActive(todos.filter(todo => !todo.completed))
  }, [todos])

  useEffect(() => {
    setTotalCompleted(todos.filter(todo => todo.completed))
  }, [todos])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (text.trim().length) {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text,
          completed: false,
          edit: false,
          isChange: false,
          changeTime: '',
        },
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
    setFilterTodos(todos.filter(todo => !todo.completed))
    setActive(FilterButtons.Active)
  }

  function handleCompletedFilter() {
    setFilterTodos(todos.filter(todo => todo.completed))
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

  function getTime() {
    const date = new Date()
    return date.toLocaleString()
  }

  function onChangeTodo(todoId: string) {
    setTime(getTime)
    if (changeTodo.length) {
      setTodos(
        todos.map(todo => {
          if (todo.id !== todoId) {
            return todo
          }
          return {
            ...todo,
            text: changeTodo,
            edit: false,
            isChange: true,
            changeTime: getTime(),
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
            <div className='todo-container'>
              <div className='todo-wrapper'>
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
                <button
                  className='todo-button-edit'
                  onClick={() => handleEditTodo(todo.id)}
                >
                  {todo.edit ? 'Exit' : 'Edit'}
                </button>
                <button className='todo-button-delete' onClick={() => onDelete(todo.id)}>
                  Delete
                </button>
              </div>
              <div>
                {todo.isChange && (
                  <small className='time'>Change was: {todo.changeTime}</small>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='total'>
        <span>Total: {todos.length},</span>
        <span>Active: {totalActive.length},</span>
        <span>Completed: {totalCompleted.length}.</span>
      </div>
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
