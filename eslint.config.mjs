import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'curly': ['warn', 'all'],
    'brace-style': ['warn', 'stroustrup'],
  },
})
