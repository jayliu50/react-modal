import React, { useState, useMemo } from 'react'
import {
  Modal,
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalProps,
  AnimatedModalStack,
} from '../src'
import { Text, Button } from 'theme-ui'
import { useModals } from '@mattjennings/react-modal-stack'

export default {
  title: 'Stack',
  decorators: [
    (Story) => (
      <AnimatedModalStack>
        <Story />
      </AnimatedModalStack>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}

// Define play functions for stack testing
const testStackFunctionality = async (context) => {
  if (typeof window !== 'undefined' && window.TestUtils) {
    const { expect, userEvent, within } = window.TestUtils
    const canvas = within(context.canvasElement)
    
    // Open first modal
    const openButton = canvas.getByTestId('open-stack-modal')
    await userEvent.click(openButton)
    
    // Check first modal appears
    await expect(canvas.getByText('This is modal #1')).toBeInTheDocument()
    
    // Open second modal
    const openAnotherButton = canvas.getByTestId('open-another-1')
    await userEvent.click(openAnotherButton)
    
    // Check second modal appears
    await expect(canvas.getByText('This is modal #2')).toBeInTheDocument()
    
    // Both modals should be visible in stack
    await expect(canvas.getByText('This is modal #1')).toBeInTheDocument()
  }
}

const testSkipAnimations = async (context) => {
  if (typeof window !== 'undefined' && window.TestUtils) {
    const { expect, userEvent, within } = window.TestUtils
    const canvas = within(context.canvasElement)
    
    // Open first modal
    const openButton = canvas.getByTestId('open-skip-animation-modal')
    await userEvent.click(openButton)
    
    // Check first modal appears
    await expect(canvas.getByText(/The next modal will not have animations/)).toBeInTheDocument()
    
    // Open second modal without animations
    const openNoAnimationButton = canvas.getByTestId('open-no-animation')
    await userEvent.click(openNoAnimationButton)
    
    // Check second modal appears (without animation)
    await expect(canvas.getByText('This modal will not animate')).toBeInTheDocument()
  }
}

export const Basic = () => {
  const { openModal } = useModals()

  function MyModal({
    modalNumber = 1,
    ...props
  }) {
    const { openModal, stack } = useModals()

    return (
      <Modal {...props}>
        <ModalTitle>
          <Text
            sx={{
              fontSize: 2,
              fontWeight: 'medium',
            }}
          >
            Welcome!
          </Text>
        </ModalTitle>
        <ModalContent>
          <Text>This is modal #{modalNumber}</Text>
        </ModalContent>
        <ModalFooter>
          <Button
            data-testid={`open-another-${modalNumber}`}
            variant="pill"
            onClick={() =>
              openModal(MyModal, { modalNumber: stack.length + 1 })
            }
          >
            Open Another
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  return <Button data-testid="open-stack-modal" onClick={() => openModal(MyModal)}>open</Button>
}

// Add play property for automated testing
Basic.play = testStackFunctionality

export const SkipAnimations = () => {
  const { openModal } = useModals()

  function MyModal({
    message,
    canOpen = true,
    ...props
  }) {
    const { openModal } = useModals()

    return (
      <Modal {...props} closeOnOutsideClick={false}>
        <ModalTitle>
          <Text
            sx={{
              fontSize: 2,
              fontWeight: 'medium',
            }}
          >
            Welcome!
          </Text>
        </ModalTitle>
        <ModalContent sx={{ width: 300 }}>
          <Text>{message}</Text>
        </ModalContent>
        <ModalFooter>
          {canOpen && (
            <Button
              data-testid="open-no-animation"
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
    )
  }
  return (
    <Button
      data-testid="open-skip-animation-modal"
      onClick={() =>
        openModal(MyModal, {
          message:
            'The next modal will not have animations, but this one will still animate when it is closed.',
        })
      }
    >
      open
    </Button>
  )
}

SkipAnimations.play = testSkipAnimations
