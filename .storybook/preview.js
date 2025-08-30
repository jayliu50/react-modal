import React from 'react'
import { ThemeUIProvider, Box } from 'theme-ui'

// Simple theme instead of importing from problematic files
const theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#007acc',
  },
  buttons: {
    primary: {
      color: 'white',
      bg: 'primary',
    },
    pill: {
      color: 'white',
      bg: 'primary',
      borderRadius: '100px',
    },
  },
}

// Make test utilities available globally for play functions
if (typeof window !== 'undefined') {
  // Dynamically import test utilities when needed
  import('storybook/test').then(({ expect, userEvent, within }) => {
    window.TestUtils = { expect, userEvent, within }
  }).catch(() => {
    // Test utilities not available, that's OK
    console.log('Storybook test utilities not available')
  })
}

const preview = {
  decorators: [
    (Story) => (
      <ThemeUIProvider theme={theme}>
        <Box
          sx={{
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Story />
        </Box>
      </ThemeUIProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
