#!/usr/bin/env node

import cla from 'command-line-args'

// Generators
import componentGenerator from '~/generators/component'

const defaultGenerator = (command, argv) => {
  console.log('generator not found for:', command)
}

const chooseGenerator = (command, argv) => {
  switch(mainOptions.command) {
    case 'component': return componentGenerator(argv)
    default: return defaultGenerator(command, argv)
  }
}

// CLI root level options
const mainDefinitions = [
  { name: 'command', defaultOption: true }
]
const mainOptions = cla(mainDefinitions, { stopAtFirstUnknown: true })
const argv = mainOptions._unknown || []

chooseGenerator(mainOptions.command, argv)
