
const COMPONENTS_PATH = 'app/components'

import fs from 'fs'
import mkdir from 'make-dir'
import nunjucks from 'nunjucks'
import { promisify } from 'util'
import cla from 'command-line-args'
import { basename, dirname } from 'path'

import index from './index.js.njk'
import styles from './styles.js.njk'
import template from './template.js.njk'

const access = promisify(fs.access)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const render = async (src, context, dist) => {
  const inputFile = `${__dirname}${src}`
  const outputFile = `${process.env.PWD}/${dist}`

  try {
    await access(outputFile)
    console.log('File found', outputFile)
    return
  } catch (e) {}

  const inputString =  await readFile(inputFile, 'utf8')
  const outputString = nunjucks.renderString(inputString, context)

  await mkdir(dirname(outputFile))
  await writeFile(outputFile, outputString)

  console.log('✨ rendered', dist)
}

export default function (argv) {
  const path = argv[0]
  const dist = `${COMPONENTS_PATH}/${path}`

  const context = {
    name: path.split('/').join('-')
  }

  render(index, context, `${dist}/index.js`)
  render(styles, context, `${dist}/styles.js`)
  render(template, context, `${dist}/template.js`)
}
