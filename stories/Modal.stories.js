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