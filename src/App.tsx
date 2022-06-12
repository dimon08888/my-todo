import React, { useState, useEffect } from 'react'
import './App.css'

type Todos = {
  id: string
  text: string
  completed: boolean
  edit: boolean
}

function App() {
  const [todos, setTodos] = useState<Todos[]>([])
  const [filterTodos, setFilterTodos] = useState<Todos[]>([])
  const [text, setText] = useState('')
  const [changeTodo, setChangeTodo] = useState('')

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
    const newArr = [...todos]
    setFilterTodos(newArr)
  }

  function handleActiveFilter() {
    const newArr = [...todos].filter(todo => !todo.completed)
    setFilterTodos(newArr)
  }

  function handleCompletedFilter() {
    const newArr = [...todos].filter(todo => todo.completed)
    setFilterTodos(newArr)
  }

  function handleMarkAll() {
    setTodos(
      todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      }))
    )
  }

  function handleClearCompleted() {
    setTodos(todos.filter(todo => !todo.completed))
  }

  function handleEditTodo(todoId: string) {
    setTodos(
      todos.map(todo => {
        if (todo.id !== todoId) return todo
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
          }
        })
      )
    }
    setChangeTodo('')
  }

  return (
    <div className='App'>
      <h1>What needs to be done?</h1>

      <form onSubmit={onSubmit}>
        <label>
          <input type='text' onChange={e => setText(e.target.value)} value={text} />
        </label>
        <button>Add #{todos.length + 1}</button>
      </form>

      <div className='filters'>
        <button onClick={() => handleAllFilter()}>All</button>
        <button onClick={() => handleActiveFilter()}>Active</button>
        <button onClick={() => handleCompletedFilter()}>Completed</button>
      </div>

      <div className='remaining-info'>
        {todos.length} {todos.length === 1 ? 'task to remaining' : 'tasks to remaining'}
      </div>

      <ul>
        {filterTodos.map(todo => (
          <li key={todo.id}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => ontoggleChecked(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
            <button className='delete' onClick={() => onDelete(todo.id)}>
              &times;
            </button>
            {todo.edit && (
              <div>
                <input
                  type='text'
                  value={changeTodo}
                  onChange={e => setChangeTodo(e.target.value)}
                />
                <button onClick={() => onChangeTodo(todo.id)}>Change</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <h2>Actions</h2>
      <div className='footer-filter'>
        <button onClick={handleMarkAll}>Mark All Completed</button>
        <button onClick={handleClearCompleted}>Clear Completed</button>
      </div>
    </div>
  )
}

export default App
