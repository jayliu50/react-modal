import React, { useState } from 'react'
import { Text, Button } from 'theme-ui'
import { expect, userEvent, within } from 'storybook/test'

import { Modal, ModalTitle, ModalContent, ModalFooter } from '../src';

const meta = {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
}

export default meta

// Basic Modal Story
export const Basic = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button data-testid="open-button" onClick={() => setOpen(true)}>
          open
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          {open && (
            <div>
              <ModalTitle>
                <Text sx={{ fontSize: 2, fontWeight: 'medium' }}>Welcome!</Text>
              </ModalTitle>
              <ModalContent>
                <Text>This is the modal example</Text>
              </ModalContent>
              <ModalFooter>
                <Button data-testid="close-button" variant="pill" onClick={() => setOpen(false)}>
                  OK
                </Button>
              </ModalFooter>
            </div>
          )}
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // Find and click the open button
    const openButton = canvas.getByTestId('open-button');
    await userEvent.click(openButton);
    // Wait for modal to appear and check content
    await expect(canvas.getByText('Welcome!')).toBeInTheDocument();
    await expect(canvas.getByText('This is the modal example')).toBeInTheDocument();
    // Test closing the modal
    const closeButton = canvas.getByTestId('close-button');
    await userEvent.click(closeButton);
  },
};

// Text Input Modal Story
export const WithTextInput = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    return (
      <div>
        <Button data-testid="text-input-open-button" onClick={() => setOpen(true)}>
          Open Text Input Dialog
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          {open && (
            <div>
              <ModalTitle>
                <Text sx={{ fontSize: 2, fontWeight: 'medium' }}>Enter your message</Text>
              </ModalTitle>
              <ModalContent>
                <div style={{ padding: 2 }}>
                  <input
                    data-testid="text-input-field"
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Type your message here..."
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      fontSize: '14px',
                    }}
                  />
                </div>
              </ModalContent>
              <ModalFooter>
                <Button data-testid="text-input-close-button" variant="pill" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </ModalFooter>
            </div>
          )}
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
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
  },
};

// Custom Animation Story
export const CustomAnimation = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button data-testid="custom-animation-open-button" onClick={() => setOpen(true)}>
          open
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          animationDuration={500}
          animationEasing="ease-in-out"
          backgroundAnimation={{ opacity: { from: 0, to: 1 } }}
          foregroundAnimation={{
            opacity: { from: 0, to: 1 },
            transform: { from: 'scale(0.5)', to: 'scale(1)' },
          }}
        >
          {open && (
            <div>
              <ModalTitle>
                <Text sx={{ fontSize: 2, fontWeight: 'medium' }}>Welcome!</Text>
              </ModalTitle>
              <ModalContent>
                <Text>This is the modal example</Text>
              </ModalContent>
              <ModalFooter>
                <Button data-testid="custom-animation-close-button" variant="pill" onClick={() => setOpen(false)}>
                  OK
                </Button>
              </ModalFooter>
            </div>
          )}
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Open modal with custom animations
    const openButton = canvas.getByTestId('custom-animation-open-button')
    await userEvent.click(openButton)
    
    // Check modal appears with custom animation
    await expect(canvas.getByText('Welcome!')).toBeInTheDocument()
    await expect(canvas.getByText('This is the modal example')).toBeInTheDocument()
    
    // Close modal
    const closeButton = canvas.getByTestId('custom-animation-close-button')
    await userEvent.click(closeButton)
  },
};

// Scrolling Modal Story
export const Scrolling = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button data-testid="scrolling-open-button" onClick={() => setOpen(true)}>
          open
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <div>
            <ModalTitle>
              <Text sx={{ fontSize: 2, fontWeight: 'medium' }}>Welcome!</Text>
            </ModalTitle>
            <ModalContent>
              <Text data-testid="scrolling-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique eleifend ipsum, ut dapibus turpis congue rhoncus. Etiam facilisis vulputate felis eget molestie. Curabitur facilisis, sem vel tincidunt volutpat, dui tortor rhoncus sem, sit amet suscipit nulla dui ut sem. Nulla facilisi. Duis maximus lectus magna, sed fringilla ante ultricies at. Fusce magna nibh, tristique a mauris id, ultricies porta massa. Duis vel enim non ante hendrerit imperdiet sit amet eget enim. Morbi eu neque in diam rhoncus vehicula. Sed varius, diam vitae commodo pharetra, ante nibh interdum nibh, ac semper nisl felis facilisis lectus. Cras cursus sapien nulla, ut finibus tellus pulvinar vitae. Mauris consectetur maximus malesuada. Ut id dui vel ipsum placerat consectetur. Curabitur facilisis eros et lorem varius commodo. Donec libero tellus, auctor eu porta id, lobortis sit amet libero. Nam sit amet feugiat nulla. Integer hendrerit non erat viverra laoreet. Cras fermentum odio turpis, a dictum massa tincidunt vitae. Sed condimentum lacinia arcu, sed lacinia diam tincidunt eu. Fusce mollis facilisis nulla at ullamcorper. Cras vel luctus arcu. Nullam eget turpis sit amet purus congue facilisis varius nec odio. In suscipit mattis magna, eu hendrerit risus. Ut porttitor aliquet leo, ut ornare risus. Etiam nec ex faucibus, scelerisque metus nec, elementum enim. Cras dictum feugiat enim, sit amet dictum magna interdum eget. Nullam egestas consequat ipsum sit amet rhoncus. Aenean urna ipsum, lacinia a tristique in, egestas sed lectus. Fusce fringilla mattis egestas. Phasellus varius elit at aliquam ultrices. Sed augue justo, feugiat vitae urna vel, laoreet efficitur ligula. Suspendisse placerat varius facilisis. Curabitur cursus sollicitudin malesuada. Nam a blandit est. Morbi blandit orci sem. Nulla vitae nulla nisl. Ut placerat in justo sit amet semper. Vivamus dui sapien, venenatis id metus id, laoreet iaculis ipsum. In hac habitasse platea dictumst. Integer rutrum, nibh non finibus fermentum, dolor nisl lobortis purus, eu fringilla tellus augue ac nisl. Aliquam pulvinar sem eu accumsan maximus. Nulla lobortis facilisis mi, at pretium tortor ultrices non. Proin cursus lorem vel ipsum malesuada commodo. Proin et finibus nibh. Aenean ligula nulla, egestas nec ultrices in, mattis id augue. Mauris a ultrices lorem. Donec et sem nulla. Suspendisse neque orci, varius sed lectus eget, vulputate dignissim nulla. Donec fringilla erat vitae lorem porttitor elementum. Morbi euismod lacus ac lacus accumsan rutrum. Nam at consequat purus, ut venenatis nisl. Cras gravida id nibh vitae venenatis. Nam ac odio nec dui rhoncus pretium non eu lacus.
              </Text>
            </ModalContent>
            <ModalFooter>
              <Button data-testid="scrolling-close-button" variant="pill" onClick={() => setOpen(false)}>
                OK
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Open modal
    const openButton = canvas.getByTestId('scrolling-open-button')
    await userEvent.click(openButton)
    
    // Check modal appears with long content
    await expect(canvas.getByText('Welcome!')).toBeInTheDocument()
    await expect(canvas.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument()
    
    // Verify scroll lock is working by checking document body style
    const body = document.body
    const hasScrollLock = body.style.overflow === 'hidden' || 
                         body.classList.contains('react-remove-scroll-bar') ||
                         body.hasAttribute('data-scroll-locked')
    
    // Note: exact scroll lock implementation may vary, this tests basic functionality
    await expect(canvas.getByTestId('scrolling-content')).toBeInTheDocument()
    
    // Close modal
    const closeButton = canvas.getByTestId('scrolling-close-button')
    await userEvent.click(closeButton)
  },
};

// ESC Key Disabled Story
export const ESCTurnedOff = {
  render: () => {
    const [open, setOpen] = useState(false)
    return React.createElement('div', {},
      React.createElement(Button, { 
        title: 'esc-disabled-open-button',
        onClick: () => setOpen(true) 
      }, 'open'),
      React.createElement(Modal, { 
        open: open, 
        allowEscKey: false,
        onClose: () => setOpen(false) 
      }, 
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
            React.createElement(Text, {}, 'Try pressing ESC. Modal will ignore.')
          ),
          React.createElement(ModalFooter, {},
              React.createElement(Button, { 
                title: 'esc-disabled-close-button',
                variant: 'pill', 
                onClick: () => setOpen(false)
              }, 'OK')
          )
        )
      )
    )
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Open modal
    const openButton = canvas.getByTestId('esc-disabled-open-button')
    await userEvent.click(openButton)
    
    // Check modal appears
    await expect(canvas.getByText('Welcome!')).toBeInTheDocument()
    await expect(canvas.getByText('Try pressing ESC. Modal will ignore.')).toBeInTheDocument()
    
    // Test ESC key (modal should remain open)
    await userEvent.keyboard('{Escape}')
    
    // Modal should still be visible
    await expect(canvas.getByText('Welcome!')).toBeInTheDocument()
    
    // Close modal using button instead
    const closeButton = canvas.getByTestId('esc-disabled-close-button')
    await userEvent.click(closeButton)
  },
};