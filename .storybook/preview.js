import React from 'react'
import { ThemeProvider, Box } from 'theme-ui'
import theme from './theme'

// Make test utilities available globally for play functions
if (typeof window !== 'undefined') {
  // Dynamically import test utilities when needed
  import('@storybook/test').then(({ expect, userEvent, within }) => {
    window.TestUtils = { expect, userEvent, within }
  }).catch(() => {
    // Test utilities not available, that's OK
    console.log('Storybook test utilities not available')
  })
}

const preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
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
