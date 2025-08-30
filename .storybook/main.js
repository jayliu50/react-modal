const config = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {},
  // typescript/reactDocgen config removed to avoid react-docgen loader issues
}

export default config
