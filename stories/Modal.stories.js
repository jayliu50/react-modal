import React, { useState } from 'react'
import { Text, Button } from 'theme-ui'

// Import the built module components
const { Modal, ModalTitle, ModalContent, ModalFooter } = require('../dist/index.js')

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
}

// Define play functions using @storybook/test utilities
const testBasicFunctionality = async (context) => {
  if (typeof window !== 'undefined' && window.TestUtils) {
    const { expect, userEvent, within } = window.TestUtils
    const canvas = within(context.canvasElement)
    
    // Find and click the open button
    const openButton = canvas.getByTestId('open-button')
    await userEvent.click(openButton)
    
    // Wait for modal to appear and check content
    await expect(canvas.getByText('Welcome!')).toBeInTheDocument()
    await expect(canvas.getByText('This is the modal example')).toBeInTheDocument()
    
    // Test closing the modal
    const closeButton = canvas.getByTestId('close-button')
    await userEvent.click(closeButton)
  }
}

export const Basic = () => {
  const [open, setOpen] = useState(false)
  return React.createElement('div', {},
    React.createElement(Button, { 
      'data-testid': 'open-button',
      onClick: () => setOpen(true) 
    }, 'open'),
    React.createElement(Modal, { 
      open: open, 
      onClose: () => setOpen(false) 
    }, ({ onClose }) => 
      React.createElement('div', {},
        React.createElement(ModalTitle, {},
          React.createElement(Text, {
            sx: {
              fontSize: 2,
              fontWeight: 'medium',
            }
          }, 'Welcome!')
        ),
        React.createElement(ModalContent, {},
          React.createElement(Text, {}, 'This is the modal example')
        ),
        React.createElement(ModalFooter, {},
          React.createElement(Button, { 
            'data-testid': 'close-button',
            variant: 'pill', 
            onClick: onClose 
          }, 'OK')
        )
      )
    )
  )
}

// Add play property for automated testing
Basic.play = testBasicFunctionality

// Define play function for text input functionality
const testTextInputFunctionality = async (context) => {
  if (typeof window !== 'undefined' && window.TestUtils) {
    const { expect, userEvent, within } = window.TestUtils
    const canvas = within(context.canvasElement)
    
    // Step 1: Start with dialog closed (verify open button is visible)
    const openButton = canvas.getByTestId('text-input-open-button')
    await expect(openButton).toBeInTheDocument()
    
    // Step 2: Click to open the dialog with a text input
    await userEvent.click(openButton)
    
    // Wait for modal to appear and check for text input
    await expect(canvas.getByText('Enter your message')).toBeInTheDocument()
    const textInput = canvas.getByTestId('text-input-field')
    await expect(textInput).toBeInTheDocument()
    
    // Step 3: Type "my text input" into the input
    await userEvent.clear(textInput)
    await userEvent.type(textInput, 'my text input')
    
    // Verify the text was entered
    await expect(textInput).toHaveValue('my text input')
    
    // Step 4: Close the dialog
    const closeButton = canvas.getByTestId('text-input-close-button')
    await userEvent.click(closeButton)
  }
}

export const WithTextInput = () => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  
  return React.createElement('div', {},
    React.createElement(Button, { 
      'data-testid': 'text-input-open-button',
      onClick: () => setOpen(true) 
    }, 'Open Text Input Dialog'),
    React.createElement(Modal, { 
      open: open, 
      onClose: () => setOpen(false) 
    }, ({ onClose }) => 
      React.createElement('div', {},
        React.createElement(ModalTitle, {},
          React.createElement(Text, {
            sx: {
              fontSize: 2,
              fontWeight: 'medium',
            }
          }, 'Enter your message')
        ),
        React.createElement(ModalContent, {},
          React.createElement('div', {
            sx: {
              padding: 2
            }
          },
            React.createElement('input', {
              'data-testid': 'text-input-field',
              type: 'text',
              value: inputValue,
              onChange: (e) => setInputValue(e.target.value),
              placeholder: 'Type your message here...',
              style: {
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }
            })
          )
        ),
        React.createElement(ModalFooter, {},
          React.createElement(Button, { 
            'data-testid': 'text-input-close-button',
            variant: 'pill', 
            onClick: onClose 
          }, 'Close')
        )
      )
    )
  )
}

// Add play property for automated testing
WithTextInput.play = testTextInputFunctionality