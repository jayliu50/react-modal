import React from 'react'
import { Button } from 'theme-ui'

export default {
  title: 'Test',
}

export const BasicTest = () => {
  return React.createElement(Button, {}, 'Test Button')
}