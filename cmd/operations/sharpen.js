/*!
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Mark van Seventer
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// @see http://sharp.dimens.io/en/stable/api-operation/#sharpen

// Strict mode.
'use strict'

// Local modules.
const queue = require('../../lib/queue')

// Configure.
const options = {
  flat: {
    desc: 'The level of sharpening to apply to "flat" areas',
    defaultDescription: '1.0',
    nargs: 1,
    type: 'number'
  },
  jagged: {
    desc: 'The level of sharpening to apply to "jagged" areas',
    defaultDescription: '2.0',
    nargs: 1,
    type: 'number'
  },
  sigma: {
    desc: 'The sigma of the Gaussian mask',
    defaultDescription: '1 + radius / 2',
    type: 'number'
  }
}

// Command builder.
const builder = (yargs) => {
  return yargs
    .strict()
    .epilog('For more information on available options, please visit http://sharp.dimens.io/en/stable/api-operation/#sharpen')
    .options(options)
}

// Command handler.
const handler = (args) => {
  return queue.push([ 'sharpen', (sharp) => sharp.sharpen(args.sigma, args.flat, args.jagged) ])
}

// Exports.
module.exports = {
  command: 'sharpen [sigma]',
  describe: 'Sharpen the image',
  builder,
  handler
}
