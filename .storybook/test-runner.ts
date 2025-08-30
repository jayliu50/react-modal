import type { TestRunnerConfig } from '@storybook/test-runner'

const config: TestRunnerConfig = {
  // Use index.json endpoint to get stories instead of story preview
  async preVisit(page, context) {
    // Increase timeout for stories that might take longer to load
    await page.setDefaultTimeout(10000)
  },
  async postVisit(page, context) {
    // Ensure all play functions have completed
    await page.waitForTimeout(1000)
  },
}

export default config