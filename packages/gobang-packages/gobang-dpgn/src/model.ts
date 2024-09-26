import tf from '@tensorflow/tfjs-node'
const NUM_PITCH_CLASSES = 2

const model = tf.sequential()
model.add(tf.layers.dense({ units: 250, activation: 'relu', inputShape: [8] }))
model.add(tf.layers.dense({ units: 175, activation: 'relu' }))
model.add(tf.layers.dense({ units: 150, activation: 'relu' }))
model.add(tf.layers.dense({ units: NUM_PITCH_CLASSES, activation: 'softmax' }))

model.compile({
  optimizer: tf.train.adam(),
  loss: 'sparseCategoricalCrossentropy',
  metrics: ['accuracy'],
})

export class MyLayer extends tf.layers.Layer {
  constructor() {
    super({})
  }
  // In this case, the output is a scalar.
  computeOutputShape(inputShape: tf.Shape | tf.Shape[]): tf.Shape | tf.Shape[] {
    return []
  }

  call(inputs: tf.Tensor | tf.Tensor[]): tf.Tensor | tf.Tensor[] {
    return Array.isArray(inputs)
      ? inputs.map((input) => {
          return this.callTensor(input)
        })
      : this.callTensor(inputs)
  }

  callTensor(input: tf.Tensor): tf.Tensor {
    return input.sum()
  }

  // Every layer needs a unique name.
  getClassName() {
    return this.constructor.name
  }
}
