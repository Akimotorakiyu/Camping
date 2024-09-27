import tf from '@tensorflow/tfjs-node'

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
