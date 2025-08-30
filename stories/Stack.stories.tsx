import React, { useState } from 'react'
import { Text, Button } from 'theme-ui'
import { expect, userEvent, within } from 'storybook/test'

import { Modal, ModalTitle, ModalContent, ModalFooter, AnimatedModalStack } from '../src';

// Import modal stack hooks
const { useModals } = require('@mattjennings/react-modal-stack')

const meta = {
  title: 'Stack',
  component: Modal,
  decorators: [
    Story => React.createElement(AnimatedModalStack, {}, React.createElement(Story))
  ],
  parameters: {
    layout: 'centered',
  },
}

export default meta

// Basic Stack Story
export const Basic = {
  render: () => {
    const { openModal } = useModals();

    function MyModal(props) {
      const { modalNumber = 1, ...rest } = props;
      const { openModal, stack } = useModals();
      return (
        <Modal {...rest}>
          <ModalTitle>
            <Text sx={{ fontSize: 2, fontWeight: 'medium' }}>Welcome!</Text>
          </ModalTitle>
          <ModalContent>
            <Text>{`This is modal #${modalNumber}`}</Text>
          </ModalContent>
          <ModalFooter>
            <Button
              data-testid={`open-another-${modalNumber}`}
              variant="pill"
              onClick={() => openModal(MyModal, { modalNumber: stack.length + 1 })}
            >
              Open Another
            </Button>
          </ModalFooter>
        </Modal>
      );
    }

    return (
      <Button data-testid="stack-basic-open-button" onClick={() => openModal(MyModal)}>
        open
      </Button>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Open first modal
    const openButton = canvas.getByTestId('stack-basic-open-button')
    await userEvent.click(openButton)
    
    // Check first modal appears
    await expect(canvas.getByText('This is modal #1')).toBeInTheDocument()
    
    // Open second modal
    const openAnotherButton = canvas.getByTestId('open-another-1')
    await userEvent.click(openAnotherButton)
    
    // Check second modal appears (stacked)
    await expect(canvas.getByText('This is modal #2')).toBeInTheDocument()
    
    // Verify both modals are in the DOM (stacked)
    await expect(canvas.getByText('This is modal #1')).toBeInTheDocument()
  },
}

// Skip Animations Story
export const SkipAnimations = {
  render: () => {
    const { openModal } = useModals();

    function MyModal(props) {
      const { message, canOpen = true, ...rest } = props;
      const { openModal } = useModals();
      return (
        <Modal {...rest} closeOnOutsideClick={false}>
          <ModalTitle>
            <Text sx={{ fontSize: 2, fontWeight: 'medium' }}>Welcome!</Text>
          </ModalTitle>
          <ModalContent sx={{ width: 300 }}>
            <Text>{message}</Text>
          </ModalContent>
          <ModalFooter>
            {canOpen && (
              <Button
                data-testid="skip-animation-open-button"
                variant="pill"
                onClick={() =>
                  openModal(MyModal, {
                    skipAnimations: true,
                    message: 'This modal will not animate',
                    canOpen: false,
                  })
                }
              >
                Open Another
              </Button>
            )}
          </ModalFooter>
        </Modal>
      );
    }

    return (
      <Button
        data-testid="skip-animations-main-open-button"
        onClick={() =>
          openModal(MyModal, {
            message:
              'The next modal will not have animations, but this one will still animate when it is closed.',
          })
        }
      >
        open
      </Button>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    
    // Open first modal with animations
    const openButton = canvas.getByTestId('skip-animations-main-open-button')
    await userEvent.click(openButton)
    
    // Check first modal appears with message about animations
    await expect(canvas.getByText(/The next modal will not have animations/)).toBeInTheDocument()
    
    // Open second modal without animations
    const skipAnimationButton = canvas.getByTestId('skip-animation-open-button')
    await userEvent.click(skipAnimationButton)
    
    // Check second modal appears with skip animation message
    await expect(canvas.getByText('This modal will not animate')).toBeInTheDocument()
    
    // Verify animation skipping behavior by checking both modals are present
    await expect(canvas.getByText(/The next modal will not have animations/)).toBeInTheDocument()
  },
}