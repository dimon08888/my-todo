import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

test('Add new todo when click button Add №', () => {
  render(<App />)

  const addButton = screen.getByRole('button', { name: /Add № 1/i })
  const todoInput = screen.getByRole('textbox', { name: /What needs to be done/i })
  const textToRemaining = screen.getByText(/0 tasks to remaining/i)

  userEvent.type(todoInput, 'Hello')
  userEvent.click(addButton)

  const newTodo = screen.getByText(/Hello/dfij)

  expect(newTodo).toBeVisible()
  expect(todoInput).toHaveValue('')
  expect(addButton).toHaveTextContent(/Add № 2/i)
  expect(textToRemaining).toHaveTextContent(/1 task to remaining/i)
})
