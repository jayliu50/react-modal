import React from 'react'
import { ThemeUIProvider, Box } from 'theme-ui'
import theme from './theme'

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
