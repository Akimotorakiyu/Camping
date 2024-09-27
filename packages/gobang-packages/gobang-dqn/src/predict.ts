import { myModel } from './cnn-model'
import tf from '@tensorflow/tfjs-node'

export async function predict(data: tf.Tensor2D) {
  const res = myModel.predict(tf.tensor2d([[1, 2]]))

  const output = myModel.getOutputAt(1)
  // 应该可以拿到某一层的输出
  output

  return res
}
