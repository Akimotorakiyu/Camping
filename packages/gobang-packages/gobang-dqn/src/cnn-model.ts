import { boardSize, winCount } from '@template/gobang-board'
import tf from '@tensorflow/tfjs-node'
const NUM_PITCH_CLASSES = 2

const input = tf.input({ shape: [boardSize, boardSize] })

const conv2dLayer = tf.layers
  .conv2d({
    kernelSize: winCount,
    filters: winCount,
    inputShape: [boardSize, boardSize],
  })
  .apply(input)

const dense1 = tf.layers
  .dense({ units: winCount * boardSize ** 2, activation: 'swish' })
  .apply(conv2dLayer)

const dense2 = tf.layers
  .dense({ units: 150, activation: 'swish' })
  .apply(dense1)

const actionOutPut = tf.layers
  .dense({ units: NUM_PITCH_CLASSES, activation: 'softmax' })
  .apply(dense2)

const actionOutPut2 = tf.layers
  .dense({ units: NUM_PITCH_CLASSES, activation: 'softmax' })
  .apply(dense2)

const dense3 = tf.layers
  .dense({ units: winCount * boardSize ** 2, activation: 'swish' })
  .apply([
    actionOutPut as tf.SymbolicTensor,
    actionOutPut2 as tf.SymbolicTensor,
    dense2 as tf.SymbolicTensor,
  ])

const dense4 = tf.layers
  .dense({ units: 150, activation: 'swish' })
  .apply(dense3)

const qValue = tf.layers.dense({ units: 1, activation: 'swish' }).apply(dense4)

export const myModel = tf.model({
  inputs: input,
  outputs: [qValue as tf.SymbolicTensor],
})

myModel.compile({
  optimizer: tf.train.adam(),
  loss: 'sparseCategoricalCrossentropy',
  metrics: ['accuracy'],
})
