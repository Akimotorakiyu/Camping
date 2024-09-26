import { boardSize, winCount } from '@template/gobang-board'
import tf from '@tensorflow/tfjs-node'
const NUM_PITCH_CLASSES = 2

const model = tf.sequential()
model.add(
  tf.layers.conv2d({
    kernelSize: winCount,
    filters: winCount,
    inputShape: [boardSize, boardSize],
  }),
)

model.add(
  tf.layers.dense({ units: winCount * boardSize ** 2, activation: 'swish' }),
)
model.add(tf.layers.dense({ units: 150, activation: 'swish' }))
model.add(tf.layers.dense({ units: NUM_PITCH_CLASSES, activation: 'softmax' }))

model.compile({
  optimizer: tf.train.adam(),
  loss: 'sparseCategoricalCrossentropy',
  metrics: ['accuracy'],
})
